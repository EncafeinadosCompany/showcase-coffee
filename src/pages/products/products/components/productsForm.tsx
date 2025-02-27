import type React from "react"

import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react"
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
import { Link, useNavigate } from "react-router-dom"
import { addProducts } from "@/features/products/products/productSlice"
import { addImages } from "@/features/images/imageSlice"
import toast from "react-hot-toast"
import { productType } from "@/types/products/product"
import confirmAction from "../../components/confirmation"
import { fetchBrands } from "@/features/products/brands/brandSlice"
type ProductFormValues = z.infer<typeof productSchema>

export default function ProductForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const dispatch = useAppDispatch()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { attributes } = useAppSelector((state) => state.attributes)
  const navegate = useNavigate()

  useEffect(() => {
    dispatch(fetchAttributes())
    dispatch(fetchBrands())
  }, [dispatch])

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      id_brand: undefined,
      image_url: "",
      status: true,
      attributes: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  })

  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append("image", file)
    const response = await dispatch(addImages(file))
    return response.payload.image_url
  }

  const reset = () => {
    form.reset()
    setImagePreview(null)
    setSelectedFile(null)
    setCurrentStep(1)
  }

  const onSubmit = async (data: ProductFormValues) => {
    console.log(data)

    if (data.attributes.length > 0) {
      data.attributes.map((attr) => {
        const exists = attributes.find((a) => a.description === attr.description)
        if (!exists) {
          dispatch(addAttribute(attr))
        }
      })
    }

    let imageUrl = "https://res.cloudinary.com/dllvnidd5/image/upload/v1740162681/images-coffee/1740162774098-coffee%20bean-pana.png.png";

    if (selectedFile) {
      try {
        imageUrl = await uploadImage(selectedFile);
      } catch (error) {
        toast.error("Error al subir la imagen");
        return;
      }
    }

    form.setValue("image_url", imageUrl);

    const productData: productType = {
      id: 0,
      name: data.name,
      id_brand: data.id_brand,
      image_url: imageUrl,
      status: data.status,
      attributes: data.attributes,
    }

    dispatch(addProducts(productData))
      .unwrap()
      .then(() => {
        confirmAction("¿Desea agregar otro producto?", "¡El producto fue creado con éxito!", () => reset(), () => navegate("/products"))

      })
      .catch((error) => {
        toast.error(error)
      })

  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
      form.setValue("image_url", imageUrl)

    }
  }

  const steps = [
    { title: "Información Básica", component: BasicInfoStep },
    { title: "Atributos", component: AttributesStep },
    { title: "Revisión", component: ReviewStep },
  ]

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <div className="w-full h-full p-2 ">
      <Link to="/products">
        <Button variant="ghost" className="bg-none hover:bg-white rounded-xl text-amber-800 hover:text-amber-800"
          onClick={() => form.reset()}>
          <ArrowLeft className="mr-2 h-4 w-4 text-amber-800 " /> Volver

        </Button>
      </Link>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="mt-4 w-full">
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
                  className="text-[#6F4E37] rounded-sm"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
              )}
              {currentStep < steps.length && (
                <Button
                  type="button"
                  onClick={async () => {
                    if (currentStep === 1) {
                      const fieldsToValidateStep1: (keyof ProductFormValues)[] = [
                        "id_brand",
                        "image_url",
                        "name",
                      ];
                      const isValid1 = await form.trigger(fieldsToValidateStep1);

                      if (!isValid1) {
                        toast.error("Complete los campos requeridos", { id: "basic" });
                        return;
                      }
                    }

                    if (currentStep === 2) {
                      // Validar cada atributo individualmente
                      const attributes = form.getValues("attributes");

                      if (attributes.length === 0) {
                        toast.error("Debe agregar al menos un atributo", { id: "attributes" });
                        return;
                      }
                      const attributeFields = attributes.flatMap((_, index) => [
                        `attributes.${index}.description`,
                        `attributes.${index}.value`,
                      ]);

                      const isValid2 = await form.trigger(attributeFields as any);

                      if (!isValid2) {
                        toast.error("Complete los atributos correctamente", { id: "attributesValidation" });
                        return;
                      }
                    }

                    setCurrentStep((prev) => prev + 1);
                  }}
                  className="bg-[#bc6c25] hover:bg-[#a35d20] rounded-[5px] text-white"
                >
                  Siguiente <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              {currentStep === steps.length && (
                <Button type="submit" className="bg-[#6F4E37] text-white ml-auto rounded-[5px]">
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