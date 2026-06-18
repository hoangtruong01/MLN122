/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X, Landmark, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Trang chủ", id: "hero" },
    { label: "Lý thuyết", id: "ly-thuyet" },
    { label: "Tình huống", id: "tinh-huong" },
    { label: "Phân tích", id: "phan-tich" },
    { label: "Giải pháp", id: "giai-phap" },
    { label: "Sản phẩm", id: "san-pham" },
    { label: "Q&A", id: "qa" },
  ];

  const handleClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleClick("hero")}
            id="nav-logo-container"
          >
            <div className="p-2.5 bg-blue-600/10 rounded-xl border border-blue-500/20 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300">
              <Landmark className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-300 flex items-center gap-1.5">
                MLN122 <GraduationCap className="h-4 w-4 text-emerald-400" />
              </span>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">Chương 5 · Nhóm 5</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex space-x-1" id="nav-desktop-items">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleClick(item.id)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-blue-300 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden" id="nav-mobile-btn-container">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-item-${item.id}`}
                    onClick={() => handleClick(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? "bg-blue-600/20 border border-blue-500/30 text-blue-300"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
