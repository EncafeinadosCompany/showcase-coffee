import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";



const App: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-grow overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
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
      </div>
      <div className="md:hidden">
      </div>
    </div>
  );
};

export default App;