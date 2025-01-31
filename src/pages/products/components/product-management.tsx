"use client"

import { useState, useEffect } from "react"
import ProductList from "./product-list"
// import AddBrandForm from "./add-brand-form"
// import AddProductForm from "./add-product-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Brand {
  id: number
  name: string
  description: string
}

interface Attribute {
  name: string
  value: string
}

interface Product {
  id: number
  name: string
  brandId: number
  attributes: Attribute[]
}

export default function ProductManagement() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [attributes, setAttributes] = useState<string[]>([])

  useEffect(() => {
    // Simular carga de datos iniciales
    setBrands([
      { id: 1, name: "Café del Sur", description: "Café de origen colombiano" },
      { id: 2, name: "Dulces Delicias", description: "Repostería artesanal" },
    ])
    setProducts([
      { id: 1, name: "Espresso", brandId: 1, attributes: [{ name: "Tamaño", value: "Pequeño" }] },
      { id: 2, name: "Croissant", brandId: 2, attributes: [{ name: "Tipo", value: "Clásico" }] },
    ])
    setAttributes(["Tamaño", "Tipo", "Sabor"])
  }, [])

  const addBrand = (brand: Omit<Brand, "id">) => {
    const newBrand = { ...brand, id: brands.length + 1 }
    setBrands([...brands, newBrand])
  }

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: products.length + 1 }
    setProducts([...products, newProduct])
  }

  const addAttribute = (attribute: string) => {
    if (!attributes.includes(attribute)) {
      setAttributes([...attributes, attribute])
    }
  }

  return (
    <Tabs defaultValue="products" className="w-full">
      <TabsList>
        <TabsTrigger value="products">Productos</TabsTrigger>
        <TabsTrigger value="add-brand">Agregar Marca</TabsTrigger>
        <TabsTrigger value="add-product">Agregar Producto</TabsTrigger>
      </TabsList>
      <TabsContent value="products">
        <ProductList products={products} brands={brands} />
      </TabsContent>
      {/* <TabsContent value="add-brand">
        <AddBrandForm onAddBrand={addBrand} />
      </TabsContent>
      <TabsContent value="add-product">
        <AddProductForm
          brands={brands}
          attributes={attributes}
          onAddProduct={addProduct}
          onAddAttribute={addAttribute}
        />
      </TabsContent> */}
    </Tabs>
  )
}

