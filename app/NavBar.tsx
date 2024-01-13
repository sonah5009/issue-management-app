"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaTasks } from "react-icons/fa";

const NavBar = () => {
  const currentPath = usePathname(); // browser api 에 의존하므로 client component 로 전환해야 함
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 items-center h-14">
      <Link href="/">
        <FaTasks />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            // className="text-zinc-500 hover:text-zinc-800 transition-colors"
            className={`${
              link.href === currentPath ? "text-zinc-800" : "text-zinc-500"
            } hover:text-zinc-800 transition-colors`}
            key={link.href}
            href={link.href}>
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
