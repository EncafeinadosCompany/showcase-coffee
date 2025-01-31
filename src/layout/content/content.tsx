import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {

  return (
    <div className="flex min-h-screen bg-gray-50">


      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <main className="flex-grow overflow-y-auto p-6 lg:p-8 ">
          <Outlet />
        </main>
      </div>
      <div className="md:hidden">
      </div>
    </div>
  );
};

export default Layout;