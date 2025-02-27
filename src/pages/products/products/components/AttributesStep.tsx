import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,}from "@/components/ui/dialog";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {SelectTrigger,Select,SelectValue,SelectContent,SelectItem} from "@/components/ui/select";
import { Plus, Tag, Trash2 } from "lucide-react";
import * as z from "zod";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchAttributes } from "@/features/products/attributes/attributeSlice";
import {  FieldArrayWithId,  UseFieldArrayAppend,  UseFormReturn} from "react-hook-form";
type ProductFormValues = z.infer<typeof productSchema>;

import { productSchema } from "./validation";
import { useEffect, useRef } from "react";

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
  }, [attributes]);
  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-white hover:bg-amber-100 rounded-full text-amber-800 text-sm font-medium">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Atributo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Atributo</DialogTitle>
              <DialogDescription>
                Seleccione un atributo existente o cree uno nuevo.
              </DialogDescription>
            </DialogHeader>
            <Select
              onValueChange={(value) => {
                if (value === "new") {
                  append({ description: "", value: "" });
                } else {
                  const attr = attributes.find(
                    (a) => a.id.toString() === value
                  );
                  if (attr) {
                    append({
                      id: Number(attr.id),
                      description: attr.description,
                      value: "",
                    });
                  }
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione un atributo" />
              </SelectTrigger>
              <SelectContent>
                {attributes.map((attr) => (
                  <SelectItem key={attr.id} value={attr.id.toString()}>
                    {attr.description}
                  </SelectItem>
                ))}
                <SelectItem value="new">Registrar nuevo atributo</SelectItem>
              </SelectContent>
            </Select>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea className="h-[300px] w-full border border-gray-200 rounded-sm p-4">
        {fields.map((field, index) => {
          const value = form.watch(`attributes.${index}.value`) || "";
          const maxlength = 250;
          const remaining = maxlength - value.length;
          const isOverLimit = remaining < 0;
          return (
            <Card key={field.id} className="mb-4 last:mb-0">
              <CardContent className="p-4 flex items-center space-x-4">
                <Tag className="h-4 w-4 text-[#6F4E37]" />
                <div className="flex-grow grid grid-cols-[1fr_2fr] gap-2 items-center">
                  {/* Campo de Descripción */}
                  <FormField
                    control={form.control}
                    name={`attributes.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Descripción"
                            {...field}
                            className="border-[#f0b97a73] bg-[#f0b97a38] rounded-2xl w-full"
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
                        <FormControl>
                          <Input
                            placeholder="Valor..."
                            {...field}
                            className={`border-[#6F4E37] rounded-2xl pr-16 w-full ${
                              isOverLimit ? "border-red-300" : ""
                            }`}
                            onChange={(e) => {
                              if (e.target.value.length <= maxlength) {
                                field.onChange(e);
                              }
                            }}
                          />
                        </FormControl>
                        <div
                          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm ${
                            isOverLimit ? "text-red-800" : "text-gray-500"
                          }`}
                        >
                          {value.length}/{maxlength}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  className="rounded-[5px]"
                  variant="outline"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4 text-orange-950" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </ScrollArea>
    </div>
  );
}
