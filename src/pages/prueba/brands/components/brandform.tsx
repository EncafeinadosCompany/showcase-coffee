"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { addBrand } from "@/features/products/brands/brandSlice";
import { fetchSocialNetworks } from "@/features/products/socialNetworks/socialNetworkSlice";
import { BrandInfo, LogoUpload, SocialNetworks } from "./brandInfo";
import { brandFormSchema, BrandType, FormValues } from "@/types/products/brand";

export default function BrandForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { socialNetworks } = useAppSelector((state) => state.socialNetworks);

  useEffect(() => {
    dispatch(fetchSocialNetworks());
  }, [dispatch]);

  const form = useForm<FormValues>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: "",
      image_url: null,
      purpose: "",
      description: "",
      social_networks: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "social_networks",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue("image_url", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    const brandData: BrandType = {
      name: data.name,
      image_url: data.image_url,
      purpose: data.purpose,
      description: data.description,
      social_networks: data.social_networks.map(network => ({
        id_social_network: network.social_network_id,
        description: network.description,
        url: network.url
      }))
    };
    dispatch(addBrand(brandData));
  };

  return (
    <div className="container mx-auto max-w-5xl">
      <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-12 gap-8 p-8">
              <div className="col-span-12 md:col-span-7 space-y-6">
                <BrandInfo form={form} />
              </div>
              
              <div className="col-span-12 md:col-span-5">
                <LogoUpload 
                  imagePreview={imagePreview} 
                  onImageChange={handleImageChange} 
                />
              </div>

              <SocialNetworks 
                form={form}
                socialNetworks={socialNetworks}
                fields={fields}
                append={append}
                remove={remove}
              />
            </div>

            <div className="px-6 pb-6">
              <Button
                type="submit"
                className="w-full bg-[#6F4E37] hover:bg-[#5D3E2E] text-lg"
              >
                <FileText className="mr-2 h-5 w-5" />
                Guardar Marca
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}