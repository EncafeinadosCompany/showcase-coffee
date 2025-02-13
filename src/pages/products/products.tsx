import { Coffee } from "lucide-react";
import ProductManagement from "./components/product-management";

export const Products = () => {
  return (
    <main className="container mx-auto flex justify-center items-center overflow-hidden pt-4 pb-4">
      <div className="bg-white shadow-lg rounded-2xl p-2 max-w-4xl w-full max-h-full flex flex-col">
        <div className="flex flex-col items-center gap-4 mb-2">
          <div className="flex flex-wrap justify-center items-center gap-3">
            <Coffee className="h-8 w-8 text-[#36270b]" />
            <h1 className="text-3xl sm:text-3xl font-bold text-center font-libre-baskerville text-[#36270b]">
              El Rincón del Café
            </h1>
            <Coffee className="h-8 w-8 text-[#36270b]" />
          </div>
          <p className="text-amber-800 text-base sm:text-lg font-medium italic text-center">
            Gestión de Inventario
          </p>
        </div>
        <div className="flex-1 overflow-auto"> <ProductManagement  /></div>
       
      </div>
    </main>
  );
};
