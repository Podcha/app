import { Outlet } from "react-router-dom";
import { Navbar } from "../../components";

export function Scaffold() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
