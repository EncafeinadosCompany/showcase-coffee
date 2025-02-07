"use client"

import ProductList from "./product-list"
import AddBrandForm from "./add-brand-form"
import AddProductForm from "./add-product-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductManagement() {

 
  return (
    <Tabs defaultValue="products" className="w-full">
      <TabsList>
        <TabsTrigger value="products">Productos</TabsTrigger>
        <TabsTrigger value="add-brand">Agregar Marca</TabsTrigger>
        <TabsTrigger value="add-product">Agregar Producto</TabsTrigger>
      </TabsList>
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
  )
}

