import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form"
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {useAppSelector} from "@/hooks/useAppSelector";
import { fetchBrands } from "@/features/products/brands/brandSlice";
import * as z from "zod"
import { useEffect } from "react";
import { productSchema } from "./validation";
import { fetchProducts } from "@/features/products/products/productSlice";
import toast from "react-hot-toast";

 

  type ProductFormValues = z.infer<typeof productSchema>


interface BasicInfoStepProps {
    form: UseFormReturn<ProductFormValues>;
    imagePreview: string | null;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BasicInfoStep({ form, imagePreview, handleImageChange }: BasicInfoStepProps) {
     const {products} = useAppSelector((state) => state.products)
   
     useEffect(() => {
       dispatch(fetchProducts())
     },[])

  const dispatch = useAppDispatch();
  
      useEffect(() => {
          dispatch(fetchBrands());
      },[dispatch]);


    
      useEffect(() => {
        const productName = form.watch("name"); 
      
        if (!productName) return; 
      
        const exist = products.some((product) => product.name.toLowerCase() === productName.toLowerCase());
      
        if (exist) {
          toast.error("El producto ya existe");
          form.setValue("name", ""); 
        }
      }, [form.watch("name")]); 
  

  const {brands} = useAppSelector((state) => state.brands);
  return (
        <div className="grid grid-cols-2 gap-6 items-center">
         
          <div className="flex justify-center">
            <img
              src={imagePreview || "/placeholder.svg"}
              alt="Vista previa del producto"
              className="w-52 h-52 rounded-full border-2 border-[#6F4E37] object-cover"
            />
          </div>
      
        
          <div className="space-y-4">
           
            <FormField
              control={form.control}
              name="id_brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#6F4E37]">Marca</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number.parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="border-[#6F4E37] rounded-[5px]">
                        <SelectValue placeholder="Seleccione una marca" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image_url"
              render={() => (
                <FormItem>
                  <FormLabel className="text-[#6F4E37]">Imagen del producto</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="border-[#6F4E37] rounded-[5px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#6F4E37]">Nombre del producto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el nombre del producto"
                      {...field}
                      className="border-[#6F4E37] rounded-[5px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      );      
  }