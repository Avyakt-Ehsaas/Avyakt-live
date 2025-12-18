import React from "react"
import {
  FaBrain,
  FaMoon,
  FaBolt,
  FaHeart,
  FaCheckCircle,
  FaVideo,
  FaUserAstronaut
} from "react-icons/fa"

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription
} from "../../components/ui/Card"

const programs = [
  {
    title: "Daily Live Meditation",
    desc: "Daily guided meditation sessions conducted live on Zoom by Avyakt mentors.",
    icon: <FaVideo />,
  },
  {
    title: "1:1 Personal Guidance",
    desc: "Private mentorship and personalized meditation programs.",
    icon: <FaUserAstronaut />,
  },
  {
    title: "Neuroscience Healing",
    desc: "Brain, breath & nervous-system based scientifically guided practices.",
    icon: <FaBrain />,
  },
  {
    title: "Sleep & Anxiety Care",
    desc: "Deep relaxation practices to heal stress, anxiety and insomnia.",
    icon: <FaMoon />,
  },
  {
    title: "Energy Alignment",
    desc: "Balance inner energy centers for clarity, calm and stability.",
    icon: <FaBolt />,
  },
  {
    title: "Self Awakening",
    desc: "Reconnect with higher awareness and conscious living.",
    icon: <FaHeart />,
  }
]

const benefits = [
  "Enhances Focus & Memory",
  "Reduces Anxiety & Stress",
  "Improves Emotional Intelligence",
  "Balances Mind, Body & Nervous System",
  "Science-backed Meditation Practices",
  "Live Sessions with Personal Support"
]

const ProgramsAndBenefits = () => {
  return (
    <section className="bg-[#fdfcfb] py-24">

      {/* ================= PROGRAMS ================= */}
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-4 tracking-tight text-gray-900">
          Our <span className="text-orange-500">Programs</span>
        </h2>

        <p className="text-center text-lg max-w-2xl mx-auto mb-16 text-gray-600">
          Conscious meditation programs blending neuroscience and inner wisdom.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {programs.map((item, index) => (
            <Card
              key={index}
              className="group relative bg-white/70 backdrop-blur-xl
                         border border-gray-200/60
                         rounded-3xl
                         transition-all duration-500
                         hover:-translate-y-2
                         hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.15)]"
            >
              {/* Soft Glow */}
              <div className="absolute inset-0 rounded-3xl
                              bg-orange-400/10 opacity-0
                              group-hover:opacity-100 blur-2xl transition -z-10" />

              <CardHeader
                title={item.title}
                subtitle="Avyakt Signature Program"
              />

              <CardContent>
                <div className="text-3xl text-orange-500 mb-4">
                  {item.icon}
                </div>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {item.desc}
                </CardDescription>
              </CardContent>

              <CardFooter>
                <span className="text-sm font-medium text-orange-500 cursor-pointer tracking-wide">
                  Explore →
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* ================= BENEFITS ================= */}
      <div className="max-w-6xl mx-auto px-6 mt-28">

        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-4 tracking-tight text-gray-900">
          Why <span className="text-orange-500">Avyakt Ehsaas?</span>
        </h2>

        <p className="text-center text-lg max-w-2xl mx-auto mb-16 text-gray-600">
          A modern approach to healing that aligns mind, brain and awareness.
        </p>

        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Benefits List */}
          <div className="space-y-5">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4
                           bg-white/70 backdrop-blur-xl
                           border border-gray-200/50
                           p-5 rounded-2xl
                           transition hover:shadow-md"
              >
                <FaCheckCircle className="text-orange-500 text-xl shrink-0" />
                <span className="font-medium text-gray-700">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Card */}
          <Card className="relative text-center overflow-hidden
                           bg-white/80 backdrop-blur-xl
                           border border-gray-200/60
                           rounded-3xl">

            {/* Glow */}
            <div className="absolute -top-16 -right-16 w-52 h-52
                            bg-orange-400/20 rounded-full blur-3xl" />

            <CardHeader
              title="Begin Your Inner Journey"
              subtitle="Awaken clarity, calm & consciousness"
            />

            <CardContent>
              <CardDescription className="text-gray-600 leading-relaxed">
                Join Avyakt Ehsaas and experience deep transformation through
                daily live sessions and personal guidance.
              </CardDescription>
            </CardContent>

            <CardFooter className="flex justify-center">
              <button className="px-10 py-3 rounded-full font-semibold
                                 bg-orange-500 text-white
                                 shadow-lg shadow-orange-300/40
                                 hover:scale-105 transition">
                Join Now
              </button>
            </CardFooter>
          </Card>

        </div>
      </div>

    </section>
  )
}

export default ProgramsAndBenefits
