import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface AddBrandFormProps {
  onAddBrand: (brand: { name: string; description: string }) => void
}

export default function AddBrandForm({ onAddBrand }: AddBrandFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddBrand({ name, description })
    setName("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">
          Nombre de la Marca
        </label>
        <Input id="brandName" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="brandDescription" className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <Textarea id="brandDescription" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <Button type="submit">Agregar Marca</Button>
    </form>
  )
}

