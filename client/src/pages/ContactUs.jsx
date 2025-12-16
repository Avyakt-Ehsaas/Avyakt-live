import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import Footer from "./LandingPage/Footer"
import LandingSidebar from "./LandingPage/LandingSidebar/LandingSidebar"

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 14 } }
}

const ContactCard = ({ icon, title, value }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.03 }}
    className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition"
  >
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-100 text-orange-600 text-xl">
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </motion.div>
)

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you! Your message has been sent.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-orange-50">
      <LandingSidebar />

      {/* Hero */}
      <section className="pt-32 pb-24 text-center max-w-6xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900"
        >
          Contact <span className="text-orange-500">Avyakt Ehsaas</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Reach out to us for meditation programs, collaborations, or general inquiries. We’re here to help.
        </motion.p>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 pb-32 grid lg:grid-cols-2 gap-16">
        {/* Left */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-gray-900">Our Contact Details</h2>

          <ContactCard icon={<FiMail />} title="Email" value="support@avyaktehsaas.com" />
          <ContactCard icon={<FiPhone />} title="Phone" value="+91 98765 43210" />
          <ContactCard icon={<FiMapPin />} title="Office" value="Gurgaon, Haryana, India" />

          {/* Map */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-80"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d877.1040859706244!2d77.11484605038952!3d28.436863216602035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f4f89848ec1%3A0x148665ba85b67df2!2sAvyakt%20Ehsaas!5e0!3m2!1sen!2sin!4v1765907719727!5m2!1sen!2sin"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-10 border border-gray-200 shadow-lg space-y-6"
        >
          <h3 className="text-3xl font-bold text-gray-900">Send a Message</h3>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <textarea
            name="message"
            rows="6"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-orange-500 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2"
          >
            Send Message <FiSend />
          </motion.button>
        </motion.form>
      </section>

      <Footer />
    </div>
  )
}

export default ContactUs;