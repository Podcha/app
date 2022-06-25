import { Outlet } from "react-router-dom";
import { AppNavbar, Footer } from "../../components";

export function AppScaffold() {
  return (
    <div>
      <AppNavbar />
      <div className="p-4 mt-4 rounded-box bg-base-200 h-[calc(100vh-8rem)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
