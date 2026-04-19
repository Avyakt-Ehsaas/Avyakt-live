import React, { useState } from "react";
import { MdEmail, MdPhone } from "react-icons/md";
import LandingSidebar from "./LandingPage/LandingSidebar/LandingSidebar";
import Rectangle from "../assets/images/Rectangle.png"
import ContactUS from "../assets/image 164.png"

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
      {/* <img
          src={Rectangle}
          alt=""
          className="absolute inset-0 md:h-screen md:w-screen z-0 pointer-events-none"
        /> */}

      {/* Content */}
      <div className=" min-h-screen z-20 text-center text-greenbase flex items-center z-10 w-full">
        <div className="grid grid-cols-2 py-18 w-full">
          {/* left */}
          <div className="flex flex-col justify-end py-24 md:pl-[10%] lg:pl-[15%]">
            <h1 className="heading-main text-primary font-season font-med text-left"> Connect with avyakt</h1>
            <p className="paragraph-body text-primary font-dm text-left">Whether you’re exploring a program, have a question, or want to collaborate, we’re here to help.</p>
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
          {/* right */}
          <div className="p-0">
            <img className="w-full h-full" src={ContactUS} alt="contact us" />
          </div>
        </div>
      </div>

      {/* MAP + FORM SECTION */}
      <div className="py-12 md:py-12 px-4" id="contact">
        <div className="max-w-full px-[6%]">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-10 items-stretch">

            {/* LEFT SIDE */}
            <div
              className="md:col-span-3 flex flex-col h-full animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {/* MAP */}
              <div className="rounded-2xl overflow-hidden shadow-2xl flex-1 border border-emerald-100">
                <div className="relative h-full w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.8062058148685!2d77.06573327374258!3d28.425103893473185!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d2277f957e045%3A0x84b1ea2fe2951fa!2sOcus%20Quantum%2C%20Sector%2051%2C%20Gurugram%2C%20Samaspur%2C%20Haryana%20122018!5e0!3m2!1sen!2sin!4v1775229018598!5m2!1sen!2sin"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>

                  {/* Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white/95 font-dm font-medium text-sm">
                      Our Meditation Center
                    </p>
                    <p className="text-white/80 font-dm text-xs">
                      Sector 51, Gurugram, Haryana 122018
                    </p>
                  </div>
                </div>
              </div>

              {/* CONTACT OPTIONS */}
              <div className="mt-6">
                <p className="text-primary font-dm paragraph-body font-med text-left">
                  Choose how you’d like to reach us
                </p>

                <div className="flex gap-6 mt-8 flex-wrap">
                  {/* Email */}
                  <div className="bg-[#C2E0BA33] px-4 py-3 rounded-xl">
                    <div className="flex items-center">
                      <MdEmail className="text-greenbase mr-2" size={28} />
                      <h3 className="text-primary text-base md:text-[20px] font-med font-dm">
                        Email
                      </h3>
                    </div>
                    <p className="font-dm text-primary text-base md:text-[20px]">
                      hello@avyaktehsaas.com
                    </p>
                  </div>

                  {/* Call */}
                  <div className="bg-[#C2E0BA33] px-4 py-3 rounded-xl">
                    <div className="flex items-center">
                      <MdPhone className="text-greenbase mr-2" size={28} />
                      <h3 className="text-primary text-base md:text-[20px] font-med font-dm">
                        Call
                      </h3>
                    </div>
                    <p className="font-dm text-primary text-base md:text-[20px]">
                      +91 9454360828
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE (FORM) */}
            <div
              className="md:col-span-3 animate-fade-in h-full"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="bg-gradient-to-br from-white to-emerald-50/40 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 h-full flex flex-col justify-between">

                {/* Header */}
                <div className="mb-6 md:mb-8">
                  <h2 className="text-primary font-season font-med heading-large text-left">
                    Tell us a bit about what you’re looking for
                  </h2>

                  <p className="paragraph-secondary font-dm mt-2 text-primary text-left font-regular">
                    Share your journey with us. Whether you have questions or just
                    want to connect, we'd love to hear from you.
                  </p>
                </div>

                {/* Form */}
                <form
                  className="space-y-4 md:space-y-6 flex-1 flex flex-col justify-between"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="space-y-4 md:space-y-6">

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full px-5 py-3 rounded-xl bg-white border-2 border-greenbase placeholder-[#71AC61] focus:border-greenbase focus:bg-[#71AC611A] shadow-sm text-greenbase font-dm"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="E-mail"
                      className="w-full px-5 py-3 rounded-xl bg-white border-2 border-greenbase placeholder-[#71AC61] focus:border-greenbase focus:bg-[#71AC611A] shadow-sm text-greenbase font-dm"
                    />

                    <input
                      type="text"
                      name="text"
                      value={formData.text}
                      onChange={handleChange}
                      placeholder="Organisation (Optional)"
                      className="w-full px-5 py-3 rounded-xl bg-white border-2 border-greenbase placeholder-[#71AC61] focus:border-greenbase focus:bg-[#71AC611A] shadow-sm text-greenbase font-dm"
                    />

                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-white border-2 border-greenbase focus:border-greenbase focus:bg-[#71AC611A] text-greenbase font-dm"
                    >
                      <option value="">Inquiry type</option>
                      <option value="general">General Inquiry</option>
                      <option value="classes">About Classes</option>
                      <option value="retreat">Retreat Programs</option>
                      <option value="corporate">Corporate Wellness</option>
                      <option value="partnership">Partnership</option>
                    </select>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about your meditation experience or questions..."
                      className="w-full px-5 py-3 rounded-xl bg-white border-2 border-greenbase placeholder-[#71AC61] focus:border-greenbase focus:bg-[#71AC611A] shadow-sm text-greenbase font-dm"
                    ></textarea>
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    className="max-w-40 bg-greenbase-primary text-white py-3 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 font-dm"
                  >
                    Send Message
                    {/* <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg> */}
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
