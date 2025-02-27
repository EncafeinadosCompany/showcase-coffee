import { useState, useMemo, useCallback, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Provider } from "@/types/companies/provider";
import { toast } from "react-hot-toast";
import {
    fetchProvidersByStore,
    addProvider,
    editProvider,
    associateProvider,
} from "@/features/companies/providerSlice";
import { showToast } from "@/features/common/toast/toastSlice";

export const useProviders = (itemsPerPage: number = 6) => {
    const dispatch = useAppDispatch();
    const { providers, isLoading, error } = useAppSelector((state) => state.providers);
    const employee = useAppSelector((state) => state.auth.employee);
    const storeId = employee?.id_store;

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
    const [showDialog, setShowDialog] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        if (storeId) {
            dispatch(fetchProvidersByStore(storeId))
                .unwrap()
                .catch((error) => {
                    console.error(error);
                    dispatch(showToast({ message: "Error al cargar los proveedores", type: "error" }));
                });
        }
    }, [storeId, dispatch]);

    const filteredProviders = useMemo(() => {
        const searchTermLower = searchTerm.toLowerCase();
        return providers.filter(
            (provider) =>
                provider?.name?.toLowerCase()?.includes(searchTermLower) ||
                provider?.email?.toLowerCase().includes(searchTermLower) ||
                provider?.phone?.includes(searchTerm) ||
                provider?.nit?.includes(searchTerm)
        );
    }, [providers, searchTerm]);

    const currentItems = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return filteredProviders.slice(indexOfFirstItem, indexOfLastItem);
    }, [filteredProviders, currentPage, itemsPerPage]);

    const totalPages = useMemo(
        () => Math.ceil(filteredProviders.length / itemsPerPage),
        [filteredProviders.length, itemsPerPage]
    );

    const validateForm = useCallback(
        (formData: Omit<Provider, "id">) => {
            if (!formData.name?.trim()) {
                toast("El nombre es obligatorio", { icon: "⚠️" });
                return false;
            }
            if (!formData.nit?.trim() || !/^[\d-]+$/.test(formData.nit)) {
                toast("El NIT debe ser un valor numérico o contener guiones", { icon: "⚠️" });
                return false;
            }
            if (
                !formData.email?.trim() ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
            ) {
                toast("Ingrese un correo electrónico válido", { icon: "⚠️" });
                return false;
            }
            if (!formData.phone?.trim() || !/^\d{7,10}$/.test(formData.phone)) {
                toast("El teléfono debe tener entre 7 y 10 dígitos", { icon: "⚠️" });
                return false;
            }
            return true;
        },
        []
    );

    const handleSubmit = useCallback(
      async (providerData: Omit<Provider, "id">) => {
          if (!validateForm(providerData)) {
              return;
          }
  
          if (!employee?.id_store) {
              toast.error("No se encontró el ID de la tienda");
              return;
          }
  
          try {
              if (editingId !== null) {
                
                  await dispatch(
                      editProvider({ id: editingId.toString(), provider: providerData })
                  ).unwrap();
                  toast.success("Proveedor actualizado correctamente");
                  setEditingId(null);
                  setShowDialog(false);
              } else {
            
                  const newProvider = await dispatch(addProvider(providerData)).unwrap();
  
                  if (newProvider?.id) {
                      try {
                        
                          await dispatch(
                              associateProvider({
                                  storeId: employee.id_store,
                                  providerId: newProvider.id,
                              })
                          ).unwrap();
                      } catch (error) {
                          console.error("Error creating alliance:", error);
                          toast.error("Error al asociar el proveedor con la tienda");
                          return;
                      }
                  }
                  dispatch(showToast({ message: "¡Proveedor creado con éxito!", type: "success" }));
              }
  
        
              setShowDialog(false);
  
     
              dispatch(fetchProvidersByStore(employee.id_store))
                  .unwrap()
                  .catch((error) => {
                      console.error(error);
                      dispatch(showToast({ message: "Error al recargar los proveedores", type: "error" }));
                  });
          } catch (error) {
              dispatch(showToast({ message: "Error al guardar el proveedor", type: "error" }));
          }
      },
      [dispatch, employee?.id_store, editingId, validateForm]
  );

    return {
        providers: currentItems,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        viewMode,
        setViewMode,
        totalPages,
        showDialog,
        setShowDialog,
        editingId,
        setEditingId,
        handleSubmit
    };
};