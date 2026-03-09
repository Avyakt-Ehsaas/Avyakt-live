import { motion } from "framer-motion";
import Founder from '../assets/images/Founder.png';

const AboutFounder = () => {
  return (
    <section className="relative mt-16 px-4 md:px-16 ">

      {/*  Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-48 h-48 bg-greenbase/30 rounded-full -top-10 -left-10 blur-2xl animate-pulseSlow"></div>
        <div className="absolute w-32 h-32 bg-green-200/40 rounded-full -bottom-10 -right-10 blur-2xl animate-pulseSlow"></div>
      </div>

      <motion.div
        className="max-w-6xl mx-auto my-8 py-10 md:py-12 
        relative flex flex-col md:flex-row justify-center items-center gap-4
        bg-[#C2E0BA]/10 backdrop-blur-xl rounded-3xl 
        shadow-[0_20px_60px_rgba(1,50,12,0.25)] 
        border border-green-100 overflow-hidden"
        
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >

        {/*  Image Section */}
        <div className="w-full md:w-2/5 flex justify-center md:justify-start md:items-center">
  
  <div className="group [perspective:1000px]">
    
    <div className="relative w-72 h-72 md:w-[360px] md:h-[420px] transition-transform duration-[1200ms] ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

      {/* FRONT SIDE (IMAGE) */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl 
        [backface-visibility:hidden]">
        
        <img
          src={Founder}
          alt="Sai Amrit Patnaik"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* BACK SIDE (INFO) */}
      <div className="absolute inset-0 rounded-2xl 
        bg-gradient-to-br from-[#71AC61]/40 to-green-300 text-gray-900 font-dm
        flex flex-col justify-center items-center text-center p-6
        shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">

        <h3 className="text-2xl font-bold mb-2">
          Sai Amrit Patnaik
        </h3>

        <p className="text-sm opacity-90 mb-3">
          AI Researcher & Spiritual Guide
        </p>

        <p className="text-sm leading-relaxed">
          Blending science with spirituality to guide people toward 
          peace, clarity, and purpose.
        </p>

      </div>

    </div>
  </div>
</div>

        {/*  Text Section */}
        <div className="w-full md:w-3/5 p-6 md:pl-10 max-w-xl">

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 
            bg-gradient-to-r from-[#71AC61] to-green-400 bg-clip-text text-transparent">
            About the Founder
          </h2>

          {/* Paragraph 1 */}
          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-4">
            <span className="font-bold text-gray-900">
              Sai Amrit Patnaik
            </span>{" "}
            holds a master’s degree in AI and computer science from IIIT Hyderabad. 
            He has contributed to pioneering projects at Mercedes Research, Tech5 India, 
            and national initiatives including DRDO and UIDAI.
          </p>

          {/* Paragraph 2 */}
          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
            Life challenges inspired him to explore{" "}
            
            <span className="font-semibold bg-gradient-to-r from-green-400 to-[#71AC61] bg-clip-text text-transparent">
              Rajyoga meditation
            </span>{" "}
            
            and spirituality. Through regular practice, he transformed into a person 
            grounded in{" "}
            
            <span className="font-semibold text-green-600">peace</span>,{" "}
            <span className="font-semibold text-green-500">clarity</span>, and{" "}
            <span className="font-semibold text-greenbase">service</span>. 
            
            His mission is to merge scientific insight with spiritual wisdom 
            to help others experience calm and purpose.
          </p>

        </div>
      </motion.div>

    </section>
  );
};

export default AboutFounder;