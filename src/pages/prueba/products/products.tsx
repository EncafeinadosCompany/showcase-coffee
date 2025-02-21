import {Link} from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductForm from "./components/productsForm"

export default function ProductosPage() {
  return (
    <div className="bg-[#F5E6D3] text-[#4A3933] h-full transition-all duration-700 overflow-y-auto py-4 px-4 ">
    <Link to="/details">
      <Button variant="outline" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>
    </Link>
    <div>
      <ProductForm></ProductForm>
    </div>
  </div>
  )
}

