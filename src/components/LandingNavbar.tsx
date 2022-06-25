import { Link } from "react-router-dom";

export function LandingNavbar() {
  return (
    <div className="navbar bg-base-100 rounded-box">
      <div className="navbar-start">
        <a className="text-xl normal-case btn btn-ghost">Podcha</a>
      </div>
      <div className="navbar-end">
        <Link to="/podcasts" className="btn">
          Launch app
        </Link>
      </div>
    </div>
  );
}
