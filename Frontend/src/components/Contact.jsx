import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="bg-gray-900 text-white py-16 px-6">
      <motion.div
        className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Left side - Contact Form */}
        <motion.div 
          className="lg:w-1/2 bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-md"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-indigo-400">Contact Us</h2>
          <p className="text-lg mb-6 text-gray-300">
            Have questions or suggestions? We’d love to hear from you!
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block mb-1 font-semibold">Name</label>
              <input 
                id="name"
                type="text" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full border border-gray-700 bg-gray-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
              <input 
                id="email"
                type="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full border border-gray-700 bg-gray-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-1 font-semibold">Message</label>
              <textarea 
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here"
                required
                className="w-full border border-gray-700 bg-gray-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500 transition duration-200"
            >
              Send Message
            </motion.button>

            {submitted && (
              <motion.p 
                className="text-green-400 text-center font-medium mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ✅ Message sent successfully!
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Right side - Contact Information (compact height) */}
        <motion.div 
          className="lg:w-auto bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-md self-start"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold mb-4 text-indigo-400">Contact Information</h3>
          <p className="mb-2"><span className="font-semibold">📍 Address:</span> 123 AI Street, Tech City, India</p>
          <p className="mb-2"><span className="font-semibold">📞 Phone:</span> +91 9876543210</p>
          <p className="mb-2"><span className="font-semibold">📧 Email:</span> info@accidentpredictor.com</p>
          <p><span className="font-semibold">🕒 Support Hours:</span> Mon - Fri, 9 AM – 6 PM</p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contact
