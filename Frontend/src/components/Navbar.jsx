import React from "react";
import { scroller } from "react-scroll";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Smooth scroll to sections (works even if user is not on Home page)
  const handleScrollNav = (id) => {
    if (location.pathname === "/") {
      // 🔹 Scroll directly if already on home
      scroller.scrollTo(id, {
        smooth: true,
        duration: 800,
        offset: -2, // Adjust for navbar height
      });
    } else {
      // 🔹 Navigate to home first, then scroll after a short delay
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(id, {
          smooth: true,
          duration: 800,
          offset: -64,
        });
      }, 400); // wait until home renders completely
    }
  };

  const navItemClass =
    "relative cursor-pointer transition duration-300 group inline-block transform group-hover:scale-110 group-hover:text-yellow-400";

  const renderScrollButton = (label, id) => (
    <button
      onClick={() => handleScrollNav(id)}
      className={navItemClass}
    >
      <span>{label}</span>
      <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg z-50">
      <h1 className="font-bold text-xl tracking-wide">Accident Risk Predictor</h1>

      <div className="space-x-6 flex">
        {/* Smooth scroll links */}
        {renderScrollButton("Home", "home")}
        {renderScrollButton("About", "about")}

        {/* Normal route link */}
        <RouterLink to="/prediction" className={navItemClass}>
          <span>Predict & High-zone</span>
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </RouterLink>

        {renderScrollButton("Contact", "contact")}
      </div>
    </nav>
  );
};

export default Navbar;
