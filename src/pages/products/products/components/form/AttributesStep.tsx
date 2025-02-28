import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Tag, Trash2 } from "lucide-react";
import * as z from "zod";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchAttributes } from "@/features/products/attributes/attributeSlice";
import { FieldArrayWithId, UseFieldArrayAppend, UseFormReturn } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { productSchema } from "./validation";
import AttributeDialog from "./AddAttributeModal";

type ProductFormValues = z.infer<typeof productSchema>;

interface AttributesStepProps {
  form: UseFormReturn<ProductFormValues>;
  fields: FieldArrayWithId<ProductFormValues, "attributes">[];
  append: UseFieldArrayAppend<ProductFormValues, "attributes">;
  remove: (index: number) => void;
}

export default function AttributesStep({
  form,
  fields,
  append,
  remove,
}: AttributesStepProps) {
  const dispatch = useAppDispatch();
  const { attributes } = useAppSelector((state) => state.attributes);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchAttributes());
  }, [dispatch]);

  const alreadyAdded = useRef(false);

  useEffect(() => {
    if (attributes.length > 0 && fields.length === 0 && !alreadyAdded.current) {
      alreadyAdded.current = true;

      const existingDescriptions = new Set(
        fields.map((field) => field.description)
      );

      const newAttributes = attributes.slice(0, 10).filter((attr) => {
        if (!existingDescriptions.has(attr.description)) {
          existingDescriptions.add(attr.description);
          return true;
        }
        return false;
      });

      newAttributes.forEach((attr) => {
        append({ description: attr.description, value: "" });
      });
    }
  }, [attributes, fields, append]);

  return (
    <div className="">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-[#6F4E37]">
            Características del producto
          </CardTitle>

          <Button
            className="bg-[#6F4E37] hover:bg-[#5D3D26] text-white rounded-full font-medium transition-all duration-200"
            onClick={() => setOpenDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Atributo
          </Button>

          <AttributeDialog
            attributes={attributes}
            fields={fields}
            append={append}
            onClose={() => setOpenDialog(false)}
            open={openDialog}
            setOpen={setOpenDialog}
          />
        </div>
      </CardHeader>

      <CardContent>
        {fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-6 border border-dashed border-gray-300 rounded-lg">
            <Tag className="h-10 w-10 text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">Sin características</h3>
            <p className="text-gray-400 max-w-md">
              Las características ayudan a describir el producto
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[350px] rounded-xl">
            {fields.map((field, index) => {
              const value = form.watch(`attributes.${index}.value`) || "";
              const maxlength = 250;
              const remaining = maxlength - value.length;
              const isOverLimit = remaining < 0;

              return (
                <Card
                  key={field.id}
                  className="mb-4 last:mb-0 border-[#6F4E37]/10 hover:border-[#6F4E37]/30 transition-colors group"
                >
                  <CardContent className="p-4">
                    <div className="grid grid-cols-[auto_1fr] gap-4">
                      <div className="flex items-center justify-center h-full">
                        <div className="bg-[#6F4E37]/10 p-2 rounded-full">
                          <Tag className="h-5 w-5 text-[#6F4E37]" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name={`attributes.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#6F4E37]/80 text-sm font-medium">Nombre del Atributo</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Descripción (ej: Color, Tamaño, Material)"
                                  {...field}
                                  className="border-[#6F4E37]/30 focus:border-[#6F4E37] rounded-xl"
                                  readOnly={!!form.getValues(`attributes.${index}.id`)}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`attributes.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="relative">
                              <FormLabel className="text-[#6F4E37]/80 text-sm font-medium">Valor del Atributo</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Escriba el atributo del producto"
                                  {...field}
                                  className={`border-[#6F4E37]/30 focus:border-[#6F4E37] rounded-xl pr-16 ${isOverLimit ? "border-red-400 focus:border-red-500" : ""
                                    }`}
                                  onChange={(e) => {
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <div
                                className={`absolute right-3 bottom-2 text-xs ${isOverLimit
                                  ? "text-red-500"
                                  : remaining < 50
                                    ? "text-amber-500"
                                    : "text-gray-400"
                                  }`}
                              >
                                {value.length}/{maxlength}
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="col-span-2 flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          className="text-red-600 rounded-xl border border-red-600 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="ml-1">Eliminar</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </ScrollArea>
        )}
      </CardContent>
    </div>
  );
}