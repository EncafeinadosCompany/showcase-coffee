import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import {ShoppingBag} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchProducts } from "@/features/products/products/productSlice";
import toast from "react-hot-toast";
import { ShoppingVariant } from "@/types/transactions/ShoppingVariant";

export default function FormShopping({
  variant_id, cartProducts, setcartProducts
}: {
  variant_id: number
  cartProducts: ShoppingVariant[];
  setcartProducts: React.Dispatch<React.SetStateAction<ShoppingVariant[]>>;
}) {
  const [roasting_date, setRoasting_date] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [shopping_price, setShopping_price] = useState("");
  const [porcentajeVenta, setPorcentajeVenta] = useState("");
  const [sale_price, setSale_price] = useState("");
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (shopping_price && porcentajeVenta) {
      const precio = Number.parseFloat(shopping_price);
      const porcentaje = Number.parseFloat(porcentajeVenta);
      const nuevoPrecioVenta = precio * (1 + porcentaje / 100);
      setSale_price(nuevoPrecioVenta.toFixed(2));
    }
  }, [shopping_price, porcentajeVenta]);

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    const fechaActual = new Date();
    const fechaTostionDate = new Date(roasting_date);
    const diferenciaMeses =
      (fechaActual.getFullYear() - fechaTostionDate.getFullYear()) * 12 +
      (fechaActual.getMonth() - fechaTostionDate.getMonth());
    if (diferenciaMeses > 1) {
      toast.error("La fecha de tostión no puede ser mayor a un mes",{
        id: 'totion',
        duration: 4000,
        removeDelay: 1000,
        icon:'📅'
      })
      return
    }


    setcartProducts((prev) => {
        const nuevoCarrito = structuredClone(prev); 
  
        const productoEnCarrito = nuevoCarrito.find(
          (p) => Number(p.id_variant_products) === Number(variant_id)
        );
  
        if (productoEnCarrito) {
          return nuevoCarrito.map((p) =>
            Number(p.id_variant_products) === Number(variant_id)
              ? { ...p, quantity: (p.quantity || 0) + 1 } 
              : p
          );
        } else {
          return [...nuevoCarrito, { 
            id: null,
            id_shopping: 0, 
            id_variant_products: variant_id, 
            roasting_date: roasting_date, 
            shopping_price: Number(shopping_price), 
            sale_price: Number(sale_price), 
            status: true, 
            quantity: Number(cantidad) 
          }]; 
        }
      });

    toast('Producto se ha agregado al carrito',{
      id: 'add',
      duration: 4000,
      removeDelay: 1000,
      icon: <ShoppingBag />,
      style: {
        background: '#bc6c25',
        color: '#fefae0',
      }
    })

    setRoasting_date("");
    setCantidad("");
    setShopping_price("");
    setPorcentajeVenta("");
    setSale_price("");
    setIsModalOpen(false);
    dispatch(fetchProducts());  
  };
  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200">
          Agregar
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Variante</DialogTitle>
        </DialogHeader>
        <p id="dialog-description" className="sr-only">
          Por favor, completa los campos a continuación para agregar una nueva
          variante de producto.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label
              htmlFor="fechaTostion"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha de Tostión
            </label>
            <Input
              id="roasting_date"
              type="date"
              value={roasting_date}
              onChange={(e) => setRoasting_date(e.target.value)}
              required
            />
          </div> 
          <div>
            <label
              htmlFor="cantidad"
              className="block text-sm font-medium text-gray-700"
            >
              Cantidad
            </label>
            <Input
              id="cantidad"
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
            />
          </div>
           <div>
            <label
              htmlFor="shopping_price"
              className="block text-sm font-medium text-gray-700"
            >
              Precio de Compra
            </label>
            <Input
              id="shopping_price"
              type="number"
              step="0.01"
              value={shopping_price}
              onChange={(e) => setShopping_price(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="porcentajeVenta"
              className="block text-sm font-medium text-gray-700"
            >
              Porcentaje de Venta
            </label>
            <Input
              id="porcentajeVenta"
              type="number"
              step="0.1"
              value={porcentajeVenta}
              onChange={(e) => setPorcentajeVenta(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="sale_price"
              className="block text-sm font-medium text-gray-700"
            >
              Precio de Venta
            </label>
            <Input
              id="sale_price"
              type="number"
              step="0.01"
              value={sale_price}
              readOnly
            />
          </div>
          <Button
            type="submit"
            className="bg-[#6F4E37] hover:bg-[#5A3E2B] text-white w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
            Agregar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
