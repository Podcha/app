import { Outlet } from "react-router-dom";
import { Footer, LandingNavbar } from "../../components";

export function LandingScaffold() {
  return (
    <div>
      <LandingNavbar />
      <div className="p-4 mt-4 rounded-box bg-base-100">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
