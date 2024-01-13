import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 items-center h-14">
      <Link href="/">Logo</Link>
      <ul className="flex">
        <li>
          <Link href="/">Dashboard</Link>
        </li>
        <li>
          <Link href="/issues">Issues</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
