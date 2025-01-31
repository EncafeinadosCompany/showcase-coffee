import { useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { loginUser } from "../features/auth/authSlice";
import { useAuth } from "@/context/AuthContext";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const { login } = useAuth(); // Usamos el contexto para gestionar la autenticación

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await dispatch(loginUser(form)).unwrap(); 
      console.log("Resultado del login:", result);
        // Espera la respuesta de loginUser
      if (result && result.token) {
        login(result.token); // Guarda el token y autentica
      }
    } catch (err) {
      console.error("Error en el login:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="w-full p-2 mb-4 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};
