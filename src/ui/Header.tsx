"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cart } from "@/components/Cart/ShoppingCart";
import { WishList } from "@/components/wishList/ShoppingWishList";
import { useState } from "react";
import { useKeycloakContext } from "../context/KeycloakContext";

const links = [
  { label: "Home", route: "/" },
  { label: "Clients", route: "/clients" },
  { label: "Profile", route: "/profile" },
  { label: "Demo", route: "/demo" },
];

export const Header = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { authenticated, keycloak } = useKeycloakContext();

  return (
    <header className="bg-stone-100 shadow-md">
      <nav className="container mx-auto px-4">
        <ul className="flex h-16 items-center justify-between font-medium text-stone-500">
          <div className="flex h-full flex-1">
            {links.map(({ label, route }, index) => (
              <li
                key={index}
                className={`flex h-full items-center justify-center px-4 ${
                  pathname === route
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100 hover:text-blue-500"
                }`}
              >
                <Link
                  href={route}
                  className="flex h-full items-center justify-center"
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Products Dropdown */}
            <li
              className={`relative flex h-full items-center justify-center px-4 ${
                pathname.startsWith("/products")
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100 hover:text-blue-500"
              }`}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <span className="cursor-pointer flex items-center gap-1">
                Products
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>

              {isDropdownOpen && (
                <ul className="absolute top-full left-0 z-10 w-40 bg-white shadow-md text-stone-700">
                  {[
                    { label: "Male Clothes", route: "/products/male" },
                    { label: "Female Clothes", route: "/products/female" },
                  ].map(({ label, route }) => (
                    <li
                      key={route}
                      className={`${
                        pathname === route
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-100"
                      }`}
                    >
                      <Link href={route} className="block px-4 py-2">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </div>

          <div className="flex items-center gap-4">
            <WishList />
            <Cart />
            {authenticated ? (
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                onClick={() => keycloak.logout()}
              >
                Logout
              </button>
            ) : (
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                onClick={() => keycloak.login()}
              >
                Login
              </button>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};
