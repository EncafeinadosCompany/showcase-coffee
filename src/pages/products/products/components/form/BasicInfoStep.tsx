import { useEffect } from "react";
import * as React from "react";
import toast from "react-hot-toast";
import { Check, ChevronsUpDown, Upload } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";

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

export default function BasicInfoStep({ form, imagePreview, handleImageChange, }: BasicInfoStepProps) {
  const { products = [] } = useAppSelector((state) => state.products) || { products: [] };
  const { brands = [] } = useAppSelector((state) => state.brands) || { brands: [] };

  const [open, setOpen] = React.useState(false);
  const [fileSelected, setFileSelected] = React.useState(false);

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
        toast.error("El producto ya existe", { id: "product-exists", duration: 1000 });
        form.setValue("name", productName || "");
      }
    });

    return () => subscription.unsubscribe();
  }, [products, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileSelected(!!(event.target.files && event.target.files.length > 0));
    handleImageChange(event);
  };

  return (
    <div className="h-full w-full p-2 flex items-center justify-center">
      <div className="mt-20 w-full max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center space-y-4">

            <div className="relative flex flex-col items-center">
              <div className="relative group cursor-pointer rounded-xl w-64 h-64 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">

                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Vista previa del producto"
                    className="w-full rounded-xl h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[#6F4E37]/10 rounded-full animate-pulse"></div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6F4E37"
                        strokeWidth="1.5"
                        className="w-16 h-16"
                      >
                        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#6F4E37]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-medium mb-2 text-center">
                    {imagePreview ? "Cambiar imagen" : "Subir imagen del producto"}
                  </p>

                  <FormField
                    control={form.control}
                    name="image_url"
                    render={() => (
                      <FormItem className="w-full mb-0">
                        <FormLabel className="sr-only">Imagen del producto</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Button
                              variant="outline"
                              className="w-full bg-white/90 rounded-xl hover:bg-white border-[#6F4E37] text-[#6F4E37] font-medium flex items-center justify-center gap-2"
                            >
                              <Upload size={18} />
                              {fileSelected ? "Cambiar" : "Seleccionar"}
                            </Button>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Indicador de estado */}
              <div className="mt-3 flex items-center">
                {imagePreview ? (
                  <div className="flex items-center gap-2 text-[#6F4E37] bg-[#6F4E37]/10 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Imagen seleccionada</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">Sin imagen</span>
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#6F4E37] mb-4">Información básica</h2>

            <FormField
              control={form.control}
              name="id_brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#6F4E37] font-medium">Marca</FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between rounded-xl border-[#6F4E37]/60 hover:border-[#6F4E37] bg-white"
                        >
                          {brands.some((brand) => brand.id === field.value)
                            ? brands.find((brand) => brand.id === field.value)?.name
                            : "Seleccione una marca"}
                          <ChevronsUpDown size={16} className="text-[#6F4E37]/70" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 rounded-xl shadow-lg border-[#6F4E37]/30" side="bottom" align="start">
                        <Command>
                          <CommandInput placeholder="Buscar marca..." className="border-b border-[#6F4E37]/20" />
                          <CommandList>
                            <CommandEmpty>No se encontraron marcas.</CommandEmpty>
                            <CommandGroup>
                              {brands.map((brand) => (
                                <CommandItem
                                  key={brand.id}
                                  value={brand.name}
                                  onSelect={(value) => {
                                    field.onChange(brands.find((b) => b.name === value)?.id);
                                    setOpen(false);
                                  }}
                                  className="flex items-center gap-2 hover:bg-[#6F4E37]/5"
                                >
                                  {brand.name}
                                  {brand.id === field.value && (
                                    <Check size={16} className="ml-auto text-[#6F4E37]" />
                                  )}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#6F4E37] font-medium">
                    Nombre del producto
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el nombre del producto"
                      {...field}
                      className="border-[#6F4E37]/60 focus:border-[#6F4E37] rounded-xl px-4 py-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


          </div>
        </div>
      </div>
    </div>
  );
}