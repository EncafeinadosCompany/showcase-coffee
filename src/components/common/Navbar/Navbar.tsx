import React, { useState } from 'react';
import { Menu, X, Home, Users, Briefcase, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { icon: <Home />, label: 'Inicio', href: '#' },
    { icon: <Users />, label: 'Nosotros', href: '#nosotros' },
    { icon: <Briefcase />, label: 'Servicios', href: '#servicios' },
    { icon: <Mail />, label: 'Contacto', href: '#contacto' }
  ];

  return (
    <nav className="bg-white shadow-xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo con estilo circular */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">A</span>
            </div>
            <span className="text-xl font-semibold text-gray-800 hidden md:block">
              Dashboard
            </span>
          </div>

          {/* Menú para pantallas grandes */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="
                  flex 
                  items-center 
                  p-2 
                  rounded-xl 
                  group 
                  hover:bg-blue-50 
                  transition-colors
                "
              >
                <div className="
                  text-gray-500 
                  mr-2
                  group-hover:text-blue-600 
                  transition-colors
                ">
                  {item.icon}
                </div>
                <span className="
                  text-gray-700 
                  group-hover:text-blue-600 
                  transition-colors
                ">
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          {/* Botón de menú móvil */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="
                p-2 
                rounded-full 
                bg-gray-100 
                hover:bg-gray-200 
                transition-colors
                focus:outline-none
              "
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="
                    flex 
                    items-center 
                    p-3 
                    rounded-xl 
                    group 
                    hover:bg-blue-50 
                    transition-colors
                  "
                >
                  <div className="
                    text-gray-500 
                    mr-3
                    group-hover:text-blue-600 
                    transition-colors
                  ">
                    {item.icon}
                  </div>
                  <span className="
                    text-gray-700 
                    group-hover:text-blue-600 
                    transition-colors
                  ">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;