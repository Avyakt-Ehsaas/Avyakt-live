import React, { useEffect, useState } from "react";
import { BiFontFamily } from "react-icons/bi";

const AvyaktModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 17000); // 8000 ms = 8 seconds

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-[0.2px]">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-[#71AC61] transition-transform duration-300 hover:rotate-180 text-xl font-bold"
        >
          ×
        </button>

        <h3 className="flex justify-center items-center text-greenbase text-[14px] mb-0" style={{ fontFamily: "DM Sans, sans-serif" }}>
          Join the 21–Day Live Meditation Journey
        </h3>
        <h2 className="text-2xl mb-6 font-[500] text-center font-rubik">
          Start your <span className="text-greenbase">Avyakt</span> Journey
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none"
          />
          <div className="flex gap-3">
            <select className="bg-white border border-gray-300 px-3 py-3 rounded-md focus:outline-none w-24">
              <option value="+91">🇮🇳 +91</option>
              
            </select>
            <input
              type="tel"
              placeholder="Phone Number"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-greenbasebg hover:bg-green-500 text-white py-3 rounded-full font-medium"
          >
            Register Now
          </button>
        </form>

        {/* Avatar + Trust */}
        <div className="mt-6 flex justify-center items-center">
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src={`https://randomuser.me/api/portraits/${i % 2 ? "women" : "men"}/${i}.jpg`}
              alt={`user${i}`}
              className="w-8 h-8 rounded-full border-2 border-white"
              style={{ marginLeft: i > 0 ? '-5px' : '0' }}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Trusted by 5,000+ users on their wellness journey
        </p>
      </div>
    </div>
  );
};

export default AvyaktModal;