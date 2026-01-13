import React, { useState } from "react";
import { Icon } from '@iconify/react';
import Button from "@mui/material/Button";
import LoginModal from "../pages/auth/LoginModal.jsx";
import RegisterModal from "../pages/auth/RegisterModal.jsx";
import ForgotPasswordModal from "../pages/auth/ForgotPasswordModal.jsx";
import LogoALC2 from '../assets/LogoALC2.png';

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSwitchToRegister = () => {
    setOpenLogin(false);
    setOpenRegister(true);
  };

  const handleSwitchToLogin = () => {
    setOpenRegister(false);
    setOpenForgotPassword(false);
    setOpenLogin(true);
  };

  const handleSwitchToForgotPassword = () => {
    setOpenLogin(false);
    setOpenForgotPassword(true);
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-20 flex items-center justify-between py-4">
        {/* Logo with Icon */}
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src={LogoALC2}
              alt="ALC Learning Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 font-medium">
          <li>
            <a href="#home" className="text-[#1F2937] hover:text-[#3b82f6] transition-colors duration-200" id="home-link">
              Home
            </a>
          </li>
          <li>
            <a
              href="#programs"
              className="text-[#1F2937] hover:text-[#3b82f6] transition-colors duration-200"
              id="programs-link"
            >
              Our Programs
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              className="text-[#1F2937] hover:text-[#3b82f6] transition-colors duration-200"
              id="testimonials-link"
            >
              Testimonials
            </a>
          </li>
          <li>
            <a href="#faq" className="text-[#1F2937] hover:text-[#3b82f6] transition-colors duration-200" id="faq-link">
              FAQ
            </a>
          </li>
        </ul>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <Button
            variant="outlined"
            sx={{
              borderRadius: "8px",
              color: "#3B82F6",
              borderColor: "#3b82f6",
              fontWeight: 600,
              px: 3,
              py: 1,
              textTransform: "none",
              fontSize: "medium",
              "&:hover": {
                backgroundColor: "#3B82F6",
                borderColor: "#3b82f6",
                color: "#fff",
              },
            }}
            onClick={() => setOpenLogin(true)}
          >
            Masuk
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#3b82f6",
              color: "#fff",
              fontWeight: 600,
              px: 3,
              py: 1,
              textTransform: "none",
              fontSize: "medium",
              "&:hover": {
                backgroundColor: "#2563eb",
              },
            }}
            onClick={() => setOpenRegister(true)}
          >
            Daftar
          </Button>
        </div>
        
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Icon icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"} className="w-6 h-6 text-[#1F2937]" />
        </button>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Links */}
            <a
              href="#home"
              className="block py-2 text-[#1F2937] hover:text-[#3b82f6] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#programs"
              className="block py-2 text-[#1F2937] hover:text-[#3b82f6] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Programs
            </a>
            <a
              href="#testimonials"
              className="block py-2 text-[#1F2937] hover:text-[#3b82f6] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="block py-2 text-[#1F2937] hover:text-[#3b82f6] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-3 border-t border-gray-200">
              <div className="flex flex-col gap-3">
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: "8px",
                    color: "#3B82F6",
                    borderColor: "#3b82f6",
                    fontWeight: 600,
                    py: 1.5,
                    textTransform: "none",
                    fontSize: "medium",
                    "&:hover": {
                      backgroundColor: "#3B82F6",
                      borderColor: "#3b82f6",
                      color: "#fff",
                    },
                  }}
                  onClick={() => {
                    setOpenLogin(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Masuk
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#3b82f6",
                    color: "#fff",
                    fontWeight: 600,
                    py: 1.5,
                    textTransform: "none",
                    fontSize: "medium",
                    "&:hover": {
                      backgroundColor: "#2563eb",
                    },
                  }}
                  onClick={() => {
                    setOpenRegister(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Daftar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <LoginModal 
        open={openLogin} 
        onClose={() => setOpenLogin(false)} 
        onSwitchToRegister={handleSwitchToRegister}
        onSwitchToForgotPassword={handleSwitchToForgotPassword}
      />
      <RegisterModal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <ForgotPasswordModal
        open={openForgotPassword}
        onClose={() => setOpenForgotPassword(false)}
        onBackToLogin={handleSwitchToLogin}
      />
    </nav>
  );
};

export default Navbar;
