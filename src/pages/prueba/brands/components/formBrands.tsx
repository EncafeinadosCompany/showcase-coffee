import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
// import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchBrands } from "@/features/products/brands/brandSlice";
import { useEffect } from "react";
import BrandForm from "./brandsForm";

export default function FormBrand () {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchBrands());
    },[dispatch]);

    return (
        <div className=" bg-[#F5E6D3] text-[#4A3933] h-full transition-all duration-700 overflow-y-auto py-4 px-4 ">
            <Link to="/brands">
            <Button
              variant="outline"
              className="mb-4 bg-amber-600 rounded-[5px]  hover:bg-amber-700 hover:shadow-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4 text-black" /> Volver
            </Button>
          </Link>
          <BrandForm></BrandForm>
        </div>
    )
}