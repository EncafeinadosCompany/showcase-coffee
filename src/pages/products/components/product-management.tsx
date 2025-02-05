"use client"

import { useState, useEffect } from "react"
import ProductList from "./product-list"
import AddBrandForm from "./add-brand-form"
import AddProductForm from "./add-product-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { productType } from "@/types/products/product";
import { fetchProducts } from "@/features/products/products/productSlice";
import {fetchBrands, addBrand} from "@/features/products/brands/brandSlice";
import { brandType } from "@/types/products/brand"




// interface Brand {
//   id: number
//   name: string
//   description: string
// }

interface Attribute {
  name: string
  value: string
}

// interface Product {
//   id: number
//   name: string
//   brandId: number
//   attributes: Attribute[]
// }

export default function ProductManagement() {
  // const [brands, setBrands] = useState<Brand[]>([])
  // const [products, setProducts] = useState<Product[]>([])
  const [attributes, setAttributes] = useState<string[]>([])


  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector((state) => state.products);
  const {brands} = useAppSelector((state) => state.brands);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchBrands());
  }, [dispatch]);





  useEffect(() => {
    // Simular carga de datos iniciales
    // setBrands([
    //   { id: 1, name: "Café del Sur", description: "Café de origen colombiano" },
    //   { id: 2, name: "Dulces Delicias", description: "Repostería artesanal" },
    // ])
    // setProducts([
    //   { id: 1, name: "Espresso", brandId: 1, attributes: [{ name: "Tamaño", value: "Pequeño" }] },
    //   { id: 2, name: "Croissant", brandId: 2, attributes: [{ name: "Tipo", value: "Clásico" }] },
    // ])
    setAttributes(["Tamaño", "Tipo", "Sabor"])
  }, [])

  const addBrand_funtion = (newBrand: Omit<brandType, "id">) => {
    // const newBrand = { ...brand, id: brands.length + 1 }
    // setBrands([...brands, newBrand])
    addBrand(newBrand)
  }

  const addProduct = (product: Omit<productType, "id">) => {
    const newProduct = { ...product, id: products.length + 1 }
    // setProducts([...products, newProduct])
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
      <TabsContent value="add-brand">
        <AddBrandForm />
      </TabsContent>
      <TabsContent value="add-product">
        <AddProductForm
          brands={brands}
          attributes={attributes}
          onAddProduct={addProduct}
          onAddAttribute={addAttribute}
        />
      </TabsContent>
    </Tabs>
  )
}

