import { Coffee } from "lucide-react";
import ProductManagement from "./components/product-management";
import { TooltipProvider } from "@/components/ui/tooltip";


export const Products = () => {

  return (
    <main className="bg-white shadow-lg rounded-2xl h-full w-full flex p-4 justify-center items-center overflow-hidden">
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-4 mb-2">
          <div className="flex flex-wrap justify-center items-center gap-3">
            <Coffee className="h-8 w-8 text-[#36270b]" />
            <h1 className="text-3xl sm:text-3xl font-bold text-center font-libre-baskerville text-[#36270b]">
            Gestión de Inventario
            </h1>
            <Coffee className="h-8 w-8 text-[#36270b]" />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          
          <TooltipProvider>
            <ProductManagement />
          </TooltipProvider>
        </div>
       
      </div>
    </main>
  );
};
