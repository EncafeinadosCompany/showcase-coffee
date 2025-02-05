import ProductManagement from "./components/product-management"

export const Products = () => {
  return (
    <main className="container mx-auto p-2 flex justify-center items-center min-h-screen">
    <div className="bg-white shadow-lg rounded-2xl p-10 max-w-8xl w-full">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Gestión de Productos - Cafetería
      </h1>
      <ProductManagement />
    </div>
  </main>
  )
}
