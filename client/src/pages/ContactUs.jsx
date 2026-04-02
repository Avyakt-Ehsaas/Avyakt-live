import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import Footer from "./LandingPage/Footer"
import LandingSidebar from "./LandingPage/LandingSidebar/LandingSidebar"
import ContactImage from '../assets/contactUs.webp'

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.5 } }
}

const ContactCard = ({ icon, title, value }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(113, 172, 97, 0.15)' }}
    className="relative group bg-white rounded-2xl px-7 py-4 border border-gray-100 shadow-sm transition-all duration-500 overflow-hidden"
  >
    {/* Decorative accent */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="flex items-center gap-5 relative z-10">
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-300"
        style={{ backgroundColor: '#71ac6120' }}
      >
        <span style={{ color: '#71ac61' }} className="text-2xl">
          {icon}
        </span>
      </motion.div>
      <div>
        <p className="text-lg font-medium font-season tracking-wide" style={{ color: '#71ac61' }}>{title}</p>
        <p className="text-base font-medium mt-2 font-dm leading-relaxed" style={{ color: '#191919' }}>{value}</p>
      </div>
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
    <div style={{ backgroundColor: '#ffffff' }} className="min-h-screen">
      <LandingSidebar />

      {/* Page Heading */}
      <section className="pt-28 pb-12 text-center max-w-5xl mx-auto px-6 relative">
        {/* Decorative circles */}
        <div className="absolute top-10 left-0 w-32 h-32 rounded-full bg-emerald-50/30 blur-3xl" style={{ backgroundColor: 'rgba(113, 172, 97, 0.08)' }} />
        <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-emerald-50/20 blur-3xl" style={{ backgroundColor: 'rgba(113, 172, 97, 0.06)' }} />
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <p className="text-sm font-season font-medium tracking-widest" style={{ color: '#71ac61' }}>GET IN TOUCH</p>
          </motion.div>
          <h1 className="text-6xl font-medium md:text-7xl tracking-tight mb-6 font-season leading-tight" style={{ color: '#191919' }}>
            Let's <span style={{ color: '#71ac61' }} className="relative">
              Connect
              <motion.span 
                className="absolute bottom-0 left-0 h-1" 
                initial={{ width: 0 }} 
                animate={{ width: '100%' }} 
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ backgroundColor: '#71ac61' }}
              />
            </span>
          </h1>
          <p className="text-lg tracking-wide font-medium font-dm max-w-2xl mx-auto leading-relaxed text-primary" >
            Have a question or want to collaborate? We'd love to hear from you. Drop us a message and we'll respond as soon as possible.
          </p>
        </motion.div>
      </section>

      {/* Contact Cards + Image */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Contact Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="mb-4">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-lg font-season tracking-widest font-semibold mb-3 text-primary" 
            >
              CONTACT INFORMATION
            </motion.p>
          </div>
          <ContactCard icon={<FiMail />} title="Email" value="support@avyaktehsaas.com" />
          <ContactCard icon={<FiPhone />} title="Phone" value="+91 98765 43210" />
          <ContactCard icon={<FiMapPin />} title="Office" value="15th Floor Ocus Quantum, Gurgaon, Haryana, India" />
        </motion.div>

        {/* Right: Animated Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center relative"
        >
          {/* Decorative background circle */}
          <div className="absolute inset-0 rounded-3xl" style={{ backgroundColor: 'rgba(113, 172, 97, 0.08)', transform: 'scale(1.1)' }} />
          <motion.img
            src={ContactImage}
            alt="Contact Us"
            className="w-full max-w-sm rounded-3xl shadow-lg relative z-10"
            whileHover={{ scale: 1.03 }}
            style={{ boxShadow: '0 30px 60px rgba(113, 172, 97, 0.2)' }}
          />
        </motion.div>
      </section>

      {/* Map + Form Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-16">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border border-gray-100 shadow-xl h-[500px] group relative"
          style={{ boxShadow: '0 20px 50px rgba(113, 172, 97, 0.1)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.8210031821345!2d77.06623457549323!3d28.42465747577892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d2277f766242f%3A0xc932b58d70526b94!2sOcus%20Quantum!5e0!3m2!1sen!2sin!4v1768907097682!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-12 border border-gray-100 shadow-xl relative"
          style={{ boxShadow: '0 20px 50px rgba(113, 172, 97, 0.08)' }}
        >
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full" style={{ backgroundColor: 'rgba(113, 172, 97, 0.08)' }} />
          
          <div className="relative z-10 space-y-8">
            <div>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-lg font-medium font-season tracking-widest mb-4" 
                style={{ color: '#71ac61' }}
              >
                Send us a Message
              </motion.p>
              <h3 className="text-4xl font-medium font-light mb-3 font-season" style={{ color: '#191919' }}>
                We're All <span style={{ color: '#71ac61' }}>Ears</span>
              </h3>
              <p className="text-base text-primary font-dm leading-relaxed">We'll get back to you within 24 hours</p>
            </div>

            <div className="space-y-5">
              <div className="relative">
                <label className="text-base font-medium font-dm block mb-3 text-primary">FULL NAME</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full px-6 py-4 font-dm rounded-2xl border border-gray-200 text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent font-dm bg-white/50 hover:bg-white"
                  style={{ color: '#191919' }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 4px rgba(113, 172, 97, 0.1)'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>

              <div className="relative">
                <label className="text-base font-dm font-medium block mb-3 text-primary">EMAIL ADDRESS</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-6 py-4 font-dm rounded-2xl border border-gray-200 text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent font-dm bg-white/50 hover:bg-white"
                  style={{ color: '#191919' }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 4px rgba(113, 172, 97, 0.1)'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>

              <div className="relative">
                <label className="text-base font-dm font-medium block mb-3 text-primary">MESSAGE</label>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  required
                  className="w-full px-6 py-4 font-dm rounded-2xl border border-gray-200 text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent resize-none font-dm bg-white/50 hover:bg-white"
                  style={{ color: '#191919' }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 4px rgba(113, 172, 97, 0.1)'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(113, 172, 97, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-2xl text-white font-semibold text-base flex items-center justify-center gap-3 transition-all duration-300 font-dm tracking-wide"
                style={{ backgroundColor: '#71ac61' }}
              >
                <span>Send Message</span> <FiSend size={20} />
              </motion.button>
            </div>
          </div>
        </motion.form>
      </section>
    </div>
  )
}

export default ContactUs;