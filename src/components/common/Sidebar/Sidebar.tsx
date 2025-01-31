import React, { useState } from 'react';
import { 
  Home, 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Settings, 
  BarChart2, 
  Folder, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems = [
    { icon: <Home />, label: 'Inicio', href: '#inicio' },
    { icon: <Users />, label: 'Usuarios', href: '#usuarios' },
    { icon: <BarChart2 />, label: 'Análisis', href: '#analisis' },
    { icon: <Folder />, label: 'Proyectos', href: '#proyectos' },
  ];

  const bottomItems = [
    { icon: <HelpCircle />, label: 'Ayuda', href: '#ayuda' },
    { icon: <Settings />, label: 'Configuración', href: '#configuracion' },
  ];

  return (
    <div className={`
      bg-white 
      shadow-xl 
      h-screen 
      transition-all 
      duration-300 
      ease-in-out 
      ${isCollapsed ? 'w-20' : 'w-64'}
      flex 
      flex-col 
      rounded-r-3xl 
      border-r 
      border-gray-100
    `}>
      {/* Encabezado con Logo y Botón de Colapso */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">A</span>
            </div>
            <img src="/path/to/your/logo.svg" alt="Logo" className="w-10 h-10" />
          </div>
        )}
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="
            p-2 
            rounded-full 
            bg-gray-100 
            hover:bg-gray-200 
            transition-colors
          "
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Menú Principal */}
      <nav className="flex-grow pt-6">
        <ul className="space-y-2 px-4">
          {sidebarItems.map((item) => (
            <li key={item.label}>
              <a 
                href={item.href} 
                className={`
                  flex 
                  items-center 
                  p-3 
                  rounded-xl 
                  group 
                  hover:bg-blue-50 
                  transition-colors
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <div className="
                  text-gray-500 
                  group-hover:text-blue-600 
                  transition-colors
                ">
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="
                    ml-3 
                    text-gray-700 
                    group-hover:text-blue-600 
                    transition-colors
                  ">
                    {item.label}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sección Inferior */}
      <div className="
        border-t 
        border-gray-100 
        p-4 
        mt-auto
      ">
        <ul className="space-y-2">
          {bottomItems.map((item) => (
            <li key={item.label}>
              <a 
                href={item.href} 
                className={`
                  flex 
                  items-center 
                  p-3 
                  rounded-xl 
                  group 
                  hover:bg-blue-50 
                  transition-colors
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <div className="
                  text-gray-500 
                  group-hover:text-blue-600 
                  transition-colors
                ">
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="
                    ml-3 
                    text-gray-700 
                    group-hover:text-blue-600 
                    transition-colors
                  ">
                    {item.label}
                  </span>
                )}
              </a>
            </li>
          ))}
          
          {/* Botón de Logout */}
          <li>
            <a 
              href="#logout" 
              className={`
                flex 
                items-center 
                p-3 
                rounded-xl 
                group 
                hover:bg-red-50 
                transition-colors
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <div className="
                text-gray-500 
                group-hover:text-red-600 
                transition-colors
              ">
                <LogOut />
              </div>
              {!isCollapsed && (
                <span className="
                  ml-3 
                  text-gray-700 
                  group-hover:text-red-600 
                  transition-colors
                ">
                  Cerrar Sesión
                </span>
              )}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;