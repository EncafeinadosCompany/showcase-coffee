// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Camera, Coffee, Mail, Phone, MapPin } from 'lucide-react';
// import toast, { Toaster } from 'react-hot-toast';
// import { useAppSelector } from '@/hooks/useAppSelector';
// import { useAppDispatch } from '@/hooks/useAppDispatch';
// import { editStore } from '@/features/companies/storeSlice'; 
// import { updateStore } from '@/features/companies/storeService'; 

// const CafeProfileEditor = () => {
//   const dispatch = useAppDispatch();
//   const employee = useAppSelector((state) => state.auth.employee); 
//   const storeId = employee?.id_store; 

//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     logo: null,
//     status: true,
//   });

//   const [logoPreview, setLogoPreview] = useState<string | null>(null);
//   const [isHovered, setIsHovered] = useState('');

//   // Cargar la información de la tienda al montar el componente
//   useEffect(() => {
//     if (storeId) {
//       // Aquí puedes hacer una llamada a la API para obtener la información de la tienda
//       // y establecerla en el estado `formData`.
//       // Ejemplo:
//       // fetchStoreInfo(storeId).then((store) => setFormData(store));
//     }
//   }, [storeId]);

// interface FormData {
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
//     logo: File | null;
//     status: boolean;
// }

// interface Employee {
//     id_store: string;
// }

// interface RootState {
//     auth: {
//         employee: Employee;
//     };
// }

// const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = e.target;
//     setFormData((prev: FormData) => ({
//         ...prev,
//         [name]: value,
//     }));
// };

// interface HandleLogoChangeEvent extends React.ChangeEvent<HTMLInputElement> {
//     target: HTMLInputElement & EventTarget;
// }

// const handleLogoChange = (e: HandleLogoChangeEvent): void => {
//     const file = e.target.files?.[0];
//     if (file) {
//         setFormData((prev: FormData) => ({
//             ...prev,
//             logo: file,
//         }));
//         setLogoPreview(URL.createObjectURL(file));
//         toast.success('¡Logo cargado exitosamente!');
//     }
// };

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();

//     if (!storeId) {
//         toast.error('No se ha encontrado la tienda actual.');
//         return;
//     }

//     try {
//         // Actualiza la tienda utilizando el servicio `updateStore`
//         const updatedFormData = {
//             ...formData,
//             logo: formData.logo ? URL.createObjectURL(formData.logo) : null,
//         };
//         const updatedStore = await updateStore(storeId.toString(), updatedFormData);

//         // Actualiza el estado de Redux con la tienda actualizada
//         dispatch(editStore({ id: storeId.toString(), store: updatedStore }));

//         toast.success('¡Perfil actualizado con éxito! ☕', {
//             icon: '🎉',
//             duration: 4000,
//             style: {
//                 background: '#4A3428',
//                 color: '#fff',
//             },
//         });
//     } catch (error) {
//         console.error('Error al actualizar la tienda:', error);
//         toast.error('Error al actualizar la tienda. Por favor, inténtalo de nuevo.');
//     }
// };

// const validatePhone = (phone: string): boolean => {
//     const phoneRegex = /^3[0-9]{9}$/;
//     return phoneRegex.test(phone);
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 flex items-center justify-center">
//       <Toaster position="top-right" />
//       <Card className="w-full max-w-xl bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
//         <CardHeader className="text-center space-y-2">
//           <div className="w-12 h-12 mx-auto bg-amber-100 rounded-full flex items-center justify-center animate-bounce">
//             <Coffee className="w-6 h-6 text-amber-700" />
//           </div>
//           <CardTitle className="text-3xl font-bold text-amber-900">
//             Mi Cafetería
//           </CardTitle>
//           <p className="text-amber-600">Personaliza el perfil de tu establecimiento</p>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="flex justify-center mb-8">
//               <div className="relative group">
//                 <div className="w-40 h-40 rounded-full border-4 border-amber-200 overflow-hidden flex items-center justify-center bg-amber-50 group-hover:border-amber-400 transition-all duration-300 shadow-lg">
//                   {logoPreview ? (
//                     <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <Camera className="w-16 h-16 text-amber-300 group-hover:scale-110 transition-transform duration-300" />
//                   )}
//                 </div>
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleLogoChange}
//                   className="hidden"
//                   id="logo-upload"
//                 />
//                 <Label
//                   htmlFor="logo-upload"
//                   className="absolute bottom-2 right-2 bg-amber-500 text-white p-3 rounded-full cursor-pointer hover:bg-amber-600 hover:scale-110 transition-all duration-300 shadow-lg"
//                 >
//                   <Camera className="w-5 h-5" />
//                 </Label>
//               </div>
//             </div>

//             <div className="space-y-5">
//               {[
//                 { id: 'name', label: 'Nombre', icon: Coffee, placeholder: 'Café Aromático' },
//                 { id: 'email', label: 'Correo', icon: Mail, placeholder: 'cafe@ejemplo.com', type: 'email' },
//                 { id: 'phone', label: 'Teléfono', icon: Phone, placeholder: '3001234567', type: 'tel' },
//                 { id: 'address', label: 'Dirección', icon: MapPin, placeholder: 'Calle 123 #45-67' },
//               ].map((field) => (
//                 <div
//                   key={field.id}
//                   className={`relative transform transition-all duration-300 ${
//                     isHovered === field.id ? 'scale-105' : ''
//                   }`}
//                   onMouseEnter={() => setIsHovered(field.id)}
//                   onMouseLeave={() => setIsHovered('')}
//                 >
//                   <Label htmlFor={field.id} className="text-amber-800 flex items-center gap-2">
//                     <field.icon className="w-4 h-4" />
//                     {field.label}
//                   </Label>
//                   <Input
//                     id={field.id}
//                     name={field.id}
//                     type={field.type || 'text'}
//                     value={typeof formData[field.id as keyof FormData] === 'string' || typeof formData[field.id as keyof FormData] === 'undefined' ? formData[field.id as keyof FormData] || '' : ''}
//                     onChange={handleInputChange}
//                     placeholder={field.placeholder}
//                     className={`mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-400 
//                       transition-all duration-300 ${
//                       field.id === 'phone' && !validatePhone(formData.phone) && formData.phone
//                         ? 'border-red-300'
//                         : ''
//                     }`}
//                     required
//                   />
//                   {field.id === 'phone' && !validatePhone(formData.phone) && formData.phone && (
//                     <p className="text-red-500 text-sm mt-1 animate-pulse">
//                       Número colombiano inválido (debe comenzar con 3 y tener 10 dígitos)
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg
//                 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
//                 disabled:bg-gray-400 disabled:transform-none"
//               disabled={!validatePhone(formData.phone) && !!formData.phone}
//             >
//               Guardar Cambios
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CafeProfileEditor;