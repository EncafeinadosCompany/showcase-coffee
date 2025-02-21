import Sidebar from "../Sidebar/Sidebar"; 
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen w-full bg-[#F5E6D3] overflow-hidden">
      <div className="hidden m-4 md:flex md:flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <main className="flex-1 p-4 overflow-hidden">
          <div className="h-full w-full mx-auto max-w-8xl rounded-2xl overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <div className="md:hidden ">
        <Sidebar />
      </div>
    </div>
  );
};

export default Layout;