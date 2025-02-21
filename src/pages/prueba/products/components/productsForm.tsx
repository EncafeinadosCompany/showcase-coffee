import type React from "react"

import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Coffee, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import BasicInfoStep from "./BasicInfoStep"
import AttributesStep from "./AttributesStep"
import ReviewStep from "./ReviewStep"
import { productSchema } from "./validation"
import { addAttribute, fetchAttributes } from "@/features/products/attributes/attributeSlice"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"
type ProductFormValues = z.infer<typeof productSchema>

export default function ProductForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const { attributes } = useAppSelector((state) => state.attributes)

  useEffect(() => {
    dispatch(fetchAttributes())
  },[dispatch])

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      id_brand: 0,
      image_url: "",
      status: true,
      attributes: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  })

  const onSubmit = async (data: ProductFormValues) => {
    console.log(data)
    if(data.attributes.length > 0) {
        data.attributes.map((attr) => {
            const exists = attributes.find((a) => a.description === attr.description)
            if (!exists) {
              dispatch(addAttribute(attr))
            }
        })
    }
    // Aquí iría la lógica para enviar los datos al servidor
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        form.setValue("image_url", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const steps = [
    { title: "Información Básica", component: BasicInfoStep },
    { title: "Atributos", component: AttributesStep},
    { title: "Revisión", component: ReviewStep },
  ]

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <div className="max-w-4xl mx-auto p-2 ">
   
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-[#6F4E37]">{steps[currentStep - 1].title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CurrentStepComponent
                form={form}
                imagePreview={imagePreview}
                handleImageChange={handleImageChange}
                fields={fields}
                append={append}
                remove={remove}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  variant="outline"
                  className="text-[#6F4E37]"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
              )}
              {currentStep < steps.length && (
                <Button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="bg-[#6F4E37] text-white ml-auto"
                >
                  Siguiente <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              {currentStep === steps.length && (
                <Button type="submit" className="bg-[#6F4E37] text-white ml-auto">
                  Guardar Producto
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}