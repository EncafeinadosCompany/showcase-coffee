import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { fetchAttributes, addAttribute } from "@/features/products/attributes/attributeSlice"
import { addProducts } from "@/features/products/products/productSlice"
import { fetchBrands } from "@/features/products/brands/brandSlice";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { toast } from "react-hot-toast";
import { addImages } from "@/features/images/imageSlice"

export default function AddProductForm() {

  const [name, setName] = useState("")
  const [brandId, setBrandId] = useState("")
  const [productAttributes, setProductAttributes] = useState<Array<{ description: string; value: string }>>([])
  const [newAttribute, setNewAttribute] = useState("")
  const [newAttributeValue, setNewAttributeValue] = useState("")
  const [newCustomAttribute, setNewCustomAttribute] = useState("")
  const dispatch = useAppDispatch();
  const { brands } = useAppSelector((state) => state.brands);
  const { attributes } = useAppSelector((state) => state.attributes);
  const { error } = useAppSelector((state) => state.products);
  const [images, setImages] = useState<File | null>(null)

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchAttributes());
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (error) {
      toast.error('Error al agregar el producto', {
        duration: 4000,
        removeDelay: 1000
      })
    } else {
      if (productAttributes.length === 0) {
        toast.error('El producto debe tener almenos un attributo', {
          duration: 4000,
          removeDelay: 1000
        })
        return
      }

      toast('¡El producto a sido agregado correctamente!', {
        icon: '☕',
        duration: 4000,
        removeDelay: 1000,
        style: {
          background: '#bc6c25',
          color: '#fefae0',
        }
      })

      let imageUrl = "";
      if (images) {
        const fileInput = document.getElementById("reference") as HTMLInputElement
        const file = fileInput.files?.[0]
        if (file) {
  
          const response = await dispatch(addImages(file))
          imageUrl = response.payload.image_url
        }
      }

      dispatch(addProducts(
        {
          name,
          image_url:imageUrl,
          id_brand: Number.parseInt(brandId),
          attributes: productAttributes,
          status: true
        }
      ))
    }
    setName("")
    setBrandId("")
    setProductAttributes([])
    setNewAttribute("")
    setNewCustomAttribute("")
    setNewAttributeValue("")
  }

  const handleAddAttribute = () => {
    const attributeName = newAttribute === "new" ? newCustomAttribute : newAttribute
    if (attributeName && newAttributeValue) {
      setProductAttributes([...productAttributes, { description: attributeName, value: newAttributeValue }])
      toast(`¡El atributo ${attributeName} a sido agregado correctamente!`, {
        icon: '☕',
        duration: 4000,
        removeDelay: 1000,
        style: {
          background: '#bc6c25',
          color: '#fefae0',
        }
      })
      setNewAttribute("")
      setNewCustomAttribute("")
      setNewAttributeValue("")
      if (!attributes.some(attr => attr.description === attributeName)) {
        toast(`¡El atributo ${attributeName} a sido creado!`, {
          icon: '☕',
          duration: 4000,
          removeDelay: 1000,
          style: {
            background: '#bc6c25',
            color: '#fefae0',
          }
        })
        dispatch(addAttribute({ description: newCustomAttribute }))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <div>
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
          Nombre del Producto
        </label>
        <Input id="productName" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="brandSelect" className="block text-sm font-medium text-gray-700">
          Marca
        </label>
        <Select value={brandId} onValueChange={setBrandId}>
          <SelectTrigger id="brandSelect">
            <SelectValue placeholder="Seleccionar marca" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.id.toString()}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <h3 className="text-sm font-medium text-cafe-dark mb-2">Atributos</h3>
        {productAttributes.map((attr, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input value={attr.description} readOnly className="bg-white border-cafe-medium" />
            <Input value={attr.value} readOnly className="bg-white border-cafe-medium" />
          </div>
        ))}
        <div className="flex gap-2 mb-2">
          <Select value={newAttribute} onValueChange={setNewAttribute}>
            <SelectTrigger className="bg-white border-cafe-medium">
              <SelectValue placeholder="Seleccionar atributo" />
            </SelectTrigger>
            <SelectContent>
              {attributes.map((attr) => (
                <SelectItem key={attr.id} value={attr.description}>
                  {attr.description}
                </SelectItem>
              ))}
              <SelectItem value="new">Agregar nuevo atributo</SelectItem>
            </SelectContent>
          </Select>
          {newAttribute === "new" ? (
            <Input
              placeholder="Nuevo atributo"
              value={newCustomAttribute}
              onChange={(e) => setNewCustomAttribute(e.target.value)}
              className="bg-white border-cafe-medium"
            />
          ) : null}
          <Input
            placeholder="Valor"
            value={newAttributeValue}
            onChange={(e) => setNewAttributeValue(e.target.value)}
            className="bg-white border-cafe-medium"
          />
          <div className="card flex justify-content-center">
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={handleAddAttribute}
                className="bg-cafe-light text-cafe-dark hover:bg-cafe-medium hover:text-cafe-cream"
              >
                Agregar
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Button
        type="submit">Agregar Producto</Button>
    </form>
  )
}

