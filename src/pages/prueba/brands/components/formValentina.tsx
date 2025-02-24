import type React from "react";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { brandFormSchema, BrandType } from "@/types/products/brand";
import { addBrand } from "@/features/products/brands/brandSlice";
import { fetchSocialNetworks } from "@/features/products/socialNetworks/socialNetworkSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { addImages } from "@/features/images/imageSlice";
import toast from "react-hot-toast";

type BrandFormValues = z.infer<typeof brandFormSchema>;

export default function BrandForms() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { socialNetworks } = useAppSelector((state) => state.socialNetworks);
  const { brands } = useAppSelector((state) => state.brands);
  const dispatch = useAppDispatch();

useEffect(() => {
    dispatch(fetchSocialNetworks());
}, [dispatch]);



  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: "",
      image_url: null,
      purpose: null,
      description: "",
      social_networks: [],
    },
  });


  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "social_networks",
  });

  useEffect(() => {
    const brandName = form.watch("name");

    if (!brandName) return;

    const exist = brands.some(
      (brand) => brand.name.toLowerCase() === brandName.toLowerCase()
    );

    if (exist) {
      toast.error("La marca ya existe", {id: "brand-exists"});
      form.setValue("name", "");
    }
  }, [form.watch("name")]);


  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await dispatch(addImages(file));
      return response.payload.image_url; 
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      return null;
    }
  }

  const onSubmit = async (data: BrandFormValues) => {

    let imageUrl = "https://asset.cloudinary.com/dllvnidd5/093b61e9e80f35023c060c079b1a82fc";

    if (selectedFile) {
      try {
        imageUrl = await uploadImage(selectedFile); 
      } catch (error) {
        toast.error("Error al subir la imagen");
        return; 
      }
    }
  
    form.setValue("image_url", imageUrl);

    const brandData: BrandType = {
      name: data.name,
      image_url: imageUrl,
      purpose: data.purpose,
      description: data.description,
      social_networks: data.social_networks.map(network => ({
        id_social_network: network.social_network_id,
        description: network.description,
        url: network.url
      }))
    };
    console.log(brandData);
    dispatch(addBrand(brandData))
    .unwrap()
    .then(() => {
      toast.success("Marca de café creada con éxito");
    })
    .catch((error) => {
      toast.error(error)
    });
   
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      form.setValue("image_url", imageUrl);
    }
  };

  const totalPages = 3;

  return (
    <div className="mt-8">
      <Form {...form}>
        <form className="space-y-6">
          {currentPage === 1 && (
            <div className="flex justify-center">
              <div className="text-center w-1/2 col-span-6 items-center">
                <p className="text-lg font-mono mt-4 ">
                  Cada taza cuenta una historia, y la nuestra apenas comienza
                </p>
                <img
                  width={"70%"}
                  className="mx-auto"
                  src="./public/coffee bean-pana.svg"
                  alt=""
                />
              </div>
              <Card className="p-4 w-1/2 bg-white">
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-[#6F4E37]">
                          Nombre de la marca
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingrese el nombre de la marca de café"
                            {...field}
                            className="border-[#6F4E37] rounded-[5px]"
                          />
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
                        <FormLabel className="text-lg font-semibold text-[#6F4E37]">
                          Logo de la marca 
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="border-[#6F4E37] rounded-[5px]"
                          />
                        </FormControl>
                        {imagePreview && (
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Vista previa del logo"
                            className="mx-auto w-40 h-40 rounded-full border-2 border-[#6F4E37] object-cover"
                          />
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {currentPage === 2 && (
            <Card className="p-6 bg-white">
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-[#6F4E37]">
                        Proposito
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Cuentanos tu historia..."
                          {...field}
                          value={field.value || ""}
                          className="border-[#6F4E37] min-h-[100px] rounded-[5px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-[#6F4E37]">
                        Descripción
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describa su marca de café"
                          {...field}
                          className="border-[#6F4E37] min-h-[100px] rounded-[5px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {currentPage === 3 && (
            <Card className="p-6 bg-white">
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-[#6F4E37]">
                    Redes Sociales
                  </h2>
                  <Button
                    type="button"
                    onClick={() =>
                      append({ social_network_id: 0, url: "", description: "" })
                    }
                    className="bg-white hover:bg-amber-100 rounded-full text-amber-800 text-sm font-medium">
                  
                    <Plus className="mr-[1px] h-4 w-4 " />
                    Agregar redes Sociales
                  </Button>
                </div>
                <ScrollArea className="w-full whitespace-nowrap rounded-md ">
                  <div className="flex w-max space-x-4 p-4">
                    {fields.map((field, index) => (
                      <Card key={field.id} className="w-[250px] flex-shrink-0">
                        <CardContent className="p-4">
                          <FormField
                            control={form.control}
                            name={`social_networks.${index}.social_network_id`}
                            render={({ field }) => (
                              <FormItem className="mb-2">
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(Number.parseInt(value))
                                  }
                                  defaultValue={field.value?.toString()}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full border-[#6F4E37]">
                                      <SelectValue placeholder="Red social" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {socialNetworks.map((network) => (
                                      <SelectItem
                                        key={network.id}
                                        value={network.id.toString()}
                                      >
                                        {network.name}
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
                            name={`social_networks.${index}.url`}
                            render={({ field }) => (
                              <FormItem className="mb-2">
                                <FormControl>
                                  <Input
                                    placeholder="https://..."
                                    {...field}
                                    className="border-[#6F4E37]"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`social_networks.${index}.description`}
                            render={({ field }) => (
                              <FormItem className="mb-2">
                                <FormControl>
                                  <Input
                                    placeholder="Descripción"
                                    {...field}
                                    className="border-[#6F4E37]"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            // variant=""
                            size="sm"
                            onClick={() => remove(index)}
                            className="w-full mt-2 rounded-[5px]"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between mt-8">
            <Button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
              className="text-[#6F4E37] rounded-sm"
            >
              Anterior
            </Button>
            {currentPage < totalPages ? (
              <Button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="bg-[#bc6c25] hover:bg-[#a35d20] rounded-[5px] text-white "  
              >
                 Siguiente
               <ArrowRight className=" h-4 w-4" /> 
              </Button>
            ) : (
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                className="bg-[#6F4E37] hover:bg-[#5D3E2E]  text-white rounded-[5px]"
              >
                Guardar Marca
              </Button>
            )}
          </div>
          <div className="text-center text-sm text-[#6F4E37] mt-4">
            Paso {currentPage} de {totalPages}
          </div>
        </form>
      </Form>
    </div>
  );
}
