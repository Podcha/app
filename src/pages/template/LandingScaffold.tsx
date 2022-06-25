import { Outlet } from "react-router-dom";
import { LandingNavbar } from "../../components";

export function LandingScaffold() {
  return (
    <div>
      <LandingNavbar />
      <Outlet />
    </div>
  );
}
