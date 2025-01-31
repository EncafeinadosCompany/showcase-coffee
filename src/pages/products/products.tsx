import ProductManagement from "./components/product-management"

export const Products = () => {
  return (
    <main className="container mx-auto p-12">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos - Cafetería</h1>
      <ProductManagement />
    </main>
  )
}
