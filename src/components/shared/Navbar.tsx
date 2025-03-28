import React, { useState } from "react";
import {
  Home,
  FileCode,
  FileText,
  CircleDollarSign,
  Phone,
  MessageCircle,
  Menu,
  X,
  Facebook,
  Instagram,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import type { ImageMetadata } from "astro";

// Define logo URL type to handle both string and ImageMetadata
type LogoUrlType = string | ImageMetadata | undefined;

interface NavbarProps {
  logoComponent?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ logoComponent }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    // Control body scroll
    if (newState) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  return (
    <>
      <div className="header-container transition-all duration-300 bg-[#581c87] rounded-full mx-4 mt-4 md:mx-auto md:max-w-max shadow-lg hover:shadow-xl">
        {/* Desktop Navigation - Expandable */}
        <nav className="hidden md:flex items-center h-14 px-2 hover:px-6 transition-all duration-300 rounded-full relative">
          {/* Left side links */}
          <div className="flex items-center">
            <a
              href="/"
              className="nav-item text-white font-medium p-2 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#6b21a8] group min-w-10 hover:px-4"
              aria-label="Pagina principală"
            >
              <Home
                size={20}
                className="group-hover:mr-2"
                stroke="#ffffff"
                strokeWidth={2.5}
              />
              <span className="nav-text hidden group-hover:inline">Acasă</span>
            </a>

            <a
              href="/servicii"
              className="nav-item text-white font-medium p-2 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#6b21a8] group min-w-10 hover:px-4"
              aria-label="Servicii oferite"
            >
              <FileCode
                size={20}
                className="group-hover:mr-2"
                stroke="#ffffff"
                strokeWidth={2.5}
              />
              <span className="nav-text hidden group-hover:inline">
                Servicii
              </span>
            </a>
            <a
              href="/preturi"
              className="nav-item text-white font-medium p-2 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#6b21a8] group min-w-10 hover:px-4"
              aria-label="Lista de prețuri"
            >
              <CircleDollarSign
                size={20}
                className="group-hover:mr-2"
                stroke="#ffffff"
                strokeWidth={2.5}
              />
              <span className="nav-text hidden group-hover:inline">
                Prețuri
              </span>
            </a>
          </div>

          {/* Center elements with fancy background */}
          <div className="flex items-center mx-2 z-10 relative">
            <div className="absolute -inset-2 bg-[#6b21a8] rounded-full blur-[1px] opacity-80"></div>
            <div className="relative z-10 flex items-center space-x-3 p-1">
              <ThemeToggle />
            </div>
          </div>

          {/* Right side links */}
          <div className="flex items-center">
            <a
              href="/blog"
              className="nav-item text-white font-medium p-2 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#6b21a8] group min-w-10 hover:px-4"
              aria-label="Articole pe blog"
            >
              <FileText
                size={20}
                className="group-hover:mr-2"
                stroke="#ffffff"
                strokeWidth={2.5}
              />
              <span className="nav-text hidden group-hover:inline">Blog</span>
            </a>
            <a
              href="/contact"
              className="nav-item text-white font-medium p-2 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#6b21a8] group min-w-10 hover:px-4"
              aria-label="Informații de contact"
            >
              <Phone
                size={20}
                className="group-hover:mr-2"
                stroke="#ffffff"
                strokeWidth={2.5}
              />
              <span className="nav-text hidden group-hover:inline">
                Contact
              </span>
            </a>

            <a
              href="https://wa.me/40770889907"
              target="_blank"
              aria-label="WhatsApp"
              className="nav-item text-white font-medium p-2 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-green-600 group min-w-10 hover:px-4 bg-green-500 ml-1"
            >
              <MessageCircle
                size={20}
                className="group-hover:mr-2"
                stroke="#ffffff"
                strokeWidth={2.5}
              />
              <span className="nav-text hidden group-hover:inline">
                WhatsApp
              </span>
            </a>
          </div>
        </nav>

        {/* Mobile Navigation - Always Compact */}
        <div className="md:hidden flex items-center justify-between h-14 px-4 relative">
          <a
            href="/"
            className="flex items-center"
            aria-label="Pagina principală"
          >
            {logoComponent}
          </a>

          {/* Center Controls - Mobile */}
          <div className="flex items-center justify-center gap-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <a
              href="tel:0770889907"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-transform hover:scale-110 shadow-md"
              aria-label="Apelează telefonic"
            >
              <Phone size={18} stroke="#ffffff" strokeWidth={2.5} />
            </a>

            <ThemeToggle />

            <a
              href="https://wa.me/40770889907"
              target="_blank"
              aria-label="WhatsApp"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 transition-transform hover:scale-110 shadow-md"
            >
              <MessageCircle
                size={18}
                stroke="#ffffff"
                strokeWidth={2.5}
                className="text-white"
              />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#6b21a8] text-white hover:bg-[#7e22ce] transition-colors z-10"
            aria-label="Deschide meniul"
            type="button"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X size={20} stroke="#ffffff" strokeWidth={2.5} />
            ) : (
              <Menu size={20} stroke="#ffffff" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-20 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className={`absolute right-0 top-0 h-screen w-64 bg-[#581c87] transition-transform duration-500 transform p-6 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full text-white">
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-xl">Meniu</span>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full hover:bg-[#6b21a8] transition-colors"
                aria-label="Închide meniul"
              >
                <X size={24} stroke="#ffffff" strokeWidth={2.5} />
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              <a
                href="/"
                className="flex items-center py-2 px-4 rounded-lg hover:bg-[#6b21a8] transition-colors"
                onClick={toggleMobileMenu}
              >
                <Home
                  size={20}
                  className="mr-3"
                  stroke="#ffffff"
                  strokeWidth={2.5}
                />
                <span>Acasă</span>
              </a>
              <a
                href="/servicii"
                className="flex items-center py-2 px-4 rounded-lg hover:bg-[#6b21a8] transition-colors"
                onClick={toggleMobileMenu}
              >
                <FileCode
                  size={20}
                  className="mr-3"
                  stroke="#ffffff"
                  strokeWidth={2.5}
                />
                <span>Servicii</span>
              </a>
              <a
                href="/preturi"
                className="flex items-center py-2 px-4 rounded-lg hover:bg-[#6b21a8] transition-colors"
                onClick={toggleMobileMenu}
              >
                <CircleDollarSign
                  size={20}
                  className="mr-3"
                  stroke="#ffffff"
                  strokeWidth={2.5}
                />
                <span>Prețuri</span>
              </a>
              <a
                href="/blog"
                className="flex items-center py-2 px-4 rounded-lg hover:bg-[#6b21a8] transition-colors"
                onClick={toggleMobileMenu}
              >
                <FileText
                  size={20}
                  className="mr-3"
                  stroke="#ffffff"
                  strokeWidth={2.5}
                />
                <span>Blog</span>
              </a>
              <a
                href="/contact"
                className="flex items-center py-2 px-4 rounded-lg hover:bg-[#6b21a8] transition-colors"
                onClick={toggleMobileMenu}
              >
                <Phone
                  size={20}
                  className="mr-3"
                  stroke="#ffffff"
                  strokeWidth={2.5}
                />
                <span>Contact</span>
              </a>
            </nav>

            <div className="mt-auto">
              <div className="border-t border-[#7e22ce] my-6"></div>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://facebook.com/siaskincenter"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-full hover:bg-[#6b21a8] transition-colors"
                >
                  <Facebook size={24} stroke="#ffffff" strokeWidth={2} />
                </a>
                <a
                  href="https://instagram.com/sia.skin.center"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-full hover:bg-[#6b21a8] transition-colors"
                >
                  <Instagram size={24} stroke="#ffffff" strokeWidth={2} />
                </a>
                <a
                  href="https://wa.me/40770889907"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
                >
                  <MessageCircle
                    size={24}
                    stroke="#ffffff"
                    strokeWidth={2}
                    className="text-white"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
