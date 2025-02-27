import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import type { UseFormReturn } from "react-hook-form";
import type { BrandFormValues } from "@/types/products/brand";

interface BrandDescriptionFormProps {
  form: UseFormReturn<BrandFormValues>;
}

export default function BrandDescriptionForm({ form }: BrandDescriptionFormProps) {
  return (
    <Card className="p-6 bg-white">
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-[#6F4E37]">
                Propósito
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
  );
}