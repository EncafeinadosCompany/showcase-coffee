"use client";

import { useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAuth } from "@/context/AuthContext1";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const LoginPage = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 🚨 Previene el doble envío
  
    const { email, password } = form; // ✅ Obtiene los valores correctos
  
    if (!email || !password) {
      console.error("Email y password son obligatorios");
      return;
    }
  
    login(email, password);
  };  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-amber-100">
      <Card className="w-full max-w-md border border-amber-200 shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Coffee className="h-12 w-12 text-amber-700" />
          </div>
          <CardTitle className="text-2xl text-center font-bold text-amber-800">
            Bienvenido a nuestra Cafetería
          </CardTitle>
          <CardDescription className="text-center text-amber-600">
            Ingresa tus credenciales para acceder
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-amber-700"
                >
                  Correo Electrónico
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-amber-700"
                >
                  Contraseña
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
            </div>
            <Button 
              className="w-full mt-6 bg-amber-700 hover:bg-amber-800 text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>
        
        {/* <CardFooter className="flex justify-center">
          <a href="#" className="text-sm text-amber-700 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </CardFooter> */}
      </Card>
    </div>
  );
};