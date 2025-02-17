import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area'; 
import { Camera, Coffee, Mail, Phone, MapPin } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { editStore } from '@/features/companies/storeSlice'; 
import { updateStore } from '@/features/companies/storeService'; 
import { Store } from '@/types/companies/store'; 

const CafeProfileEditor = () => {
  const dispatch = useAppDispatch();
  const employee = useAppSelector((state) => state.auth.employee);
  const storeId = employee?.id_store;

  const [formData, setFormData] = useState<Store>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    logo: null,
    status: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStoreData = async () => {
      if (storeId) {
        try {
          setIsLoading(true);
          // Aquí iría tu llamada a la API
          // const storeData = await fetchStoreInfo(storeId);
          // setFormData(storeData);
          // if (storeData.logo) setLogoPreview(storeData.logo);
        } catch (error) {
          toast.error('Error al cargar los datos de la tienda');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchStoreData();
  }, [storeId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) { 
        toast.error('La imagen es demasiado grande. Máximo 5MB');
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Formato de imagen no válido. Use JPG, PNG o GIF');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        logo: URL.createObjectURL(file),
      }));
      setLogoPreview(URL.createObjectURL(file));
      toast.success('¡Logo cargado exitosamente!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!storeId) {
      toast.error('No se ha encontrado la tienda actual.');
      return;
    }

    try {
      setIsLoading(true);
      const updatedStore = await updateStore(storeId.toString(), formData);
      dispatch(editStore({ id: storeId.toString(), store: updatedStore }));

      toast.success('¡Perfil actualizado con éxito! ☕', {
        icon: '🎉',
        duration: 4000,
        style: {
          background: '#4A3428',
          color: '#fff',
        },
      });
    } catch (error) {
      console.error('Error al actualizar la tienda:', error);
      toast.error('Error al actualizar la tienda. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^3[0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-8">
      <ScrollArea className="h-[calc(100vh-4rem)] rounded-lg">
        <div className="flex items-center justify-center p-4">
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'transform translate-y-16'
            }}
          />
          <Card className="w-full max-w-4xl bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
            <CardHeader className="text-center space-y-2 sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b">
              <div className="w-12 h-12 mx-auto bg-amber-100 rounded-full flex items-center justify-center animate-bounce">
                <Coffee className="w-6 h-6 text-amber-700" />
              </div>
              <CardTitle className="text-3xl font-bold text-amber-900">
                Mi Cafetería
              </CardTitle>
              <p className="text-amber-600 pb-4">Personaliza el perfil de tu establecimiento</p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center mb-8">
                  <div className="relative group">
                    <div className="w-40 h-40 rounded-full border-4 border-amber-200 overflow-hidden flex items-center justify-center bg-amber-50 group-hover:border-amber-400 transition-all duration-300 shadow-lg">
                      {logoPreview ? (
                        <img 
                          src={logoPreview} 
                          alt="Logo preview" 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" 
                        />
                      ) : (
                        <Camera className="w-16 h-16 text-amber-300 group-hover:scale-110 transition-transform duration-300" />
                      )}
                    </div>
                    <Input
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      onChange={handleLogoChange}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Label
                      htmlFor="logo-upload"
                      className="absolute bottom-2 right-2 bg-amber-500 text-white p-3 rounded-full cursor-pointer hover:bg-amber-600 hover:scale-110 transition-all duration-300 shadow-lg"
                    >
                      <Camera className="w-5 h-5" />
                    </Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: 'name', label: 'Nombre', icon: Coffee, placeholder: 'Café Aromático' },
                    { id: 'email', label: 'Correo', icon: Mail, placeholder: 'cafe@ejemplo.com', type: 'email' },
                    { id: 'phone', label: 'Teléfono', icon: Phone, placeholder: '3001234567', type: 'tel' },
                    { id: 'address', label: 'Dirección', icon: MapPin, placeholder: 'Calle 123 #45-67' },
                  ].map((field, index) => (
                    <div
                      key={field.id}
                      className={`relative transform transition-all duration-300 ${
                        isHovered === field.id ? 'scale-102' : ''
                      } ${index % 2 === 0 ? 'md:pr-3' : 'md:pl-3'}`}
                      onMouseEnter={() => setIsHovered(field.id)}
                      onMouseLeave={() => setIsHovered('')}
                    >
                      <div className="bg-white/50 p-4 rounded-lg hover:bg-white/80 transition-all duration-300">
                        <Label htmlFor={field.id} className="text-amber-800 flex items-center gap-2 mb-2 font-medium">
                          <field.icon className="w-4 h-4" />
                          {field.label}
                        </Label>
                        <Input
                          id={field.id}
                          name={field.id}
                          type={field.type || 'text'}
                          value={String(formData[field.id as keyof Store] || '')}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          className={`border-amber-200 focus:border-amber-400 focus:ring-amber-400 
                            transition-all duration-300 bg-white/80 ${
                            field.id === 'phone' && !validatePhone(formData.phone) && formData.phone
                              ? 'border-red-300'
                              : ''
                          }`}
                          required
                          disabled={isLoading}
                        />
                        {field.id === 'phone' && !validatePhone(formData.phone) && formData.phone && (
                          <p className="text-red-500 text-sm mt-2 animate-pulse">
                            Número colombiano inválido (debe comenzar con 3 y tener 10 dígitos)
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t">
                  <Button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg
                      transform hover:scale-102 transition-all duration-300 shadow-lg hover:shadow-xl
                      disabled:bg-gray-400 disabled:transform-none"
                    disabled={(!validatePhone(formData.phone) && !!formData.phone) || isLoading}
                  >
                    {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default CafeProfileEditor;