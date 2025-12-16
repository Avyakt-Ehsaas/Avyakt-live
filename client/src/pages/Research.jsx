import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandingSidebar from "./LandingPage/LandingSidebar/LandingSidebar";
import Footer from "./LandingPage/Footer";

gsap.registerPlugin(ScrollTrigger);

const researchSections = [
  {
    title: "Neuroplasticity & Brain Health",
    stat: "+22% Focus",
    content:
      "Neuroscience research confirms that consistent meditation practice enhances neuroplasticity by increasing gray matter density in regions responsible for learning, memory, and emotional regulation."
  },
  {
    title: "Stress Reduction & Cortisol Control",
    stat: "↓ 30% Stress",
    content:
      "Meditation lowers cortisol levels, shifting the nervous system from fight-or-flight into a calm parasympathetic state, resulting in improved mental balance and resilience."
  },
  {
    title: "Cognitive Performance & Attention",
    stat: "+19% Cognition",
    content:
      "Research from Harvard, Stanford, and MIT shows meditation improves sustained attention, working memory, clarity of thought, and decision-making accuracy."
  },
  {
    title: "Emotional Intelligence & Resilience",
    stat: "Higher EQ",
    content:
      "Meditation strengthens the prefrontal cortex and reduces amygdala reactivity, leading to better emotional control, empathy, and psychological resilience."
  }
];

const stats = [
  { label: "Reduced Anxiety", value: "35%" },
  { label: "Better Focus", value: "2x" },
  { label: "Sleep Improvement", value: "40%" },
  { label: "Productivity Gain", value: "25%" }
];

const Research = () => {
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(heroRef.current, { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" });

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 70, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" }
        }
      );
    });

    statsRef.current.forEach((stat, i) => {
      gsap.fromTo(stat, { opacity: 0, y: 40 }, { opacity: 1, y: 0, delay: i * 0.15, duration: 0.7, scrollTrigger: { trigger: stat, start: "top 90%" } });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-orange-50">
      <LandingSidebar />

      {/* Hero */}
      <section ref={heroRef} className="max-w-6xl mx-auto px-6 pt-32 pb-28 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          The <span className="text-orange-500">Science</span> of Meditation
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          A modern, evidence-based approach to mindfulness — trusted by neuroscientists, educators, and global organizations.
        </p>
      </section>

      {/* Impact Stats */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-28">
        {stats.map((item, i) => (
          <div
            key={i}
            ref={(el) => (statsRef.current[i] = el)}
            className="rounded-2xl bg-white border border-gray-200 shadow-md p-8 text-center"
          >
            <p className="text-4xl font-extrabold text-orange-500">{item.value}</p>
            <p className="mt-2 text-gray-600 font-medium">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Research Cards */}
      <section className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-2">
        {researchSections.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <span className="absolute -top-5 right-6 bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow">
              {item.stat}
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">{item.content}</p>
          </div>
        ))}
      </section>

      {/* Applications */}
      <section className="max-w-6xl mx-auto px-6 mt-32">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Real-World Applications</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Students", "Professionals", "Healthcare & Wellness"].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item}</h3>
              <p className="text-gray-600">Meditation enhances focus, emotional stability, stress resilience, and overall mental performance in this domain.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence */}
      <section className="max-w-5xl mx-auto px-6 mt-32 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Evidence-Based & Clinically Supported</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Backed by peer-reviewed studies from Harvard Medical School, Stanford University, and the American Psychological Association, meditation is proven to reduce anxiety, improve sleep, enhance emotional regulation, and increase long-term well-being.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-28 mb-32">
        <div className="rounded-3xl bg-white border border-gray-200 shadow-xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Experience Science-Backed Meditation</h3>
          <p className="text-gray-600 mb-8">Join schools, organizations, and individuals using research-driven meditation programs.</p>
          <Link to="/auth/register" className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white hover:bg-orange-600 transition">
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Research;