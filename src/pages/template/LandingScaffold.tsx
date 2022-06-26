import { Outlet } from "react-router-dom";
import { Footer, LandingNavbar } from "../../components";

export function LandingScaffold() {
  return (
    <div className="flex flex-col min-h-full">
      <LandingNavbar />
      <div className="flex-1 p-4 mt-4 rounded-box bg-base-200">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
