import React, { useState } from "react";
import { MdEmail , MdPhone} from "react-icons/md";
import LandingSidebar from "./LandingPage/LandingSidebar/LandingSidebar";
import Rectangle from "../assets/images/Rectangle.png"
import ContactUS from "../assets/images/ContactUS.png"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [hoverCard, setHoverCard] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const openCalendly = () => {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({
      url: "https://calendly.com/saiamritp/30-minute-meeting-clone?primary_color=087037",
    });
  }
  };
  return (
    <div className="bg-white relative overflow-hidden">
      <LandingSidebar />
      {/* main first screen */}
        {/* Background Image */}
        <img
          src={Rectangle}
          alt=""
          className="absolute inset-0 md:h-screen md:w-screen z-0 pointer-events-none"
        />
     


        {/* Content */}
        <div className=" min-h-screen z-20 text-center text-greenbase flex justify-center items-center z-10">
          <div className="container max-w-5xl flex justify-between py-18">
            {/* left */}
            <div className="max-w-xl py-24">
              <h1 className="heading-main text-primary font-season font-med text-left"> Connect with avyakt</h1>
              <p className="paragraph-body text-primary text-left font-dm ">Whether you’re exploring a program, have a question, or want to collaborate, we’re here to help.</p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                   type="button"
                   onClick={openCalendly}
                   className="bg-[#71AC61]  w-full sm:w-[250px] text-white font-medium font-dm px-4 py-4 rounded-full hover:bg-[#4F7944] transition-all duration-300 cursor-pointer"
                >
                  Talk to our team
                </button>

                <button
                  className="bg-transparent border w-full sm:w-[250px] text-[#71AC61] font-medium font-dm px-4 py-4 cursor-pointer rounded-full hover:bg-[#4F7944] transition-all duration-300 hover:text-white"
                >
                  Email us directly
                </button>
              </div>
            </div>
            {/* right */}
            <div className="w-[360px] 2xl:w-[420px]">
              <img src={ContactUS} alt="contact us " />
            </div>
          </div>
        </div>

      {/* MAP + FORM SECTION */}
      <div className="py-12 md:py-12 px-4" id="contact">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-10">

            {/* MAP - Left Side with Animation */}
            <div className="md:col-span-3 animate-fade-in mt-4" style={{ animationDelay: '0.2s' }}>
              <div className="rounded-2xl md:rounded-2xl overflow-hidden shadow-2xl h-64 sm:h-80 md:h-130 border border-emerald-100 hover:shadow-3xl transition-shadow duration-500 group ">
                <div className="relative h-full w-full">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.8062058148685!2d77.06573327374258!3d28.425103893473185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d2277f957e045%3A0x84b1ea2fe2951fa!2sOcus%20Quantum%2C%20Sector%2051%2C%20Gurugram%2C%20Samaspur%2C%20Haryana%20122018!5e0!3m2!1sen!2sin!4v1775229018598!5m2!1sen!2sin" width="100%" height="100%" style={{ border: '0', display: 'block' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white/95 font-dm font-medium text-sm">Our Meditation Center</p>
                    <p className="text-white/80 font-dm text-xs">Sector 51, Gurugram, Haryana 122018</p>
                  </div>
                </div>

              </div>
              <div >
                <p className="text-primary font-dm paragraph-body font-med text-left mt-6">Choose how you’d like to reach us</p>
                <div className="flex gap-6 mt-4">
                  <div className="bg-[#C2E0BA33] px-4 py-3 rounded-xl">
                     <div className="flex">
                     <MdEmail  className="text-greenbase mr-2" size={28}/>
                    <h3 className="text-primary text-base md:text-[20px] font-med font-dm ">
                      Email</h3></div>
                    <p className="font-dm text-primary text-base md:text-[20px] "
                    >
                      hello@avyaktehsaas.com</p>
                  </div>
                  <div className="bg-[#C2E0BA33] px-4 py-3 rounded-xl">
                   <div className="flex">
                     <MdPhone  className="text-greenbase mr-2" size={28}/>
                    <h3 className="text-primary text-base md:text-[20px] font-med font-dm ">Call</h3></div>
                    <p className="font-dm text-primary text-base md:text-[20px]">+91 9454360828</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM - Right Side with Premium Design */}
            <div className="md:col-span-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gradient-to-br from-white to-emerald-50/40 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-emerald-100/50 backdrop-blur-sm">

                {/* Form Header */}
                <div className="mb-6 md:mb-8">
                  <h2 className="text-primary font-season font-med heading-large text-left">
                    Tell us a bit about what you’re looking for
                  </h2>

                  <p className="paragraph-secondary font-dm mt-2 text-primary text-left font-regular">Share your journey with us. Whether you have questions or just want to connect, we'd love to hear from you.</p>
                </div>

                {/* Form */}
                <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>

                  {/* Name Field */}
                  <div className="group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 sm:px-5 py-3 rounded-lg md:rounded-xl bg-white border-2 border-greenbase text-primary placeholder-[#71AC61] outline-none focus:border-greenbase focus:bg-[#71AC611A] transition-all duration-300 shadow-sm hover:shadow-md text-left paragraph-secondary font-dm font-medium text-greenbase"
                      placeholder="Full Name"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 sm:px-5 py-3 rounded-lg md:rounded-xl bg-white border-2 border-greenbase text-primary placeholder-[#71AC61] outline-none focus:border-greenbase focus:bg-[#71AC611A] transition-all duration-300 shadow-sm hover:shadow-md text-base font-dm font-medium paragraph-secondary text-left text-greenbase"
                      placeholder="E-mail"
                    />
                  </div>
                  <div className="group">
                    <input
                      type="text"
                      name="text"
                      value={formData.text}
                      onChange={handleChange}
                      className="w-full px-4 sm:px-5 py-3  rounded-lg md:rounded-xl bg-white border-2 border-greenbase text-primary placeholder-[#71AC61] outline-none focus:border-greenbase focus:bg-[#71AC611A] transition-all duration-300 shadow-sm hover:shadow-md paragraph-secondary text-left font-dm font-medium text-greenbase"
                      placeholder="Organisation(Optional)"
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="group">
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 sm:px-5 py-3 rounded-lg md:rounded-xl bg-white border-2 border-greenbase text-primary placeholder-gray-400 outline-none focus:border-greenbase focus:bg-[#71AC611A] transition-all duration-300 shadow-sm hover:shadow-md appearance-none cursor-pointer text-greenbase font-dm paragraph-secondary text-left"
                    >
                      <option value="">Inquiry type</option>
                      <option value="general">General Inquiry</option>
                      <option value="classes">About Classes</option>
                      <option value="retreat">Retreat Programs</option>
                      <option value="corporate">Corporate Wellness</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div className="group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 sm:px-5 py-3  rounded-lg md:rounded-xl bg-white border-2 border-greenbase text-primary placeholder-[#71AC61] outline-none focus:border-greenbase focus:bg-[#71AC611A] font-dm font-medium  transition-all duration-300 shadow-sm hover:shadow-md text-left paragraph-secondary font-dm text-greenbase"
                      placeholder="Tell us about your meditation experience or questions..."
                    ></textarea>
                  </div>

                  {/* Checkbox */}
                  {/* <div className="flex items-start gap-2 md:gap-3">
                    <input 
                      type="checkbox" 
                      id="consent"
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded border-2 border-[#71AC6144] text-white accent-[#71AC61] focus:ring-greenbase transition-all duration-300 cursor-pointer mt-1"
                    />
                    <label htmlFor="consent" className="text-xs sm:text-base text-primary font-medium font-dm cursor-pointer leading-relaxed">
                      I agree to be contacted and receive updates about our meditation programs
                    </label>
                  </div> */}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-greenbase-primary text-white font-semibold py-3 sm:py-4 rounded-xl md:rounded-xl transition-all duration-300 transform hover:scale-103 shadow-lg hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 group text-sm sm:text-base font-dm cursor-pointer"
                  >
                    <span>Send Message</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

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
