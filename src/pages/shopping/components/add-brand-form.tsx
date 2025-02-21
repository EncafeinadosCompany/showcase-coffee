import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {addBrand} from "@/features/products/brands/brandSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import toast from "react-hot-toast";

export default function AddBrandForm() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const dispatch = useAppDispatch();
  const {error} =useAppSelector(state => state.brands)

  


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!name && error ){
      toast.error(error || "El nombre de la marca es requerido")
      return
    }
    dispatch(addBrand({
      name, 
      description,
      image_url: '',
      razon: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      social_networks: []
    }))
    setName("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 rounded-full m-2">
          Nombre de la Marca
        </label>
        <Input  id="brandName" className="rounded-full" value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="brandDescription" className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <Textarea id="brandDescription" className="rounded-full" value={description} onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <Button type="submit" className="bg-white hover:bg-amber-100 rounded-full text-amber-800 text-sm font-medium">Agregar Marcaaaa</Button>
    </form>
  )
}

