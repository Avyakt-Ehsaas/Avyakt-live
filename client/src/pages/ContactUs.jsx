import React, { useState } from "react";
import { Mail, Phone, MessageCircle, MapPin, Leaf, Heart, Wind } from "lucide-react";
import LandingSidebar from "./LandingPage/LandingSidebar/LandingSidebar";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [hoverCard, setHoverCard] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white text-gray-800 font-sans overflow-hidden">
      <LandingSidebar />

      {/* HERO - Minimal Half Style */}
      <div className="relative py-28 overflow-hidden bg-white">
        {/* Subtle Background Image */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-40 pointer-events-none" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506126613408-eca950e0c0cd?w=800&h=800&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></div>

        {/* Decorative Shapes */}
        <div className="absolute top-10 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full bg-gradient-to-br from-blue-100 to-emerald-100 opacity-20 blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-20 h-20 rounded-lg bg-emerald-200/20 transform rotate-45 opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/3 w-16 h-16 rounded-full border-2 border-blue-200/40"></div>

        {/* Content Grid */}
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-4 items-center">
          
          {/* Left Content */}
          <div className="animate-fade-in">
            <div className="mb-6 inline-block">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Let's Connect</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Reach Out &<br />
              <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">Find Peace</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              We're here to support your meditation journey. Whether you have questions or just want to share your experience, let's connect and grow together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg transition transform hover:scale-105">
                Get In Touch
              </a>
              <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-emerald-500 hover:text-emerald-600 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Visual - Shapes & Text */}
          <div className="relative h-96 hidden md:flex items-center justify-center">
            {/* Main Circle */}
            <div className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-emerald-200/40 to-blue-200/40 blur-2xl"></div>
            
            {/* Card 1 */}
            <div className="absolute top-0 right-0 w-48 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Leaf className="w-8 h-8 text-emerald-500 mb-3" />
              <p className="text-sm font-semibold text-gray-700">Peaceful</p>
              <p className="text-xs text-gray-500">Mindful journey</p>
            </div>

            {/* Card 2 */}
            <div className="absolute bottom-20 left-0 w-48 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Heart className="w-8 h-8 text-red-400 mb-3" />
              <p className="text-sm font-semibold text-gray-700">Connected</p>
              <p className="text-xs text-gray-500">Find wellness</p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/3 right-1/4 w-12 h-12 border-2 border-emerald-300/50 rounded-lg transform -rotate-45"></div>
            <div className="absolute bottom-1/3 left-1/3 w-8 h-8 rounded-full border-2 border-blue-300/50"></div>
          </div>

        </div>
      </div>


      {/* CONTACT CARDS - Premium Meditation Style */}
      <div className="py-20 px-4 bg-gradient-to-b from-white via-emerald-50/30 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Multiple Ways to <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Choose your preferred method to reach us. We're available 24/7 to support your wellness journey.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {/* Phone Card */}
            <div 
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-emerald-100/50 animate-fade-in"
              style={{ animationDelay: '0.1s' }}
              onMouseEnter={() => setHoverCard(0)}
              onMouseLeave={() => setHoverCard(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-emerald-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">Phone</h3>
                <p className="text-emerald-600 font-medium mb-1">207-8767-452</p>
                <p className="text-sm text-gray-500">Available Mon-Fri 9AM-6PM</p>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div 
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-emerald-100/50 animate-fade-in"
              style={{ animationDelay: '0.2s' }}
              onMouseEnter={() => setHoverCard(1)}
              onMouseLeave={() => setHoverCard(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">WhatsApp</h3>
                <p className="text-emerald-600 font-medium mb-1">+1-234-567-8900</p>
                <p className="text-sm text-gray-500">Quick responses</p>
              </div>
            </div>

            {/* Email Card */}
            <div 
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-emerald-100/50 animate-fade-in"
              style={{ animationDelay: '0.3s' }}
              onMouseEnter={() => setHoverCard(2)}
              onMouseLeave={() => setHoverCard(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">Email</h3>
                <p className="text-emerald-600 font-medium mb-1">hello@meditation.com</p>
                <p className="text-sm text-gray-500">Response within 24hrs</p>
              </div>
            </div>

            {/* Location Card */}
            <div 
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-emerald-100/50 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
              onMouseEnter={() => setHoverCard(3)}
              onMouseLeave={() => setHoverCard(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">Visit Us</h3>
                <p className="text-emerald-600 font-medium mb-1">Wellness Center</p>
                <p className="text-sm text-gray-500">2443 Oak Ridge, Omaha QA</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MAP + FORM SECTION */}
      <div className="py-20 px-4" id="contact">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-10">

            {/* MAP - Left Side with Animation */}
            <div className="md:col-span-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="rounded-3xl overflow-hidden shadow-2xl h-96 border border-emerald-100 hover:shadow-3xl transition-shadow duration-500 group">
                <div className="relative h-full">
                  <iframe
                    title="map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src="https://maps.google.com/maps?q=omaha&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="group-hover:opacity-90 transition-opacity duration-300"
                  ></iframe>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white font-semibold text-sm">Our Meditation Center</p>
                    <p className="text-white/80 text-xs">2443 Oak Ridge, Omaha QA 45065</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM - Right Side with Premium Design */}
            <div className="md:col-span-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gradient-to-br from-white to-emerald-50/40 rounded-3xl p-8 md:p-10 shadow-xl border border-emerald-100/50 backdrop-blur-sm">
                
                {/* Form Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-6 h-6 text-red-500" />
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get In Touch</h2>
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Share your journey with us. Whether you have questions or just want to connect, we'd love to hear from you.
                  </p>
                </div>

                {/* Form */}
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  
                  {/* Name Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-emerald-600 transition-colors">Your Name</label>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-white border-2 border-emerald-100 text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-500 focus:bg-emerald-50/30 transition-all duration-300 shadow-sm hover:shadow-md"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-emerald-600 transition-colors">Email Address</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-white border-2 border-emerald-100 text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-500 focus:bg-emerald-50/30 transition-all duration-300 shadow-sm hover:shadow-md"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-emerald-600 transition-colors">Subject</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-white border-2 border-emerald-100 text-gray-900 outline-none focus:border-emerald-500 focus:bg-emerald-50/30 transition-all duration-300 shadow-sm hover:shadow-md appearance-none cursor-pointer"
                    >
                      <option value="">Select a topic...</option>
                      <option value="general">General Inquiry</option>
                      <option value="classes">About Classes</option>
                      <option value="retreat">Retreat Programs</option>
                      <option value="corporate">Corporate Wellness</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-emerald-600 transition-colors">Your Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-5 py-4 rounded-xl bg-white border-2 border-emerald-100 text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-500 focus:bg-emerald-50/30 transition-all duration-300 shadow-sm hover:shadow-md resize-none"
                      placeholder="Tell us about your meditation experience or questions..."
                    ></textarea>
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="consent"
                      className="w-5 h-5 rounded border-2 border-emerald-300 text-emerald-600 accent-emerald-600 cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600 cursor-pointer">
                      I agree to be contacted and receive updates about our meditation programs
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 group"
                  >
                    <span>Send Message</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </form>

                {/* Support Info */}
                <div className="mt-8 pt-8 border-t border-emerald-100/50">
                  <p className="text-xs text-gray-500 text-center">
                    Average response time: <span className="font-semibold text-emerald-600">2 hours</span> • Available <span className="font-semibold text-emerald-600">24/7</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CTA SECTION - Before Footer */}
      <div className="px-4 py-16 bg-gradient-to-r from-emerald-50 via-blue-50 to-emerald-50">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Start Your Wellness Journey Today</h3>
          <p className="text-gray-600 mb-8 text-lg">Join thousands of members finding peace and balance through meditation</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg transition transform hover:scale-105">
              Explore Programs
            </button>
            <button className="px-8 py-3 bg-white border-2 border-emerald-500 text-emerald-600 font-semibold rounded-full hover:bg-emerald-50 transition transform hover:scale-105">
              Download App
            </button>
          </div>
        </div>
      </div>

      {/* Add required animations in global CSS */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
