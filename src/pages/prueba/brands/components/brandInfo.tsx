import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FormValues } from "@/types/products/brand";
import { Upload, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface BrandInfoProps {
  form: UseFormReturn<FormValues>;
}

export const BrandInfo = ({ form }: BrandInfoProps) => (
  <div className="space-y-3">
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-medium text-[#6F4E37]">Nombre de la Marca</FormLabel>
          <FormControl>
            <Input
              placeholder="Ej: Café de los Andes"
              className="rounded-xl border-2 border-[#6F4E37]/20 focus:border-[#bc6c25] focus:ring-[#bc6c25] h-12 text-lg"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    
    <FormField
      control={form.control}
      name="purpose"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-medium text-[#6F4E37]">Propósito</FormLabel>
          <FormControl>
            <Input
              placeholder="¿Cuál es el propósito de la marca?"
              className="rounded-xl border-2 border-[#6F4E37]/20 focus:border-[#bc6c25] focus:ring-[#bc6c25] h-12 text-lg"
              {...field}
              value={field.value || ""}
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
          <FormLabel className="text-lg font-medium text-[#6F4E37]">Historia de la Marca</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Cuéntanos la historia detrás de tu café..."
              className="rounded-xl border-2 border-[#6F4E37]/20 focus:border-[#bc6c25] focus:ring-[#bc6c25] min-h-[100px] text-lg"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

interface LogoUploadProps {
  imagePreview: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LogoUpload = ({ imagePreview, onImageChange }: LogoUploadProps) => (
  <Card className="border-2 border-dashed border-[#6F4E37]/30 bg-[#6F4E37]/5 rounded-2xl hover:bg-[#6F4E37]/10 transition-colors">
    <CardContent className="p-8 text-center">
      <FormLabel className="cursor-pointer block">
        <div className="space-y-6">
          {imagePreview ? (
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Logo preview"
                className="mx-auto w-56 h-56 rounded-2xl object-cover border-4 border-[#6F4E37] shadow-lg transition-transform transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Upload className="h-12 w-12 text-white" />
              </div>
            </div>
          ) : (
            <div className="w-56 h-56 mx-auto rounded-2xl border-4 border-[#6F4E37]/40 flex flex-col items-center justify-center bg-white/50 hover:bg-white/80 transition-colors">
              <Upload className="h-16 w-16 text-[#6F4E37] mb-4" />
              <p className="text-[#6F4E37] font-medium text-lg">Subir Logo</p>
            </div>
          )}
        </div>
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onImageChange}
        />
      </FormLabel>
    </CardContent>
  </Card>
);

interface SocialNetworkProps {
  form: UseFormReturn<FormValues>;
  socialNetworks: { id: number; url: string }[];
  fields: any[];
  append: (value: any) => void;
  remove: (index: number) => void;
}

export const SocialNetworks = ({ form, socialNetworks, fields, append, remove }: SocialNetworkProps) => (
  <div className="col-span-12">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-medium text-[#6F4E37] flex items-center gap-2">
        <Link className="h-6 w-6" to={""} />
        Redes Sociales
      </h3>
      <Button
        type="button"
        onClick={() => append({ social_network_id: 0, url: "", description: "" })}
        className="bg-[#71be47] hover:bg-[#598342] rounded-xl px-6"
      >
        <Plus className="mr-2 h-5 w-5" />
        Agregar Red Social
      </Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {fields.map((field, index) => {
        return (
          <Card key={field.id} className="rounded-xl border-2 border-[#6F4E37]/20 hover:border-[#6F4E37]/40 transition-colors">
            <CardContent className="p-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name={`social_networks.${index}.social_network_id`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-xl border-2 border-[#6F4E37]/20 focus:border-[#bc6c25] h-12">
                            <SelectValue placeholder="Seleccionar red social" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {socialNetworks.map((network) => (
                            <SelectItem 
                              key={network.id} 
                              value={network.id.toString()}
                              className="flex items-center gap-2"
                            >
                              {network.url}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-start gap-3">
                 
                  <FormField
                    control={form.control}
                    name={`social_networks.${index}.url`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="URL del perfil"
                            className="rounded-xl border-2 border-[#6F4E37]/20 focus:border-[#bc6c25] h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`social_networks.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Descripción del perfil"
                          className="rounded-xl border-2 border-[#6F4E37]/20 focus:border-[#bc6c25] h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                  className="w-full rounded-xl mt-2 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 border-2 border-transparent hover:border-red-300"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
);