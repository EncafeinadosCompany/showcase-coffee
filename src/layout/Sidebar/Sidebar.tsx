import { ChevronLeft, ChevronRight, Menu, LogOut, User, ChevronDown, Tag, Truck, ShoppingCart, Store, CreditCard, PackageSearch, PieChart } from 'lucide-react';
import { useState, useEffect, FC } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logoutUser } from "@/features/auth/authSlice";
import { useAuth } from "@/context/AuthContext1";
import { ModuleSection } from '@/types/common/sidebar';

const Sidebar: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const dispatch = useAppDispatch();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

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

  useEffect(() => {
    const newExpandedMenus: Record<string, boolean> = {};
    
    menuSections.forEach(section => {
      section.items.forEach(item => {
        if (item.subMenuItems) {
          const hasActiveSubItem = item.subMenuItems.some(subItem => 
            subItem.path === currentPath
          );
          
          if (hasActiveSubItem) {
            newExpandedMenus[item.label] = true;
          }
        }
      });
    });
    
    setExpandedMenus(prev => ({
      ...prev,
      ...newExpandedMenus
    }));
  }, [currentPath]);

  const handleLogout = (): void => {
    dispatch(logoutUser());
    logout();
    navigate("/");
  };

  const toggleSubmenu = (menuLabel: string): void => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuLabel]: !prev[menuLabel]
    }));
  };

  const menuSections: ModuleSection[] = [
    {
      title: "Dashboard",
      items: [
        { icon: <PieChart />, label: 'Estadísticas', path: '/dashboard' },
      ]
    },
    {
      title: "Inventario",
      items: [
        { icon: <Tag />, label: 'Marcas', path: '/brands' },
        { icon: <PackageSearch />, label: 'Productos', path: '/products' }
      ]
    },
    {
      title: "Operaciones",
      items: [
        {
          icon: <Truck />,
          label: 'Compras',
          subMenuItems: [
            { label: 'Nueva Orden', path: '/shopping' },
            { label: 'Historial', path: '/shoppingHistory' },
          ],
          path: ''
        },
        {
          icon: <ShoppingCart />,
          label: 'Ventas',
          subMenuItems: [
            { label: 'Nueva Venta', path: '/sales' },
            { label: 'Historial', path: '/salesHistory' }
          ],
          path: ''
        }
      ]
    },
    {
      title: "Administración",
      items: [
        { icon: <Store />, label: 'Proveedores', path: '/providers' },
        { icon: <CreditCard />, label: 'Pagos', path: '/liquidations' }
      ]
    },
  ];

  const isMenuItemActive = (path: string): boolean => {
    return currentPath === path;
  };

  const hasActiveSubItem = (subMenuItems: Array<{ label: string, path: string }>): boolean => {
    return subMenuItems.some(subItem => isMenuItemActive(subItem.path));
  };

  const MobileMenuButton: FC = () => (
    <button
      onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      className="fixed top-4 left-4 z-50 p-2 bg-amber-50 rounded-full shadow-md border border-amber-200"
      aria-label="Toggle menu">
      <Menu size={24} className="text-black" />
    </button>
  );

  if (isMobile && !isSidebarVisible) { return <MobileMenuButton /> }

  return (
    <>
      {isMobile && <MobileMenuButton />}
      <div
        className={`
          h-full bg-white shadow-xl transition-all duration-300 ease-in-out flex flex-col rounded-3xl border border-amber-200
          ${isCollapsed ? 'w-20' : 'w-72'}
          ${isMobile ? 'fixed left-0 top-0 bottom-0 m-4 z-40' : 'sticky top-4'}
          ${isMobile && !isSidebarVisible ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-amber-200">
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
            className="p-2 rounded-full border border-amber-300 bg-white text-black hover:bg-amber-50 transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="flex-grow pt-4 overflow-y-auto px-3 custom-scrollbar" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(217, 119, 6, 0.2) transparent'
        }}>
          {menuSections.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`} className="mb-6">
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-black uppercase px-4 mb-3">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-2 ">
                {section.items.map((item) => (
                  <li key={item.label} >
                    {item.subMenuItems ? (
                      <div className="flex flex-col">
                        <button
                          onClick={() => toggleSubmenu(item.label)}
                          className={`flex items-center justify-between p-3 w-full rounded-xl group hover:bg-amber-50 transition-colors
                            ${hasActiveSubItem(item.subMenuItems) ? 'bg-amber-50' : ''}`}
                        >
                          <div className="flex items-center">
                            <div className={`${hasActiveSubItem(item.subMenuItems) ? 'text-amber-800' : 'text-amber-700'} group-hover:text-amber-800 transition-colors`}>
                              {item.icon}
                            </div>
                            {!isCollapsed && (
                              <span className={`ml-3 ${hasActiveSubItem(item.subMenuItems) ? ' text-black' : 'text-black'} group-hover:text-black transition-colors`}>
                                {item.label}
                              </span>
                            )}
                          </div>
                          {!isCollapsed && (
                            <ChevronDown
                              className={`h-4 w-4 text-amber-700 transition-transform duration-200 ${expandedMenus[item.label] ? 'rotate-180' : ''}`}
                            />
                          )}
                        </button>

                        {/* Submenu items */}
                        {!isCollapsed && expandedMenus[item.label] && (
                          <ul className="pl-5 mt-1 space-y-1 border-l-2 border-amber-300 ml-4 py-2">
                            {item.subMenuItems.map((subItem) => (
                              <li key={subItem.label}>
                                <a
                                  href={subItem.path}
                                  className={`flex items-center p-2 text-sm rounded-xl group hover:bg-amber-50 transition-colors
                                    ${isMenuItemActive(subItem.path) ? 'bg-amber-100' : ''}`}
                                >
                                  <span className={`${isMenuItemActive(subItem.path) ? 'text-black' : 'text-black'} group-hover:text-black transition-colors`}>
                                    {subItem.label}
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <a
                        href={item.path}
                        className={`flex items-center p-3 rounded-xl group hover:bg-amber-50 transition-colors
                          ${isMenuItemActive(item.path) ? 'bg-amber-100' : ''}`}
                      >
                        <div className={`${isMenuItemActive(item.path) ? 'text-amber-800' : 'text-amber-700'} group-hover:text-amber-800 transition-colors`}>
                          {item.icon}
                        </div>
                        {!isCollapsed && (
                          <span className={`ml-3 ${isMenuItemActive(item.path) ? 'text-black' : 'text-black'} group-hover:text-black transition-colors`}>
                            {item.label}
                          </span>
                        )}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-amber-200 p-4 mt-auto bg-white bg-opacity-50 rounded-b-3xl">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate('/profile')}
                className={`flex items-center w-full p-3 rounded-xl group hover:bg-blue-50 transition-colors
                  ${isMenuItemActive('/profile') ? 'bg-blue-50' : ''}`}
              >
                <User className={`${isMenuItemActive('/profile') ? 'text-blue-600' : 'text-amber-700'} group-hover:text-blue-600 transition-colors`} />
                {!isCollapsed && (
                  <span className={`ml-3 ${isMenuItemActive('/profile') ? 'font-medium text-blue-600' : 'text-black'} group-hover:text-blue-600 transition-colors`}>
                    Mi Perfil
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-3 rounded-xl group hover:bg-red-50 transition-colors"
              >
                <LogOut className="text-amber-700 group-hover:text-red-600 transition-colors" />
                {!isCollapsed && (
                  <span className="ml-3 text-black group-hover:text-red-600 transition-colors">
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