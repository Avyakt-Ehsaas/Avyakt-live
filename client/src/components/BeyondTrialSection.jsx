import React from "react";
import { motion } from "framer-motion";

const beyondTrialPoints = [
  {
    title: "Emotional Regulation",
    description: "Deepen your ability to manage stress, cultivate resilience, and stay centered."
  },
  {
    title: "Mindful Relationships",
    description: "Enhance empathy, communication, and connection with others."
  },
  {
    title: "Creativity & Focus",
    description: "Explore advanced mindfulness techniques to boost creativity and focus."
  },
  {
    title: "Contemplation Practices",
    description: "Integrate reflective and contemplative exercises for self-awareness."
  },
  {
    title: "Purposeful Living",
    description: "Set meaningful goals and align your daily actions with personal values."
  },
  {
    title: "Daily Meditations & Exercises",
    description: "Continue daily meditation sessions along with gratitude, affirmations, and journaling."
  }
];

const BeyondTrialSection = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* subtle background tech particles */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          style={{
            backgroundImage:
              "radial-gradient(#fb923c30 1px, transparent 1px), radial-gradient(#fcd34d20 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }}
          className="w-full h-full"
        ></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-inter md:text-5xl font-bold mb-4 text-gray-900">
          What to Expect <span className="text-greenbase">Beyond the Trial</span>
        </h2>
        <p className="text-gray-700 font-dm leading-[28px] mb-8 max-w-3xl mx-auto">
          After the initial 21 days, the subscription continues with more in-depth exploration of emotional regulation, relationships, creativity, advanced mindfulness techniques, contemplation practices and purposeful living. Participants will practice daily meditations alongside exercises in gratitude, affirmations, and journaling, ensuring a comprehensive transformation of mind and soul.
        </p>

        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8">
          {beyondTrialPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-[#C2E0BA] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_70px_-20px_rgba(0,112,10,0.5)] hover:-translate-y-2 transition-all duration-500 w-full md:w-1/3 text-center"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[#71AC61]/30 via-transparent to-[#C2E0BA]/40 opacity-40 pointer-events-none rounded-3xl"></div>

              <h3 className="text-xl font-bold text-greenbase mb-2">{point.title}</h3>
              <p className="text-gray-700">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeyondTrialSection;
