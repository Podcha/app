const links: { name: string; children?: { name: string }[] }[] = [
  { name: "Podcasts" },
  { name: "Episodes", children: [{ name: "Link 1" }, { name: "Link 2" }] },
  { name: "My show" },
];

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h8m-8 6h16"
      />
    </svg>
  );
}

function DropdownRightIcon() {
  return (
    <svg
      className="fill-current"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
    </svg>
  );
}

function DropdownDownIcon() {
  return (
    <svg
      className="fill-current"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
    </svg>
  );
}

export function Navbar() {
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
                <a className="justify-between">
                  {link.name}
                  {link.children && <DropdownRightIcon />}
                </a>
                {link.children && (
                  <ul className="p-2 bg-base-200">
                    {link.children.map((sublink, key) => (
                      <li key={key}>
                        <a>{sublink.name}</a>
                      </li>
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
              <li key={key} tabIndex={tabIndex++}>
                <a className="justify-between">
                  {link.name}
                  {link.children && <DropdownDownIcon />}
                </a>
                {link.children && (
                  <ul className="p-2 bg-base-200">
                    {link.children.map((sublink, key) => (
                      <li key={key}>
                        <a>{sublink.name}</a>
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
