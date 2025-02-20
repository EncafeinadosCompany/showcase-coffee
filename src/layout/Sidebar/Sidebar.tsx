import { Home, ChevronLeft, BadgeDollarSign, ChevronRight, Users, LogOut, ShoppingBasket, Coffee, ScrollText, LayoutDashboard, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logoutUser } from "@/features/auth/authSlice";
import { useAuth } from "@/context/AuthContext1";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const dispatch = useAppDispatch();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsSidebarVisible(false); 
      } else {
        setIsMobile(false);
        setIsSidebarVisible(true); 
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    logout();
    navigate("/");
  };

  const sidebarItems = [
    { icon: <Home />, label: 'Inicio', path: '/home' },
    { icon: <LayoutDashboard />, label: 'Dashboard', path: '/Dashboard' },
    { icon: <Users />, label: 'Proveedores', path: '/providers' },
    { icon: <Coffee />, label: 'Productos', path: '/products' },
    { icon: <ShoppingBasket />, label: 'Compras', path: '/shopping' },
    { icon: <BadgeDollarSign />, label: 'Ventas', path: '/sales' },
    { icon: <ScrollText />, label: 'Liquidaciones', path: '/liquidations' },
  ];

  const MobileMenuButton = () => (
    <button
      onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md border border-amber-100"
    >
      <Menu size={24} />
    </button>
  );

  if (isMobile && !isSidebarVisible) {
    return <MobileMenuButton />;
  }

  return (
    <>
      {isMobile && <MobileMenuButton />}
      <div 
        className={`
          bg-white 
          shadow-xl 
          transition-all 
          duration-300 
          ease-in-out 
          flex 
          flex-col 
          rounded-r-3xl 
          border-r 
          border-amber-100
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobile ? 'fixed h-full z-40' : 'h-screen'}
          ${isMobile && !isSidebarVisible ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
    
        <div className="flex items-center justify-between p-5 border-b border-amber-100">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <img
                src="../src/assets/images/logos/dark-logo.svg"
                alt="Logo"
                className="w-50 h-8"
              />
            </div>
          )}

          {isMobile ? (
            <button
              onClick={() => setIsSidebarVisible(false)}
              className="p-2 rounded-full border transition-colors"
            >
              <ChevronLeft />
            </button>
          ) : (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-full border transition-colors"
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
          )}
        </div>

      
        <nav className="flex-grow pt-2 overflow-y-auto">
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
                  <div className="text-gray-500 group-hover:text-amber-600 transition-colors">
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <span className="ml-3 text-gray-700 group-hover:text-amber-600 transition-colors">
                      {item.label}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-amber-100 p-4">
          <ul className="space-y-2">
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
                <div className="text-gray-500 group-hover:text-amber-600 transition-colors">
                  <Users />
                </div>
                {!isCollapsed && (
                  <span className="ml-3 text-gray-700 group-hover:text-amber-600 transition-colors">
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
                <div className="text-gray-500 group-hover:text-red-600 transition-colors">
                  <LogOut />
                </div>
                {!isCollapsed && (
                  <span className="ml-3 text-gray-700 group-hover:text-red-600 transition-colors">
                    Cerrar Sesión
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
      
 
      {isMobile && isSidebarVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarVisible(false)}
        />
      )}
    </>
  );
};

export default Sidebar;