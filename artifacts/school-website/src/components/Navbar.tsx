import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Academics",
    path: "/academics",
    children: [
      { label: "Academics Overview", path: "/academics" },
      { label: "Faculty", path: "/faculty" },
    ],
  },
  { label: "Admissions", path: "/admissions" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    // passive: true tells the browser this handler never calls preventDefault(),
    // so it can fire the event without waiting — prevents scroll jank.
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const isActive = (path: string) => location === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#111111] shadow-xl" : "bg-[#111111]/95 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/school-logo.webp"
              alt="SS Bal Sadan School Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform border-2 border-white/30 flex-shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-white text-xs sm:text-sm lg:text-base leading-tight">
                SS Bal Sadan School
              </span>
              <span className="text-[#ffffff] text-[10px] sm:text-xs hidden sm:block">Siwan, Kaithal, Haryana</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive(link.path)
                        ? "text-[#ffffff]"
                        : "text-white/90 hover:text-[#ffffff]"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            className="block px-4 py-3 text-sm text-[#111111] hover:bg-[#111111]/10 hover:text-[#111111] transition-colors font-medium"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? "text-[#ffffff] bg-white/10"
                      : "text-white/90 hover:text-[#ffffff] hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/admissions"
              className="ml-3 px-5 py-2 bg-[#ffffff] text-[#111111] rounded-full font-semibold text-sm hover:bg-[#ffffff] transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile menu btn */}
          <button
            data-testid="button-mobile-menu"
            className="lg:hidden text-white p-3 rounded-md hover:bg-white/10 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#000000] border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.children ? (
                    <>
                      <button
                        className="w-full text-left px-4 py-2.5 text-white/80 font-medium text-sm flex items-center justify-between"
                        onClick={() =>
                          setOpenDropdown(openDropdown === link.label ? null : link.label)
                        }
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown === link.label && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.path}
                                href={child.path}
                                className="block px-4 py-2.5 text-[#ffffff] text-sm"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.path}
                      className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                        isActive(link.path)
                          ? "bg-[#ffffff]/20 text-[#ffffff]"
                          : "text-white/80 hover:text-[#ffffff]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/admissions"
                className="block mt-3 text-center px-5 py-2.5 bg-[#ffffff] text-[#111111] rounded-full font-semibold text-sm"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
