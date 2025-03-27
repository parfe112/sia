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
  logoUrl?: LogoUrlType;
}

const Navbar: React.FC<NavbarProps> = ({ logoUrl }) => {
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
          <a href="/" className="flex items-center">
            <img
              src={typeof logoUrl === "string" ? logoUrl : logoUrl?.src}
              alt="SIA Skin Center Logo"
              className="h-8 w-auto"
              width={96}
              height={72}
              loading="eager"
            />
          </a>

          {/* Center Controls - Mobile */}
          <div className="flex items-center justify-center gap-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <a
              href="tel:0770889907"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-transform hover:scale-110 shadow-md"
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
            aria-label="Menu"
            type="button"
            onClick={toggleMobileMenu}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu - positioned higher in the DOM */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
          willChange: "transform",
          backfaceVisibility: "hidden",
          backgroundColor: "#581c87",
          display: isMobileMenuOpen ? "block" : "block",
        }}
        className="md:hidden"
      >
        <div className="h-20 border-b border-[#6b21a8] flex items-center justify-between px-4">
          <a
            href="/"
            className="flex items-center space-x-3 text-white font-bold text-2xl"
          >
            <img
              src={typeof logoUrl === "string" ? logoUrl : logoUrl?.src}
              alt="SIA Skin Center Logo"
              className="h-14 w-auto"
              width={128}
              height={96}
              loading="eager"
            />
            <span className="text-white font-normal">Skin Center</span>
          </a>
          {/* Close button */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#6b21a8] text-white hover:bg-[#7e22ce] transition-colors"
            onClick={toggleMobileMenu}
          >
            <X size={24} />
          </button>
        </div>

        <div
          className="container mx-auto px-4 py-8 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 80px)" }}
        >
          <nav className="space-y-3">
            <a
              href="/"
              className="flex items-center px-5 py-3 text-lg text-white hover:bg-[#6b21a8] rounded-xl transition-all"
              onClick={toggleMobileMenu}
            >
              <Home className="w-6 h-6 mr-3 text-white" stroke="#ffffff" />
              Acasă
            </a>

            <a
              href="/servicii"
              className="flex items-center px-5 py-3 text-lg text-white hover:bg-[#6b21a8] rounded-xl transition-all"
              onClick={toggleMobileMenu}
            >
              <FileCode className="w-6 h-6 mr-3 text-white" stroke="#ffffff" />
              Servicii
            </a>

            <a
              href="/blog"
              className="flex items-center px-5 py-3 text-lg text-white hover:bg-[#6b21a8] rounded-xl transition-all"
              onClick={toggleMobileMenu}
            >
              <FileText className="w-6 h-6 mr-3 text-white" stroke="#ffffff" />
              Blog
            </a>

            <a
              href="/preturi"
              className="flex items-center px-5 py-3 text-lg text-white hover:bg-[#6b21a8] rounded-xl transition-all"
              onClick={toggleMobileMenu}
            >
              <CircleDollarSign
                className="w-6 h-6 mr-3 text-white"
                stroke="#ffffff"
              />
              Prețuri
            </a>

            <a
              href="/contact"
              className="flex items-center px-5 py-3 text-lg text-white hover:bg-[#6b21a8] rounded-xl transition-all"
              onClick={toggleMobileMenu}
            >
              <Phone className="w-6 h-6 mr-3 text-white" stroke="#ffffff" />
              Contact
            </a>
          </nav>

          <div className="mt-10 pt-6 border-t border-[#6b21a8]">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <a
                href="https://www.facebook.com/profile.php?id=61554965023675"
                target="_blank"
                className="bg-[#1877F2] p-3 rounded-full text-white hover:opacity-90 transition-opacity"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/sia_epilare_definitiva/"
                target="_blank"
                className="bg-gradient-to-r from-[#FCAF45] via-[#E1306C] to-[#5851DB] p-3 rounded-full text-white hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/40770889907"
                target="_blank"
                className="bg-green-500 p-3 rounded-full text-white hover:bg-green-600 transition-all"
              >
                <MessageCircle size={20} stroke="#ffffff" strokeWidth={2.5} />
              </a>
            </div>

            <a
              href="/contact"
              className="block w-full bg-[#7e22ce] hover:bg-[#8b5cf6] text-white font-medium px-6 py-3 rounded-xl transition-all text-center shadow-sm hover:shadow-md"
              onClick={toggleMobileMenu}
            >
              Programare
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 9998,
          }}
          className="md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  );
};

export default Navbar;
