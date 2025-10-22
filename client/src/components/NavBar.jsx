import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UseAppContext } from "../context/AppContext";
import Logo from "../assets/logo.png";

const NavBar = () => {
  const { setShowLogin, user, token, logout } = UseAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleNavClick = () => setIsMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const menuVariants = {
    closed: { x: "100%" },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const menuItemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="w-full text-black bg-gradient-to-r from-sky-200 via-blue-100 to-green-100 shadow-lg relative z-50"
      >
        <div className="flex justify-between items-center px-4 py-2 md:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 md:gap-4 hover:opacity-80 transition-opacity"
          >
            <motion.img
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              src={Logo}
              alt="logo"
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <h3 className="text-xl md:text-2xl font-bold">Kids Stories</h3>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-4 items-center">
            <Link to="/">
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer bg-amber-100 transition-all duration-300 rounded-xl p-2 px-4 ${
                  isActive("/") ? "bg-amber-300 font-bold shadow-md" : ""
                }`}
              >
                Home
              </motion.li>
            </Link>
            <Link to="/stories">
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer bg-amber-100 transition-all duration-300 rounded-xl p-2 px-4 ${
                  isActive("/stories") ? "bg-amber-300 font-bold shadow-md" : ""
                }`}
              >
                Stories
              </motion.li>
            </Link>
            <Link to="/favorites">
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer bg-amber-100 transition-all duration-300 rounded-xl p-2 px-4 ${
                  isActive("/favorites")
                    ? "bg-amber-300 font-bold shadow-md"
                    : ""
                }`}
              >
                Favorites
              </motion.li>
            </Link>

            {/* Dashboard يظهر فقط للأدمن */}
            {user?.role === "admin" && (
              <Link to="/owner">
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`cursor-pointer bg-purple-100 transition-all duration-300 rounded-xl p-2 px-4 ${
                    isActive("/owner") || location.pathname.startsWith("/owner")
                      ? "bg-purple-500 text-white font-bold shadow-md"
                      : ""
                  }`}
                >
                  Dashboard
                </motion.li>
              </Link>
            )}
          </ul>

          {/* ✅ زر Login / Logout */}
          {token && user ? (
            <div className="hidden md:flex items-center gap-3">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-medium text-gray-700"
              >
                Hi, <span className="font-bold">{user.name}</span>
              </motion.span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-all duration-300 ease-in-out shadow-md"
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogin(true)}
              className="hidden md:block px-4 py-2 rounded-xl bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-md"
            >
              Login
            </motion.button>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-white/30 transition-colors z-50"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.svg
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-sky-200 via-blue-100 to-green-100 shadow-2xl z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-between items-center p-4 border-b border-white/30"
              >
                <h3 className="text-xl font-bold">Menu</h3>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMenu}
                  className="p-2 rounded-lg hover:bg-white/30 transition-colors"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </motion.div>

              {/* User Info (if logged in) */}
              {token && user && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="px-4 py-3 bg-white/30 border-b border-white/30"
                >
                  <p className="text-sm text-gray-600">Welcome back,</p>
                  <p className="text-lg font-bold text-gray-800">{user.name}</p>
                  {user.role === "admin" && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="inline-block mt-1 px-2 py-1 text-xs bg-purple-500 text-white rounded-full"
                    >
                      Admin
                    </motion.span>
                  )}
                </motion.div>
              )}

              {/* Mobile Navigation Links */}
              <ul className="flex flex-col px-4 py-6 gap-3 flex-1 overflow-y-auto">
                {[
                  { path: "/", icon: "🏠", label: "Home" },
                  { path: "/stories", icon: "📚", label: "Stories" },
                  { path: "/favorites", icon: "❤️", label: "Favorites" },
                ].map((item, i) => (
                  <motion.div
                    key={item.path}
                    custom={i}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link to={item.path} onClick={handleNavClick}>
                      <motion.li
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                        className={`cursor-pointer rounded-xl p-4 text-center font-medium transition-all ${
                          isActive(item.path)
                            ? "bg-amber-300 shadow-md"
                            : "bg-amber-100 hover:bg-amber-200"
                        }`}
                      >
                        {item.icon} {item.label}
                      </motion.li>
                    </Link>
                  </motion.div>
                ))}

                {user?.role === "admin" && (
                  <motion.div
                    custom={3}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link to="/owner" onClick={handleNavClick}>
                      <motion.li
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                        className={`cursor-pointer rounded-xl p-4 text-center font-medium transition-all ${
                          isActive("/owner") ||
                          location.pathname.startsWith("/owner")
                            ? "bg-purple-500 text-white shadow-md"
                            : "bg-purple-100 hover:bg-purple-200"
                        }`}
                      >
                        ⚙️ Dashboard
                      </motion.li>
                    </Link>
                  </motion.div>
                )}
              </ul>

              {/* ✅ Login / Logout في القائمة الجانبية */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-4 border-t border-white/30"
              >
                {token && user ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-md"
                  >
                    Logout
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowLogin(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all shadow-md"
                  >
                    Login
                  </motion.button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
