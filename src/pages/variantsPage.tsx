import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchVariants } from "@/features/products/variants/vatiantSlice";

export const VariantsPage = () => {
  const dispatch = useAppDispatch();
  const { variants, isLoading, error } = useAppSelector((state) => state.variants);


  useEffect(() => {
    dispatch(fetchVariants());
  }, [dispatch]);


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Proveedores</h2>

      {error && <p className="text-red-500">{error}</p>}
      {isLoading && <p>Cargando...</p>}

      <ul>
        {variants.map((variant) => (
          <li key={variant.id} className="border p-2 my-2 flex justify-between">
            <span>{variant.id} - {variant.id_product} - {variant.grammage}</span>
            <div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
