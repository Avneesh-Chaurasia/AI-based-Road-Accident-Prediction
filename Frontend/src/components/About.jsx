import React from 'react'
import { motion } from 'framer-motion'
import img1 from '../assets/driver-age.png'
import img2 from '../assets/road-type.png'
import img3 from '../assets/time-of-day.png'
import img4 from '../assets/weather.png'

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6"
    >
      <motion.div
        className="max-w-6xl w-full flex flex-col lg:flex-row gap-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Left Side - About Text */}
        <motion.div className="lg:w-1/2 text-left flex flex-col justify-center" 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-6">About the Project</h2>
          
          <p className="text-lg leading-relaxed mb-6">
            The <span className="font-semibold">AI Road Accident Risk Predictor</span> is designed to 
            analyze key factors such as road conditions, weather, time of day, 
            and driver demographics to estimate accident risk levels in specific areas. 
            By combining data-driven machine learning models with interactive visualizations, 
            this project helps identify <span className="text-indigo-400">high-risk zones</span> and 
            supports safer decision-making for drivers, authorities, and urban planners.
          </p>

          <p className="text-lg leading-relaxed">
            The frontend is built with <span className="font-semibold">React & Tailwind CSS</span>, 
            while the backend integrates <span className="font-semibold">machine learning APIs </span> 
            trained on accident datasets. Users can input data, generate predictions, 
            and view risk maps to better understand accident patterns.
          </p>
        </motion.div>

        {/* Right Side - Image Grid */}
        <motion.div className="lg:w-1/2 grid grid-cols-2 gap-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img src={img1} alt="AI Project 1" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src={img2} alt="AI Project 2" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src={img3} alt="AI Project 3" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src={img4} alt="AI Project 4" className="w-full h-48 object-cover rounded-lg shadow-md" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
