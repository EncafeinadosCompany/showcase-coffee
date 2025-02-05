import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { brandType } from "@/types/products/brand"
import {fetchBrands} from "@/features/products/brands/brandSlice";
import {fetchAttributes, addAttribute} from "@/features/products/attributes/attributeSlice"
import {addProducts} from "@/features/products/products/productSlice"
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useToast } from "@/components/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"


export default function AddProductForm() {
  const [name, setName] = useState("")
  const [brandId, setBrandId] = useState("")
  const [productAttributes, setProductAttributes] = useState<Array<{ description: string; value: string }>>([])
  const [newAttribute, setNewAttribute] = useState("")
  const [newAttributeValue, setNewAttributeValue] = useState("")
  const [newCustomAttribute, setNewCustomAttribute] = useState("")
  const dispatch = useAppDispatch();
  const {brands} = useAppSelector((state) => state.brands);
  const {attributes} = useAppSelector((state) => state.attributes);
  const { toast } = useToast()
  const {error} = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchAttributes());
  },[dispatch])
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(addProducts(
      { 
       name,
      id_brand: Number.parseInt(brandId),
      attributes: productAttributes,
      status: true
    }
  ))

  
  if(error){
  
    toast({
      title: "Error al agregar el producto",
      description: error,
      variant:"destructive"
    })
  }else{
    toast({
      title: `El productp ${name} ha sido agregado`,
      description: "Puedes verlo en la lista de productos",
      variant: "success",
      action: (
        <ToastAction altText="Goto schedule to undo">Ok</ToastAction>
      ),
    })
  }

  console.log(productAttributes)

  
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
      setProductAttributes([...productAttributes, { description: attributeName, value:newAttributeValue }])
      setNewAttribute("")
      setNewCustomAttribute("")
      setNewAttributeValue("")
      if (!attributes.some(attr => attr.description === attributeName)) {
        dispatch(addAttribute({description:newCustomAttribute}))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          <Button
            type="button"
            onClick={handleAddAttribute}
            className="bg-cafe-light text-cafe-dark hover:bg-cafe-medium hover:text-cafe-cream"
          >
            Agregar
          </Button>
        </div>
      </div>
      <Button type="submit">Agregar Producto</Button>
    </form>
  )
}

