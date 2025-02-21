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

    toast(`¡La marca ${name} a sido agregada correctamente!`,{
      icon: '☕',
      duration: 4000,
      removeDelay: 1000,
      style: {
        background: '#bc6c25',
        color: '#fefae0',
      }
    })
    dispatch(addBrand({name, description}))
    setName("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-xl shadow-sm">
      <div>
      <label htmlFor="brandName" className="block text-sm font-medium text-amber-800 mb-2">
        Nombre de la Marca
      </label>
      <Input 
        id="brandName" 
        className="rounded-full bg-white hover:bg-amber-100 text-amber-800" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
      />
      </div>
      <div>
      <label htmlFor="brandDescription" className="block text-sm font-medium text-amber-800 mb-2">
        Descripción
      </label>
      <Textarea 
        id="brandDescription" 
        className="bg-white hover:bg-amber-100 text-amber-800 rounded-xl"
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
      />
      </div>
      <Button 
      type="submit" 
      className=" bg-white hover:bg-amber-100 rounded-full text-amber-800 text-sm font-medium px-6 py-2 border border-amber-800"
      >
      Agregar Marca
      </Button>
    </form>
  )
}

