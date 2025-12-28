import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Team from "./components/Member";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import RiskPredictionMap from "./components/pages/RiskPredictionMap";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <div id="home"><Home /></div>
              <div id="about"><About /></div>
              <div id="team"><Team /></div>
              <div id="contact"><Contact /></div>
              <Footer />
            </>
          }
        />

        {/* Prediction Page */}
        <Route path="/prediction" element={<RiskPredictionMap />} />

        {/* 404 fallback */}
        <Route path="*" element={<h2 className="text-center mt-10">Page Not Found</h2>} />
      </Routes>
    </>
  );
};

export default App;
