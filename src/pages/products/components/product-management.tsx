"use client"

import ProductList from "./product-list"
import AddBrandForm from "./add-brand-form"
import AddProductForm from "./add-product-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
// import { useNavigate } from "react-router-dom"

export default function ProductManagement() {

//  const navigate = useNavigate()

  return (
   <div >
     <Tabs defaultValue="products" className="w-full rounded-full" >
      <div className="flex justify-between items-center ">
      <TabsList className="rounded-full" >
        <TabsTrigger className= "rounded-2xl hover:bg-gray-100 text-amber-800 hover:text-[#99582a]"value="products">Productos</TabsTrigger>
        <TabsTrigger className= "rounded-2xl hover:bg-gray-100 text-amber-800 hover:text-[#99582a]" value="add-brand">Agregar Marca</TabsTrigger>
        <TabsTrigger className= "rounded-2xl hover:bg-gray-100 text-amber-800 hover:text-[#99582a]" value="add-product">Agregar Producto</TabsTrigger>
      </TabsList>
      <Button onClick={() => window.open("/page", "_blank")} className="bg-white hover:bg-amber-100 rounded-full text-amber-800 text-sm font-medium">Ver de otra forma</Button>
      </div>
      <TabsContent value="products">
        <ProductList/>
      </TabsContent>
      <TabsContent value="add-brand">
        <AddBrandForm />
      </TabsContent>
      <TabsContent value="add-product">
        <AddProductForm/>
      </TabsContent>
    </Tabs>
   
   </div>
  )
}

