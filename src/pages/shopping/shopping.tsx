import { useState, useEffect } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"

import { fetchVariants } from "@/features/products/variants/vatiantSlice";
import { fetchProducts } from "@/features/products/products/productSlice";

import { Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Shopping() {

  const dispatch = useAppDispatch();

  const { variants } = useAppSelector((state) => state.variants);
  const { products } = useAppSelector((state) => state.products);

  const [searchTerm, setSearch] = useState("");
  const [cartProducts, setcartProducts] = useState<Array<{
    id: number;
    name: string;
    quantity: number;
    roastingDate: string;
    shoppingPrice: number;
    salePrice: number;
    porcentage: number;
  }>>([]);
  const [currentProduct, setcurrentProduct] = useState({
    id: 0,
    name: "",
    quantity: 0,
    roastingDate: "",
    shoppingPrice: 0,
    salePrice: 0,
    porcentage: 0,
  });

  useEffect(() => {
    dispatch(fetchVariants());
  }, [dispatch]);

  useEffect(() => {
    if (variants.length > 0) {
      dispatch(fetchProducts());
    }
  }, [variants, dispatch]);

  const searchProduct = () => {
    try {
      const productFound = products.find((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (productFound) {
        setcurrentProduct({ ...currentProduct, id: productFound.id, name: productFound.name });
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al buscar producto:", error);
    }
  };

  const addProduct = () => {
    if (
      currentProduct.name &&
      currentProduct.quantity > 0 &&
      currentProduct.roastingDate &&
      currentProduct.shoppingPrice > 0 &&
      currentProduct.porcentage >= 0
    ) {
      const salePrice = currentProduct.shoppingPrice * (1 + currentProduct.porcentage / 100);
      setcartProducts([...cartProducts, { ...currentProduct, salePrice }]);
      setcurrentProduct({
        id: 0,
        name: "",
        quantity: 0,
        roastingDate: "",
        shoppingPrice: 0,
        salePrice: 0,
        porcentage: 0,
      });
      setSearch("");
    }
  };

  const deleteProduct = (id: number) => {
    setcartProducts(cartProducts.filter((producto) => producto.id !== id));
  };

  const totalCompra = cartProducts.reduce((sum, producto) => sum + producto.shoppingPrice * producto.quantity, 0);

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#4A3728] p-4 mb-8">Compras de Café</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-white shadow-lg h-[450px] overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl text-[#4A3728]">Buscar y Agregar Producto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input placeholder="Buscar producto" value={searchTerm} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={searchProduct}><Search className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg h-[450px] overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl text-[#4A3728]">Productos en la Compra</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {cartProducts.map((producto) => (
                <li key={producto.id} className="flex justify-between">
                  <span>{producto.name} ({producto.quantity} kg)</span>
                  <Button onClick={() => deleteProduct(producto.id)}><Trash2 className="h-5 w-5" /></Button>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <div>Total: ${totalCompra.toFixed(2)}</div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}