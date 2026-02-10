import React,{useState} from "react";
import {
  Sparkles,
  Leaf,
  Brain,
  ShieldCheck,
  HeartHandshake,
  MessageCircle,
  Moon,
  ChevronDown,
  Wind,
  HelpCircle
} from "lucide-react";
import Footer from "../LandingPage/Footer";
import LandingSidebar from "../LandingPage/LandingSidebar/LandingSidebar";

export default function SpiritualGenAI() {
    const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <LandingSidebar isDarkBg={false} />

      <main className="pt-12 bg-white text-gray-800">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#71AC61]/10 text-[#71AC61] text-sm font-medium">
                <Sparkles className="w-4 h-4" /> Spiritual GenAI
              </span>

              <h1 className="mt-6 text-4xl md:text-5xl font-semibold leading-tight">
                AI that understands <br />
                your <span className="text-[#71AC61]">inner journey</span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 max-w-xl">
                Spiritual GenAI by Avyakt-Ehsaas blends ancient wisdom with modern
                artificial intelligence to guide you toward clarity, balance,
                and deeper self-awareness.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="px-6 py-3 rounded-xl bg-[#71AC61] text-white font-medium shadow-lg shadow-[#71AC61]/30 hover:opacity-90 transition">
                  Explore Experience
                </button>
                <button className="px-6 py-3 rounded-xl border border-gray-300 font-medium hover:bg-gray-50 transition">
                  How it works
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#71AC61]/20 rounded-full blur-3xl" />
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border">
                <h3 className="text-xl font-semibold mb-4">What you can ask</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Personalized meditation guidance</li>
                  <li>• Emotional clarity & reflections</li>
                  <li>• Life dilemmas & spiritual questions</li>
                  <li>• Daily affirmations & inner insights</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Technology guided by{" "}
              <span className="text-[#71AC61]">consciousness</span>
            </h2>

            <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
              Spiritual GenAI is not about instant answers. It is about slowing
              down the mind, listening deeply, and reconnecting with the wisdom
              already within you.
            </p>

            <div className="mt-16 grid md:grid-cols-3 gap-10">
              <div className="bg-white p-8 rounded-2xl shadow-sm border">
                <Leaf className="w-10 h-10 text-[#71AC61] mx-auto" />
                <h4 className="mt-4 text-xl font-semibold">Rooted in Wisdom</h4>
                <p className="mt-3 text-gray-600">
                  Inspired by meditation, mindfulness, and ancient spiritual
                  practices.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border">
                <Brain className="w-10 h-10 text-[#71AC61] mx-auto" />
                <h4 className="mt-4 text-xl font-semibold">Aware AI</h4>
                <p className="mt-3 text-gray-600">
                  Designed to respond gently and contextually — never
                  mechanically.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border">
                <HeartHandshake className="w-10 h-10 text-[#71AC61] mx-auto" />
                <h4 className="mt-4 text-xl font-semibold">Human-First</h4>
                <p className="mt-3 text-gray-600">
                  Built to support emotional wellbeing, not replace intuition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-center">
              How Spiritual GenAI works
            </h2>

            <div className="mt-16 grid md:grid-cols-4 gap-8">
              {[
                { title: "Sense", desc: "Understands your emotional state" },
                { title: "Interpret", desc: "Maps feelings with mindful models" },
                { title: "Guide", desc: "Offers calm & conscious guidance" },
                { title: "Reflect", desc: "Helps you observe & grow" },
              ].map((step, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border text-center hover:shadow-md transition"
                >
                  <h4 className="text-xl font-semibold text-[#71AC61]">
                    {step.title}
                  </h4>
                  <p className="mt-3 text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHEN TO USE */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-center">
              When to use Spiritual GenAI
            </h2>

            <div className="mt-14 grid md:grid-cols-3 gap-8">
              <UseCase icon={<Moon />} text="When your mind feels restless at night" />
              <UseCase icon={<Wind />} text="During anxiety, stress, or overwhelm" />
              <UseCase icon={<MessageCircle />} text="For daily mindful conversations" />
            </div>
          </div>
        </section>

      {/* FAQ Section */}
{/* FAQ Section */}
<section className="py-20 bg-gray-50">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-semibold text-center">
      Frequently asked questions
    </h2>

    <div className="mt-12 space-y-4">
      {[
        {
          q: "Is my data private and secure?",
          a: "Yes. Your conversations are handled with strict privacy standards. We do not sell personal data or use emotional inputs for advertising. All interactions are designed to remain confidential and respectful.",
        },
        {
          q: "Is Spiritual GenAI religious?",
          a: "No. Spiritual GenAI is not tied to any religion. It draws inspiration from universal mindfulness and self-awareness practices that are accessible to everyone.",
        },
        {
          q: "Can I use Spiritual GenAI daily?",
          a: "Yes. You can use it daily for meditation, emotional check-ins, journaling, or mindful conversations. Regular use helps cultivate clarity and emotional balance.",
        },
        {
          q: "Does this replace therapy or medical care?",
          a: "No. Spiritual GenAI is a mindfulness and reflection tool. It does not replace professional therapy, mental health care, or medical treatment.",
        },
        {
          q: "Who is this designed for?",
          a: "It is designed for students, professionals, creators, and anyone seeking mental clarity, calmness, or inner growth in a safe, non-judgmental space.",
        },
      ].map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="bg-white border rounded-2xl overflow-hidden"
          >
            <button
              onClick={() =>
                setOpenIndex(isOpen ? null : index)
              }
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition"
            >
              <span className="text-lg font-medium text-gray-800">
                {item.q}
              </span>

              <ChevronDown
                className={`w-5 h-5 text-[#71AC61] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`px-6 transition-all duration-300 ease-in-out ${
                isOpen
                  ? "max-h-40 pb-6 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <p className="text-gray-600 leading-relaxed">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>


        {/* FINAL CTA */}
        <section className="py-20 bg-[#71AC61]">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Begin your conscious conversation
            </h2>
            <p className="mt-6 opacity-90">
              A calm space where technology listens, not distracts.
            </p>
            <button className="mt-8 px-8 py-4 bg-white text-[#71AC61] rounded-xl font-medium shadow-xl hover:opacity-90 transition">
              Enter Spiritual GenAI
            </button>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

const UseCase = ({ icon, text }) => (
  <div className="bg-white p-8 rounded-2xl border shadow-sm text-center">
    <div className="text-[#71AC61] mx-auto mb-4">{icon}</div>
    <p className="text-gray-700">{text}</p>
  </div>
);
