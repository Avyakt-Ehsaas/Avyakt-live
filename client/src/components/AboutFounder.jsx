import { motion } from "framer-motion";

const AboutFounder = () => {
  return (
    <section className="relative mt-12  px-4 md:px-16">
      {/* Floating particles / abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-48 h-48 bg-purple-200/30 rounded-full -top-10 -left-10 animate-pulseSlow"></div>
        <div className="absolute w-32 h-32 bg-pink-200/30 rounded-full -bottom-10 -right-10 animate-pulseSlow"></div>
      </div>

      <motion.div
        className="my-8 py-5 md:my-12 relative flex flex-col md:flex-row items-center md:items-start bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Image Section */}
        <div className="w-full md:w-2/5 flex justify-center md:justify-start -mt-16 md:-mt-0">
          <div className="w-72 h-72 md:w-full md:h-full rounded-xl overflow-hidden shadow-2xl border-4 border-white/30 transform md:-translate-x-8">
            <img
              src="/founder-photo.jpg" // replace with your image
              alt="Sai Amrit Patnaik"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-3/5 p-8 md:pl-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
            About the Founder
          </h2>
          <p className="text-gray-800 text-lg sm:text-xl leading-relaxed mb-4">
            <span className="font-bold text-gray-900">Sai Amrit Patnaik</span> holds a master’s degree in AI and computer science from IIIT Hyderabad. He has contributed to pioneering projects at Mercedes Research, Tech5 India, and national initiatives including DRDO and UIDAI.
          </p>
          <p className="text-gray-800 text-lg sm:text-xl leading-relaxed">
            Life challenges inspired him to explore <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Rajyoga meditation</span> and spirituality. Through regular practice, he transformed from someone constantly chasing external goals into a person grounded in <span className="font-semibold text-purple-600">peace</span>, <span className="font-semibold text-pink-500">clarity</span>, and <span className="font-semibold text-green-600">service</span>. His mission is to merge scientific insight with spiritual wisdom to help others experience calm and purpose.
          </p>
        </div>
      </motion.div>

    </section>
  );
};

export default AboutFounder;
