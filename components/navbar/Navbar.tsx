"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // for mobile menu icons

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const navLinks = [
    { name: "Events", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "Sign In", href: "/auth/login" },
  ];
  const adminLinks = [
    { name: "Events", href: "/dashboard/manage/events" },
    { name: "Gallery", href: "/dashboard/manage/gallery" },
  ];

  return (
    <nav className="bg-white border-b-2 border-primary-green shadow-lg fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-primary-blue hover:text-secondary-blue transition-colors duration-200"
          >
            Marsabit Cultural Events
          </Link>

          {/* Desktop Menu */}
          {!isLoggedIn && (
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "text-primary-green font-semibold border-b-2 border-primary-green pb-1"
                      : "text-gray-500 hover:text-primary-green transition-colors duration-200"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
          {isLoggedIn && (
            <div className="hidden md:flex space-x-8">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "text-primary-green font-semibold border-b-2 border-primary-green pb-1"
                      : "text-gray-dark hover:text-primary-green transition-colors duration-200"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  window.location.href = "/";
                }}
                className="bg-accent-red text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-dark hover:text-primary-green transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-light border-t-2 border-primary-green shadow-lg">
          {!isLoggedIn && (
            <div className="flex flex-col p-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`${
                    pathname === link.href
                      ? "text-primary-green font-semibold border-l-4 border-primary-green pl-3"
                      : "text-gray-dark hover:text-primary-green transition-colors duration-200 pl-3"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
          {isLoggedIn && (
            <div className="flex flex-col p-4 space-y-3">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`${
                    pathname === link.href
                      ? "text-primary-green font-semibold border-l-4 border-primary-green pl-3"
                      : "text-gray-dark hover:text-primary-green transition-colors duration-200 pl-3"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  window.location.href = "/";
                }}
                className="bg-accent-red text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200 font-medium mx-3 mt-2"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
