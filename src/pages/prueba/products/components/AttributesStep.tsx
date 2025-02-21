import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FormField, FormItem, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Plus, Tag, Trash2 } from "lucide-react"
import * as z from "zod"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"
import { fetchAttributes, addAttribute } from "@/features/products/attributes/attributeSlice"

type ProductFormValues = z.infer<typeof productSchema>

const PREDEFINED_ATTRIBUTES = [
    { id: 1, description: "Origen" },
    { id: 2, description: "Tostado" },
    { id: 3, description: "Aroma" },
    { id: 4, description: "Cuerpo" },
    { id: 5, description: "Acidez" },
    // ... más atributos
  ]

import { FieldArrayWithId, UseFieldArrayAppend, UseFormReturn } from "react-hook-form";
import { productSchema } from "./validation"
import { useEffect } from "react"


interface AttributesStepProps {
    form: UseFormReturn<ProductFormValues>;
    fields: FieldArrayWithId<ProductFormValues, "attributes">[];
    append: UseFieldArrayAppend<ProductFormValues, "attributes">;
    remove: (index: number) => void;
  }

export default function AttributesStep({ form, fields, append, remove }: AttributesStepProps) {
    const dispatch = useAppDispatch()
    const {attributes} = useAppSelector((state) => state.attributes)

    useEffect (() => {
        dispatch(fetchAttributes())
    },[dispatch])
    return (
      <div className="space-y-4">
        <div className="flex justify-end items-center mb-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#6F4E37] hover:bg-[#5D3E2E] text-white">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Atributo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Atributo</DialogTitle>
                <DialogDescription>Seleccione un atributo existente o cree uno nuevo.</DialogDescription>
              </DialogHeader>
              <Select
                onValueChange={(value) => {
                  if (value === "new") {
                    append({ description: "", value: "" })
                  } else {
                    const attr = attributes.find((a) => a.id.toString() === value)
                    if (attr) {
                      append({ id: Number(attr.id), description: attr.description, value: "" })

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
                  <SelectItem value="new">Crear nuevo atributo</SelectItem>
                </SelectContent>
              </Select>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea className="h-[300px] w-full rounded-md border border-[#6F4E37] p-4">
          {fields.map((field, index) => (
            <Card key={field.id} className="mb-4 last:mb-0">
              <CardContent className="p-4 flex items-center space-x-4">
                <Tag className="h-4 w-4 text-[#6F4E37]" />
                <div className="flex-grow grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`attributes.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Descripción" {...field} className="border-[#f0b97a73] bg-[#f0b97a38] rounded-2xl" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`attributes.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Valor" {...field} className="border-[#6F4E37] rounded-2xl" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="button" className="rounded-[5px]" variant="destructive" size="icon" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>
    )
  }