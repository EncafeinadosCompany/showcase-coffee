import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { addEmployee } from "@/features/users/employees/employeeSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchProviders } from "@/features/companies/providerSlice";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type AddEmployeeModalProps = {
  providerId?: number;
  onClose: () => void;
  isOpen: boolean;
};

type FormData = {
  name: string;
  lastName: string;
  identification?: string;
  email: string;
  phone: string;
  id_provider?: number;
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Su nombre es importante para nosotros"),
  lastName: yup.string().required("¿Y el apellido para cuando?"),
  identification: yup.string(),
  email: yup.string().email("Ingrese un email válido").required("El email es obligatorio"),
  phone: yup
    .string()
    .matches(/^[0-9]*$/, "El teléfono solo puede contener números") // Evita letras completamente
    .matches(/^3[0-9]{9}$/, "El teléfono debe tener 10 dígitos y comenzar con 3")
    .required("El teléfono es obligatorio"),
  id_provider: yup.number().when('providerId', (providerId, schema) => {
    return !providerId
      ? schema.required("Seleccione un proveedor") // Si no hay providerId, es requerido
      : schema.notRequired(); // Si hay providerId, no es requerido
  }),
});

export const AddEmployeeModal = React.memo(({ providerId, onClose, isOpen }: AddEmployeeModalProps) => {
  const dispatch = useAppDispatch();
  const employee = useAppSelector((state) => state.auth.employee);
  const { providers } = useAppSelector((state) => state.providers);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchProviders());
    }
  }, [isOpen, dispatch]);

  const { register, handleSubmit, control, formState: { errors }, setValue  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      id_provider: providerId || undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    const newEmployee = {
      ...data,
      type: "provider" as const,
      status: true,
      name: data.name,
      last_name: data.lastName,
      identification: data.identification || null,
      phone: data.phone,
      email: data.email || "",
      id_store: employee?.id_store || 0,
      id_provider: data.id_provider || providerId,
      id_user: null,
      id_role: 2
    };

    dispatch(addEmployee(newEmployee));
    toast.success("Empleado agregado correctamente");
    onClose();
  };

  return (

    <Dialog open={isOpen} onOpenChange={onClose}> {/* Controlar apertura y cierre */}
      <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-600">Vincular Empleado</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">

            {/* Select de Proveedores (solo si no hay providerId) */}
            {!providerId && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="providerId" className="text-right">
                  Proveedor
                </Label>
                <div className="col-span-3">
                  <Controller
                    name="id_provider"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value?.toString()}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un proveedor" />
                        </SelectTrigger>
                        <SelectContent>
                        <ScrollArea className="h-30">
                          {providers.map((provider) => (
                            <SelectItem key={provider.id} value={provider.id.toString()}>
                              {provider.name}
                            </SelectItem>
                          ))}</ScrollArea>
                          
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.id_provider && <p className="text-red-500 text-sm">{errors.id_provider.message}</p>}
                </div>
              </div>
            )}
            {/* Nombre */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <div className="col-span-3">
                <Input id="name" {...register("name")} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
            </div>

            {/* Apellido */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Apellido
              </Label>
              <div className="col-span-3">
                <Input id="lastName" {...register("lastName")} />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Identificación */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="identification" className="text-right">
                Número de Documento
              </Label>
              <div className="col-span-3">
                <Input id="identification" {...register("identification")} />
                {errors.identification && <p className="text-red-500 text-sm">{errors.identification.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Correo electrónico
              </Label>
              <div className="col-span-3">
                <Input id="email" {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            </div>

            {/* Teléfono */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Teléfono
              </Label>
              <div className="col-span-3">
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  maxLength={10}
                  onInput={(e) => {
                    const input = e.currentTarget;
                    input.value = input.value.replace(/\D/g, ""); // Elimina caracteres no numéricos
                    setValue("phone", input.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key.match(/[^0-9]/) && e.key !== "Backspace") {
                      e.preventDefault(); // Bloquea letras en el teclado
                    }
                  }}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>

          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Registrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});