import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { brandFormSchema, BrandType } from "@/types/products/brand";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { addBrand } from "@/features/products/brands/brandSlice";
import { addImages } from "@/features/images/imageSlice";
import { fetchSocialNetworks } from "@/features/products/socialNetworks/socialNetworkSlice";
import toast from "react-hot-toast";
import confirmAction from "../../components/confirmation";
import BrandInfoForm from "./brandInfoForm";
import BrandDescriptionForm from "./brandDescription";
import BrandSocialNetworksForm from "./brandSocialNetworksForm";

type BrandFormValues = z.infer<typeof brandFormSchema>;

export default function BrandFormContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { socialNetworks } = useAppSelector((state) => state.socialNetworks);
  const { brands } = useAppSelector((state) => state.brands);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    dispatch(fetchSocialNetworks());
  }, [dispatch]);

  useEffect(() => {
    const brandName = form.watch("name");

    if (!brandName) return;

    const exist = brands.some(
      (brand) => brand.name.toLowerCase() === brandName.toLowerCase()
    );

    if (exist) {
      toast.error("La marca ya existe", { id: "brand-exists" });
      form.setValue("name", brandName || "");
    }
  }, [form.watch("name")]);

  const uploadImage = async (file: File) => {
    try {
      const response = await dispatch(addImages(file));
      return response.payload.image_url;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      return null;
    }
  };

  const reset = () => {
    form.reset();
    setImagePreview(null);
    setSelectedFile(null);
    setCurrentPage(1);
  };

  const onSubmit = async (data: BrandFormValues) => {
    let imageUrl = "https://res.cloudinary.com/dllvnidd5/image/upload/v1740162681/images-coffee/1740162774098-coffee%20bean-pana.png.png"; // Imagen por defecto

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
    
    dispatch(addBrand(brandData))
      .unwrap()
      .then(() => {
        confirmAction(
          "¿Desea agregar otra marca?", 
          "¡La marca fue creada con éxito!", 
          () => reset(), 
          () => navigate("/brands")
        );
      })
      .catch((error) => {
        toast.error(error);
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
        <form className="space-y-4">
          {currentPage === 1 && (
            <BrandInfoForm 
              form={form} 
              imagePreview={imagePreview} 
              handleImageChange={handleImageChange} 
            />
          )}

          {currentPage === 2 && (
            <BrandDescriptionForm form={form} />
          )}

          {currentPage === 3 && (
            <BrandSocialNetworksForm 
              fields={fields} 
              append={(value: { social_network_id: number; url: string; description: string }) => append(value)}
              remove={(index: number) => remove(index)}
              form={form}
              socialNetworks={socialNetworks}
            />
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
                className="bg-[#bc6c25] hover:bg-[#a35d20] rounded-[5px] text-white"
              >
                Siguiente
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                className="bg-[#6F4E37] hover:bg-[#5D3E2E] text-white rounded-[5px]"
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