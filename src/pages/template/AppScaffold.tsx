import { Outlet } from "react-router-dom";
import { AppNavbar, Footer } from "../../components";

export function AppScaffold() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3rem)]">
      <AppNavbar />
      <div className="flex flex-1 p-4 mt-4 rounded-box bg-base-200">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
