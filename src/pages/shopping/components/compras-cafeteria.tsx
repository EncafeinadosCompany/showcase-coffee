// import { useState, useEffect } from "react";
// import {useAppDispatch} from "@/hooks/useAppDispatch"
// import {useAppSelector} from "@/hooks/useAppSelector"
// import { fetchVariants } from "@/features/products/variants/vatiantSlice";
// import { fetchProducts } from "@/features/products/products/productSlice";
// import { Plus, Search, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";

// export default function ComprasCafeteria() {
//   const dispatch = useAppDispatch();
//   const { variants } = useAppSelector((state) => state.variants);
//   const { products } = useAppSelector((state) => state.products);

//   const [busqueda, setBusqueda] = useState("");
//   const [productosCompra, setProductosCompra] = useState([]);
//   const [productoActual, setProductoActual] = useState({
//     id: 0,
//     nombre: "",
//     cantidad: 0,
//     fechaTostion: "",
//     precioCompra: 0,
//     precioVenta: 0,
//     porcentajeGanancia: 0,
//   });

//   useEffect(() => {
//     dispatch(fetchVariants());
//   }, [dispatch]);

//   useEffect(() => {
//     if (variants.length > 0) {
//       dispatch(fetchProducts());
//     }
//   }, [variants, dispatch]);

//   const buscarProducto = () => {
//     const productoEncontrado = products.find((p) =>
//       p.name.toLowerCase().includes(busqueda.toLowerCase())
//     );
//     if (productoEncontrado) {
//       setProductoActual({ ...productoActual, id: productoEncontrado.id, nombre: productoEncontrado.name });
//     }
//   };

//   const agregarProducto = () => {
//     if (
//       productoActual.nombre &&
//       productoActual.cantidad > 0 &&
//       productoActual.fechaTostion &&
//       productoActual.precioCompra > 0 &&
//       productoActual.porcentajeGanancia >= 0
//     ) {
//       const precioVenta = productoActual.precioCompra * (1 + productoActual.porcentajeGanancia / 100);
//       setProductosCompra([...productosCompra, { ...productoActual, precioVenta }]);
//       setProductoActual({
//         id: 0,
//         nombre: "",
//         cantidad: 0,
//         fechaTostion: "",
//         precioCompra: 0,
//         precioVenta: 0,
//         porcentajeGanancia: 0,
//       });
//       setBusqueda("");
//     }
//   };

//   const eliminarProducto = (id) => {
//     setProductosCompra(productosCompra.filter((producto) => producto.id !== id));
//   };

//   const totalCompra = productosCompra.reduce((sum, producto) => sum + producto.precioCompra * producto.cantidad, 0);

//   return (
//     <div>
//       <h1 className="text-4xl font-bold text-[#4A3728] p-4 mb-8">Compras de Café</h1>
//       <div className="grid gap-8 md:grid-cols-2">
//         <Card className="bg-white shadow-lg h-[450px] overflow-hidden">
//           <CardHeader>
//             <CardTitle className="text-2xl text-[#4A3728]">Buscar y Agregar Producto</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex gap-2 mb-4">
//               <Input placeholder="Buscar producto" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
//               <Button onClick={buscarProducto}><Search className="h-4 w-4" /></Button>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="bg-white shadow-lg h-[450px] overflow-hidden">
//           <CardHeader>
//             <CardTitle className="text-2xl text-[#4A3728]">Productos en la Compra</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ul>
//               {productosCompra.map((producto) => (
//                 <li key={producto.id} className="flex justify-between">
//                   <span>{producto.name} ({producto.cantidad} kg)</span>
//                   <Button onClick={() => eliminarProducto(producto.id)}><Trash2 className="h-5 w-5" /></Button>
//                 </li>
//               ))}
//             </ul>
//           </CardContent>
//           <CardFooter>
//             <div>Total: ${totalCompra.toFixed(2)}</div>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// }