import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddProductFormProps {
  brands: Array<{ id: number; name: string }>
  attributes: string[]
  onAddProduct: (product: { name: string; brandId: number; attributes: Array<{ name: string; value: string }> }) => void
  onAddAttribute: (attribute: string) => void
}

export default function AddProductForm({ brands, attributes, onAddProduct, onAddAttribute }: AddProductFormProps) {
  const [name, setName] = useState("")
  const [brandId, setBrandId] = useState("")
  const [productAttributes, setProductAttributes] = useState<Array<{ name: string; value: string }>>([])
  const [newAttribute, setNewAttribute] = useState("")
  const [newAttributeValue, setNewAttributeValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddProduct({
      name,
      brandId: Number.parseInt(brandId),
      attributes: productAttributes,
    })
    setName("")
    setBrandId("")
    setProductAttributes([])
  }

  const handleAddAttribute = () => {
    if (newAttribute && newAttributeValue) {
      setProductAttributes([...productAttributes, { name: newAttribute, value: newAttributeValue }])
      setNewAttribute("")
      setNewAttributeValue("")
      if (!attributes.includes(newAttribute)) {
        onAddAttribute(newAttribute)
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
        <h3 className="text-sm font-medium text-gray-700 mb-2">Atributos</h3>
        {productAttributes.map((attr, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input value={attr.name} readOnly />
            <Input value={attr.value} readOnly />
          </div>
        ))}
        <div className="flex gap-2 mb-2">
          <Select value={newAttribute} onValueChange={setNewAttribute}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar atributo" />
            </SelectTrigger>
            <SelectContent>
              {attributes.map((attr) => (
                <SelectItem key={attr} value={attr}>
                  {attr}
                </SelectItem>
              ))}
              <SelectItem value="new">Agregar nuevo atributo</SelectItem>
            </SelectContent>
          </Select>
          {newAttribute === "new" && (
            <Input
              placeholder="Nuevo atributo"
              value={newAttribute}
              onChange={(e) => setNewAttribute(e.target.value)}
            />
          )}
          <Input placeholder="Valor" value={newAttributeValue} onChange={(e) => setNewAttributeValue(e.target.value)} />
          <Button type="button" onClick={handleAddAttribute}>
            Agregar
          </Button>
        </div>
      </div>
      <Button type="submit">Agregar Producto</Button>
    </form>
  )
}

