import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchBrands } from "@/features/products/brands/brandSlice";
import { useEffect } from "react";
import BrandForms from "./formBrand";

export default function FormBrand() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    <div className=" bg-[#F5E6D3] text-[#4A3933] h-full transition-all duration-700 overflow-y-auto py-4 px-4 ">
      <Link to="/brands">
        <Button variant="ghost" className="bg-none hover:bg-white rounded-xl text-amber-800 hover:text-amber-800">
          <ArrowLeft className="mr-2 h-4 w-4 text-amber-800 " /> Volver
        </Button>
      </Link>
      <BrandForms></BrandForms>
    </div>
  );
}
