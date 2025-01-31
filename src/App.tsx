import React from "react";
import Navbar from "./components/common/Navbar/Navbar";
import Sidebar from "./components/common/Sidebar/Sidebar";


const App: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Fijo en el lado izquierdo */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Contenedor principal con Navbar y contenido */}
      <div className="flex-1 flex flex-col">
        {/* Navbar - Fijo en la parte superior */}
        <Navbar />
        
        {/* Área de contenido principal con padding y scroll */}
        <main className="flex-grow overflow-y-auto p-6 lg:p-8">
          {/* Contenedor para centrar y limitar ancho máximo */}
          <div className="max-w-7xl mx-auto">
            {/* Outlet para renderizado de rutas anidadas */}
            
            
            {/* Contenido por defecto si no hay rutas */}
            <div className="text-center py-16">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                Bienvenido a MyApp
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Aplicación moderna desarrollada con React, Vite y Tailwind CSS
              </p>
            </div>
          </div>
        </main>

        {/* Footer opcional */}
        <footer className="bg-white border-t border-gray-100 p-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MyApp. Todos los derechos reservados.
          </p>
        </footer>
      </div>

      {/* Sidebar móvil - Menú desplegable para móviles */}
      <div className="md:hidden">
        {/* Aquí podrías agregar un drawer o menú lateral para móviles */}
      </div>
    </div>
  );
};

export default App;