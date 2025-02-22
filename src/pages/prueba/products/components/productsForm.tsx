import type React from "react"

import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Coffee, ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react"
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
import { Link } from "react-router-dom"
import { addProducts } from "@/features/products/products/productSlice"
import { addImages } from "@/features/images/imageSlice"
type ProductFormValues = z.infer<typeof productSchema>

export default function ProductForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const { attributes } = useAppSelector((state) => state.attributes)


  const base64ToFile = (base64String: string, fileName: string) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png"; 
    const bstr = atob(arr[1]); 
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
};

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
 
    let imageUrl = "https://res.cloudinary.com/dllvnidd5/image/upload/v1740162681/images-coffee/1740162774098-coffee%20bean-pana.png.png"

    if (typeof data.image_url === "string" && data.image_url.startsWith("data:image")) {
      // ✅ Convertir base64 a File
      const imageFile = base64ToFile(data.image_url, "product-image.png");

      try {
          const response = await dispatch(addImages(imageFile)).unwrap();
          let  imageUrl = response.image_url; // URL de la imagen en Cloudinary
          console.log(imageUrl)
          data.image_url = imageUrl
      } catch (error) {
          console.error("Error subiendo imagen:", error);
          return; // Detenemos la ejecución si falla la subida
      }
  }

    dispatch(addProducts(data));

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
       <Link to="/products-page">
      <Button variant="outline" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>
    </Link>
   
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