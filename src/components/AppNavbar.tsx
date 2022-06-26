import { NavLink } from "react-router-dom";
import { DropdownIcon, DroprightIcon, HamburgerIcon } from "./icons";
import { WalletButton } from "./WalletButton";

const links: {
  name: string;
  to: string;
  children?: { name: string; to: string }[];
}[] = [
  { name: "Podcasts", to: "/podcasts" },
  { name: "Trending", to: "/trending" },
  {
    name: "Episodes",
    to: "/episodes",
    children: [
      { name: "Recommended", to: "/episodes/recommended" },
      { name: "Newest", to: "/episodes/newest" },
    ],
  },
  { name: "My show", to: "/create-podcast" },
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
            className="z-10 p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {links.map((link, key) => (
              <li key={key} tabIndex={tabIndex++}>
                <NavLink to={link.to} className="justify-between">
                  {link.name}
                  {link.children && <DroprightIcon />}
                </NavLink>
                {link.children && (
                  <ul className="z-20 p-2 bg-base-200">
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
        <a className="text-xl normal-case btn btn-ghost" href="/">
          <img className="pr-2" src="/podcha.png" /> Podcha
        </a>
        <div className="hidden lg:flex">
          <ul className="z-10 p-0 menu menu-horizontal">
            {links.map((link, key) => (
              <li key={key} tabIndex={tabIndex++} className="justify-between">
                <NavLink to={link.to}>
                  {link.name}
                  {link.children && <DropdownIcon />}
                </NavLink>
                {link.children && (
                  <ul className="z-20 p-2 bg-base-200">
                    {link.children.map((sublink, key) => (
                      <li key={key}>
                        <NavLink to={sublink.to}>{sublink.name}</NavLink>
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
        <WalletButton />
      </div>
    </div>
  );
}
