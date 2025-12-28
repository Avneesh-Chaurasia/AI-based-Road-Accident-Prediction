import React from 'react'
import bgImage from '../assets/bg-image.jpg'
import { motion } from 'framer-motion'

const Home = () => {
    // ✅ Smooth scroll to Contact section
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact')
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section 
            id="home"
            className="min-h-screen flex flex-col items-center justify-center text-center text-white px-6 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10">
                <motion.h2 
                    className="text-5xl font-bold mb-4 drop-shadow-lg"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    AI Road Accident Prediction
                </motion.h2>

                <motion.h3 
                    className="text-2xl font-medium mb-6 drop-shadow-md"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                >
                    Smarter Road. Safer Lives. Powered by AI.
                </motion.h3>
                
                <motion.p 
                    className="text-xl max-w-2xl mb-10 drop-shadow-md"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                >
                    Welcome — this frontend demonstrates how to collect user inputs, 
                    call an ML backend for a prediction, and visualize high-risk zones on a map.
                </motion.p>
                
                <motion.div 
                    className="flex flex-wrap justify-center gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    {/* ✅ Balanced Button 1 */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <a 
                            href="/prediction"
                            className="inline-flex items-center justify-center w-56 h-14 rounded-lg bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-500 transition duration-200 shadow-lg border border-indigo-500"
                        >
                            Make a Prediction
                        </a>
                    </motion.div>

                    {/* ✅ Balanced Button 2 */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button 
                            onClick={scrollToContact}
                            className="inline-flex items-center justify-center w-56 h-14 rounded-lg border border-gray-300 cursor-pointer text-lg font-semibold hover:bg-gray-700 transition duration-200 shadow-lg"
                        >
                            Contact Us
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default Home
