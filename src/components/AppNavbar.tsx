import { NavLink } from "react-router-dom";
import { DropdownIcon, DroprightIcon, HamburgerIcon } from "./icons";

const links: {
  name: string;
  to: string;
  children?: { name: string; to: string }[];
}[] = [
  { name: "Podcasts", to: "/podcasts" },
  {
    name: "Episodes",
    to: "/episodes",
    children: [
      { name: "Recommended", to: "/episodes/recommended" },
      { name: "Newest", to: "/episodes/newest" },
    ],
  },
  { name: "My show", to: "/podcast/create" },
];

export function AppNavbar() {
  let tabIndex = 0;
  return (
    <div className="navbar bg-base-100 rounded-box">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <HamburgerIcon />
          </label>
          <ul
            tabIndex={0}
            className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {links.map((link, key) => (
              <li key={key} tabIndex={tabIndex++}>
                <NavLink to={link.to} className="justify-between">
                  <li>
                    {link.name}
                    {link.children && <DroprightIcon />}
                  </li>
                </NavLink>
                {link.children && (
                  <ul className="p-2 bg-base-200">
                    {link.children.map((sublink, key) => (
                      <NavLink key={key} to={sublink.to}>
                        <li>{sublink.name}</li>
                      </NavLink>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <a className="text-xl normal-case btn btn-ghost">Podcha</a>
        <div className="hidden lg:flex">
          <ul className="p-0 menu menu-horizontal">
            {links.map((link, key) => (
              <li tabIndex={tabIndex++} className="justify-between">
                <NavLink key={key} to={link.to}>
                  {link.name}
                  {link.children && <DropdownIcon />}
                </NavLink>
                {link.children && (
                  <ul className="p-2 bg-base-200">
                    {link.children.map((sublink, key) => (
                      <li>
                        <NavLink key={key} to={sublink.to}>
                          {sublink.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <button className="btn">
          <div
            className="h-12 w-12 m-[calc(-1rem-1px)] mr-4 rounded-l-[0.5rem] bg-cover bg-center"
            style={{
              backgroundImage: `url(https://api.lorem.space/image/face?hash=33791)`,
            }}
          />
          @lensrocks
        </button>
      </div>
    </div>
  );
}
