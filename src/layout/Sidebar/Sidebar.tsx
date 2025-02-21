import { ChevronLeft, BadgeDollarSign, ChevronRight, Users, LogOut, ShoppingBasket, Coffee, ScrollText, LayoutDashboard, Menu } from 'lucide-react';
import { useState, useEffect, FC } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logoutUser } from "@/features/auth/authSlice";
import { useAuth } from "@/context/AuthContext1";

interface SidebarItem {
  icon: JSX.Element;
  label: string;
  path: string;
}

const Sidebar: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = (): void => {
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

  const handleLogout = (): void => {
    dispatch(logoutUser());
    logout();
    navigate("/");
  };

  const sidebarItems: SidebarItem[] = [
    { icon: <LayoutDashboard />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Users />, label: 'Proveedores', path: '/providers' },
    { icon: <Coffee />, label: 'Productos', path: '/products' },
    { icon: <ShoppingBasket />, label: 'Compras', path: '/shopping' },
    { icon: <BadgeDollarSign />, label: 'Ventas', path: '/sales' },
    { icon: <ScrollText />, label: 'Liquidaciones', path: '/liquidations' },
  ];

  const MobileMenuButton: FC = () => (
    <button
      onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md border border-amber-100"
      aria-label="Toggle menu"
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
          h-full bg-white shadow-xl transition-all duration-300 ease-in-out flex flex-col rounded-3xl border border-amber-100
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobile ? 'fixed left-0 top-0 bottom-0 m-4 z-40' : 'sticky top-4'}
          ${isMobile && !isSidebarVisible ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-amber-100">
          {!isCollapsed && (
            <button
              onClick={() => navigate('/home')}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <img
                src="../src/assets/images/logos/dark-logo.svg"
                alt="Logo"
                className="w-50 h-8 cursor-pointer"
              />
            </button>
          )}


          <button
            onClick={() => isMobile ? setIsSidebarVisible(false) : setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full border transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="flex-grow pt-2 overflow-y-auto">
          <ul className="space-y-2 px-4">
            {sidebarItems.map((item) => (
              <li key={item.label}>
                <a href={item.path} className="flex items-center p-3 rounded-xl group hover:bg-amber-50 transition-colors">
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

        <div className="border-t border-amber-100 p-4 mt-auto">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center p-3 rounded-xl group hover:bg-amber-50 transition-colors"
              >
                <Users className="text-gray-500 group-hover:text-amber-600 transition-colors" />
                {!isCollapsed && (
                  <span className="ml-3 text-gray-700 group-hover:text-amber-600 transition-colors">
                    Perfil
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center p-3 rounded-xl group hover:bg-red-50 transition-colors"
              >
                <LogOut className="text-gray-500 group-hover:text-red-600 transition-colors" />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsSidebarVisible(false)} />
      )}
    </>
  );
};

export default Sidebar;
