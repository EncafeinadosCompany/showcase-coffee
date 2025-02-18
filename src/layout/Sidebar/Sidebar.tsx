import { Home, ChevronLeft, BadgeDollarSign, ChevronRight, Users, LogOut, ShoppingBasket, Coffee, ScrollText } from 'lucide-react';
import { useState } from 'react';

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logoutUser } from "@/features/auth/authSlice";
import { useAuth } from "@/context/AuthContext1";

const Sidebar = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);

  const dispatch = useAppDispatch();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    logout();
    navigate("/");
  };

  const sidebarItems = [
    { icon: <Home />, label: 'Inicio', path: '/home' },
    { icon: <Users />, label: 'Proveedores', path: '/providers' },

    { icon: <Coffee />, label: 'Productos', path: '/products' },
    { icon: <ShoppingBasket />, label: 'Compras', path: '/shopping' },
    { icon: <BadgeDollarSign />, label: 'Ventas', path: '/sales' },
    { icon: <ScrollText />, label: 'Liquidaciones', path: '/liquidations' },
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
      border-amber-100
    `}>
      {/* Encabezado con Logo y Botón de Colapso */}
      <div className="flex items-center justify-between p-5 border-b border-amber-100 ">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3">
              <img
                src="../src/assets/images/logos/dark-logo.svg"
                alt="Logo"
                className="w-50 h-8"
              />
            </div>

          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="
            p-2 
            rounded-full 
           
            border 
           
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
                href={item.path}
                className={`
                  flex 
                  items-center 
                  p-3 
                  rounded-xl 
                  group 
                  hover:bg-amber-50 
                  transition-colors
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <div className="
                  text-gray-500 
                  group-hover:text-amber-600 
                  transition-colors
                ">
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="
                    ml-3 
                    text-gray-700 
                    group-hover:text-amber-600
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
        border-amber-100 
        p-4 
        mt-auto
      ">
        <ul className="space-y-2">
          {/* Botón de Logout */}
          <li>
            <button
            onClick={() => navigate('/profile')}
            className={`
            flex 
            items-center 
            p-3 
            rounded-xl 
            group 
            hover:bg-amber-50 
            transition-colors
            ${isCollapsed ? 'justify-center' : ''}
            `}
            >
            <div className="
            text-gray-500 
            group-hover:text-amber-600 
            transition-colors
            ">
            <Users />
            </div>
            {!isCollapsed && (
            <span className="
              ml-3 
              text-gray-700 
              group-hover:text-amber-600 
              transition-colors
            ">
              Perfil
            </span>
            )}
            </button>
            <button
              onClick={handleLogout}
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
            </button>
          </li>



        </ul>
      </div>
    </div>
  );
};

export default Sidebar;