import * as React from "react";
import { useEffect, useState } from "react";
import { Camera, Coffee, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchStoresID, editStore } from "@/features/companies/storeSlice";
import { addImages } from "@/features/images/imageSlice";
import toast, { Toaster } from "react-hot-toast";

// ELIMINAR INTERFAZ
interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
}

export default function CafePreview() {
  const { stores } = useAppSelector((state) => state.stores);
  const employee = useAppSelector((state) => state.auth.employee);
  const dispatch = useAppDispatch();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    logo: "",
  });

  useEffect(() => {
    if (employee) {
      dispatch(fetchStoresID(String(employee.id_store))).then((response) => {
        const store = response.payload;

        setFormData({
          name: store.name,
          email: store.email,
          phone: store.phone,
          address: store.address,
          logo: store.logo ?? "Sin logo",
        });
        setLogoPreview(store.logo);
      });
    }

    console.log(stores);
  }, [dispatch, employee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let imageUrl = "";

      if (logoPreview) {
        const fileInput = document.getElementById(
          "logo-upload"
        ) as HTMLInputElement;
        const file = fileInput.files?.[0];

        if (file) {
          const response = await dispatch(addImages(file));
          imageUrl = response.payload.image_url;
        }
      }
      if (employee) {
        dispatch(editStore({
          id: String(employee.id_store),
          store: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            logo: logoPreview
          }
        }))

        toast.success('¡Perfil actualizado con éxito! ☕', {
          icon: '🎉',
          duration: 4000,
          style: {
            background: '#4A3428',
            color: '#fff',
          }
        })

      }

    } catch (error: any) {
      toast.error("¡Error al guardar los cambios!");
    }

  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = async (
    even: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = even.target.files?.[0];

    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^3[0-9]{9}$/;
    return phoneRegex.test(phone);
  };
  
  return (
    <div className=" pt-4 flex items-center justify-center">
      <Toaster position="top-right" />
      <Card className="w-full max-w-lg bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-amber-100 rounded-full flex items-center justify-center animate-bounce">
            <Coffee className="w-6 h-6 text-amber-700" />
          </div>
          <CardTitle className="text-xl font-bold text-amber-900">
            Mi Cafetería
          </CardTitle>
          <p className="text-amber-600 text-sm">
            Personaliza el perfil de tu establecimiento
          </p>
        </CardHeader>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full border-4 border-amber-200 overflow-hidden flex items-center justify-center bg-amber-50 group-hover:border-amber-400 transition-all duration-300 shadow-lg">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-12 h-12 text-amber-300 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="logo-upload"
                  onChange={handleLogoChange}
                />
                <Label
                  htmlFor="logo-upload"
                  className="absolute bottom-2 right-2 bg-amber-500 text-white p-2 rounded-full cursor-pointer hover:bg-amber-600 hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <Camera className="w-5 h-5" />
                </Label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: "name",
                  label: "Nombre",
                  icon: Coffee,
                  placeholder: "Café Aromático",
                },
                {
                  id: "email",
                  label: "Correo",
                  icon: Mail,
                  placeholder: "cafe@ejemplo.com",
                  type: "email",
                },
                {
                  id: "phone",
                  label: "Teléfono",
                  icon: Phone,
                  placeholder: "3001234567",
                  type: "tel",
                },
                {
                  id: "address",
                  label: "Dirección",
                  icon: MapPin,
                  placeholder: "Calle 123 #45-67",
                },
              ].map((field) => (
                <div
                  key={field.id}
                  className={`relative transform transition-all duration-300 ${isHovered === field.id ? "scale-105" : ""
                    }`}
                  onMouseEnter={() => setIsHovered(field.id)}
                  onMouseLeave={() => setIsHovered("")}
                >
                  <Label
                    htmlFor={field.id}
                    className="text-amber-800 flex items-center gap-2"
                  >
                    <field.icon className="w-4 h-4" />
                    {field.label}
                  </Label>
                  <Input
                    id={field.id}
                    name={field.id}
                    type={field.type || "text"}
                    value={formData[field.id as keyof FormData] || ""}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-400 transition-all duration-300"
                    required
                  />
                </div>
              ))}
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={(e) => {
                if (!validatePhone(formData.phone) && formData.phone) {
                  e.preventDefault();
                  toast.error('El número de teléfono debe tener 10 dígitos y comenzar con 3', {
                    duration: 4000,
                    style: {
                      background: '#4A3428',
                      color: '#fff',
                    }
                  });
                }
              }}
            >
              Guardar Cambios
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
