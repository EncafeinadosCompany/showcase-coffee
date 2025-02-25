import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchProducts } from "@/features/products/products/productSlice";
import toast from "react-hot-toast";
import { ShoppingDetail } from "@/types/transactions/shoppingModel";

export default function FormShopping({
  variant_id,
  setcartProducts,
}: {
  variant_id: number;
  cartProducts: ShoppingDetail[];
  setcartProducts: React.Dispatch<React.SetStateAction<ShoppingDetail[]>>;
}) {
  const [roasting_date, setRoasting_date] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [shopping_price, setShopping_price] = useState("");
  const [porcentajeVenta, setPorcentajeVenta] = useState("");
  const [sale_price, setSale_price] = useState("");
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatPrice = (value: string) => {
    const number = parseFloat(value.replace(/\./g, "").replace(",", "."));
    return isNaN(number) ? "" : number.toLocaleString("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const handleShoppingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\./g, ""); // Elimina los puntos
    setShopping_price(value);
  };

  const formatPorcentaje = (value: string) => {
    return value ? `${value}%` : "";
  };

  useEffect(() => {
    if (shopping_price && porcentajeVenta) {
      const precio = parseFloat(shopping_price.replace(/,/g, ""));
      const porcentaje = parseFloat(porcentajeVenta.replace(/%/g, ""));
      const nuevoPrecioVenta = precio * (1 + porcentaje / 100);
      setSale_price(nuevoPrecioVenta.toFixed());
    }
  }, [shopping_price, porcentajeVenta]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fechaActual = new Date();
    const fechaTostionDate = new Date(roasting_date);
    if (fechaTostionDate > fechaActual) {
      toast.error("La fecha de tostión no puede ser mayor a la fecha actual.", {
        id: "roasting_date-error",
        duration: 4000,
        removeDelay: 1000,
        icon: "📅",
      });
      return;
    }
    const diferenciaMeses =
      (fechaActual.getFullYear() - fechaTostionDate.getFullYear()) * 12 +
      (fechaActual.getMonth() - fechaTostionDate.getMonth());
    if (diferenciaMeses > 1) {
      toast.error("La fecha de tostión no puede ser mayor a un mes.", {
        id: 'totion',
        duration: 4000,
        removeDelay: 1000,
        icon: '📅'
      });
      return;
    }

    const cantidadNum = Number(cantidad);
    if (isNaN(cantidadNum) || cantidadNum <= 0) {
      toast.error("La cantidad debe ser un número positivo y mínimo 1.", {
        id: "cantidad-error",
        duration: 4000,
        removeDelay: 1000,
        icon: "❌",
      });
      return;
    }

    const shoppingPriceNum = parseFloat(shopping_price.replace(/,/g, ""));
    if (isNaN(shoppingPriceNum) || shoppingPriceNum <= 50) {
      toast.error("El precio de compra debe ser un número positivo y mínimo 50.", {
        id: "shopping_price-error",
        duration: 4000,
        removeDelay: 1000,
        icon: "❌",
      });
      return;
    }

    const porcentajeVentaNum = parseFloat(porcentajeVenta.replace(/%/g, ""));
    if (isNaN(porcentajeVentaNum) || porcentajeVentaNum < 1) {
      toast.error("El porcentaje de ganancia debe ser mínimo 1.", {
        id: "porcentajeVenta-error",
        duration: 4000,
        removeDelay: 1000,
        icon: "❌",
      });
      return;
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
        return [
          ...nuevoCarrito,
          {
            id: null,
            id_shopping: 0,
            id_variant_products: variant_id,
            roasting_date: roasting_date,
            shopping_price: shoppingPriceNum,
            sale_price: Number(sale_price),
            status: true,
            quantity: Number(cantidad),
          },
        ];
      }
    });

    toast("Producto se ha agregado al carrito", {
      id: "add",
      duration: 4000,
      removeDelay: 1000,
      icon: <ShoppingBag />,
      style: {
        background: "#bc6c25",
        color: "#fefae0",
      },
    });

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
        <Button className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 text-sm font-medium  transition-colors duration-200 rounded-sm">
          Agregar
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader className="mx-auto ">
          <DialogTitle>Agregar referencia</DialogTitle>
        </DialogHeader>
        <p id="dialog-description" className="sr-only">
          Por favor, completa los campos a continuación para agregar una nueva
          variante de producto.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fechaTostion" className="block text-sm font-medium text-gray-700">
              Fecha de Tostión
            </label>
            <Input
              id="roasting_date"
              type="date"
              className="rounded-[5px]"
              value={roasting_date}
              onChange={(e) => setRoasting_date(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
          <div>
            <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">
              Cantidad
            </label>
            <Input
              id="cantidad"
              type="number"
              min={1}
              value={cantidad}
              className="rounded-[5px]"
              onChange={(e) => setCantidad(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="shopping_price" className="block text-sm font-medium text-gray-700">
              Precio de Compra
            </label>
            <Input
              id="shopping_price"
              type="text"
              value={formatPrice(shopping_price)}
              onChange={handleShoppingPriceChange}
              required
            />
          </div>
          <div>
            <label htmlFor="porcentajeVenta" className="block text-sm font-medium text-gray-700">
              Porcentaje de Ganancia
            </label>
            <Input
              id="porcentajeVenta"
              type="text"
              value={formatPorcentaje(porcentajeVenta)}
              onChange={(e) => setPorcentajeVenta(e.target.value.replace(/%/g, ""))}
              required
            />
          </div>
          <div>
            <label htmlFor="sale_price" className="block text-sm font-medium text-gray-700">
              Precio de Venta
            </label>
            <Input
              id="sale_price"
              type="text"
              value={formatPrice(sale_price)}
              readOnly
            />
          </div>
          <Button
            type="submit"
            className="bg-[#6F4E37] hover:bg-[#5A3E2B] text-white w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Agregar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}