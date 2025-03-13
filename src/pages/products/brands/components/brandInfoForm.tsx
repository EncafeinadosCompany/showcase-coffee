import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import type { UseFormReturn } from "react-hook-form";
import type { BrandFormValues } from "@/types/products/brand";

interface BrandInfoFormProps {
  form: UseFormReturn<BrandFormValues>;
  imagePreview: string | null;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BrandInfoForm({ form, imagePreview, handleImageChange }: BrandInfoFormProps) {
  return (
    <div className="flex justify-center">
      <div className="text-center w-1/2 col-span-6 items-center">
        <p className="text-lg mt-4">
          Cada taza cuenta una historia, y la nuestra apenas comienza
        </p>
        <img
          width={"70%"}
          className="mx-auto"
          src="/coffee bean-pana.svg"
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
                  Nombre de la Marca
                </FormLabel>
                <FormControl data-cy="brand-name">
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
                  Logo de la Marca
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
  );
}