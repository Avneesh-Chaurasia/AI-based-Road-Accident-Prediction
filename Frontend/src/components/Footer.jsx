import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        {/* About / Brand */}
        <div>
          <h2 className="text-xl font-bold mb-2">Accident Risk Predictor</h2>
          <p className="text-gray-400 text-sm">
            Driving safety through data intelligence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-gray-400 text-sm space-y-1">
                <li><a href="#hero" className="relative text-white after:bg-white after:absolute after:h-[2px] after:w-0 after:bottom-[-2px] after:left-0 hover:after:w-full after:transition-all after:duration-300"> Home </a></li>
                <li><a href="#about" className="relative text-white after:bg-white after:absolute after:h-[2px] after:w-0 after:bottom-[-2px] after:left-0 hover:after:w-full after:transition-all after:duration-300"> About </a></li>
                <li><a href="#prediction" className="relative text-white after:bg-white after:absolute after:h-[2px] after:w-0 after:bottom-[-2px] after:left-0 hover:after:w-full after:transition-all after:duration-300"> Prediction </a></li>
                <li><a href="#contact" className="relative text-white after:bg-white after:absolute after:h-[2px] after:w-0 after:bottom-[-2px] after:left-0 hover:after:w-full after:transition-all after:duration-300"> Contact </a></li>
            </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-gray-400 text-sm mb-1">123 AI Street, Tech City, India</p>
          <p className="text-gray-400 text-sm mb-1">+91 9876543210</p>
          <p className="text-gray-400 text-sm">info@accidentpredictor.com</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Accident Risk Predictor. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
