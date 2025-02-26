import { useEffect } from "react";
import * as React from "react";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


import * as z from "zod";
import { UseFormReturn } from "react-hook-form";

import { fetchBrands } from "@/features/products/brands/brandSlice";
import { fetchProducts } from "@/features/products/products/productSlice";

import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { productSchema } from "./validation";

type ProductFormValues = z.infer<typeof productSchema>;

interface BasicInfoStepProps {
  form: UseFormReturn<ProductFormValues>;
  imagePreview: string | null;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BasicInfoStep({
  form,
  imagePreview,
  handleImageChange,
}: BasicInfoStepProps) {
  const { products = [] } = useAppSelector((state) => state.products) || {
    products: [],
  };
  const { brands = [] } = useAppSelector((state) => state.brands) || {
    brands: [],
  };
    const [open, setOpen] = React.useState(false);
  

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      const productName = value.name;
      if (!productName) return;

      const exist = products.some(
        (product) => product.name.toLowerCase() === productName.toLowerCase()
      );

      if (exist) {
        toast.error("El producto ya existe", {id: "product-exists"});
        form.setValue("name", productName || "");
      }
    });

    return () => subscription.unsubscribe();
  }, [products, form]);

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
              <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start rounded-sm border-[#6F4E37]">
                    {brands.some((brand) => brand.id === field.value)
                    ? brands.find((brand) => brand.id=== field.value)?.name || "Seleccione una marca"
                    : "Seleccione una marca"}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 " side="bottom" align="start">
                  <Command>
                    <CommandInput placeholder="Buscar marca..." />
                    <CommandList>
                      <CommandEmpty>No se encontraron marcas.</CommandEmpty>
                      <CommandGroup>
                        {brands.map((brand) => (
                          <CommandItem
                            key={brand.id}
                            value={brand.name}
                            onSelect={(value) => field.onChange(brands.find((brand) => brand.name === value)?.id)}

                          >
                            {brand.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              </FormControl>        
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_url"
          render={() => (
            <FormItem>
              <FormLabel className="text-[#6F4E37]">
                Imagen del producto
              </FormLabel>
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
              <FormLabel className="text-[#6F4E37]">
                Nombre del producto
              </FormLabel>
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
