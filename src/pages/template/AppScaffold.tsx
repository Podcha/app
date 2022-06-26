import { Outlet } from "react-router-dom";
import { AppNavbar } from "../../components";

export function AppScaffold() {
  return (
    <div>
      <AppNavbar />
      <div className="p-4 mt-4 rounded-box bg-base-100">
        <Outlet />
      </div>
    </div>
  );
}
