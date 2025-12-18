import { useGSAP } from "@gsap/react"
import { Sparkles, Brain, Calendar, TrendingUp } from "lucide-react"
import gsap from "gsap"
import { useRef } from "react"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    id: 1,
    title: "Join Avyakt",
    desc: "Create your account and become part of a conscious community.",
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: 2,
    title: "Select Program",
    desc: "Choose from daily meditation & neuroscience based programs.",
    icon: <Brain className="w-6 h-6" />
  },
  {
    id: 3,
    title: "Attend Sessions",
    desc: "Join live guided sessions through Zoom.",
    icon: <Calendar className="w-6 h-6" />
  },
  {
    id: 4,
    title: "Track Growth",
    desc: "Monitor your emotional & mental progress dashboard.",
    icon: <TrendingUp className="w-6 h-6" />
  }
]

const HowItWorks = () => {
  const headRef = useRef()
  const paraRef = useRef()
  const cardContainerRef = useRef()

  useGSAP(() => {
    gsap.from(headRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headRef.current,
        start: "top 85%"
      }
    })

    gsap.from(paraRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: paraRef.current,
        start: "top 85%"
      }
    })

    gsap.from(cardContainerRef.current, {
      opacity: 0,
      y: 60,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardContainerRef.current,
        start: "top 80%"
      }
    })
  })

  return (
    <section className="w-full bg-[#fdfcfb] py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <h2
          ref={headRef}
          className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight"
        >
          How <span className="text-orange-500">Avyakt Ehsaas</span> Works
        </h2>

        <p
          ref={paraRef}
          className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg"
        >
          A calm, guided journey to align your mind, emotions, and consciousness
        </p>

        {/* Steps */}
        <div
          ref={cardContainerRef}
          className="grid md:grid-cols-4 gap-10"
        >
          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative bg-white/70 backdrop-blur-xl
                         border border-gray-200/60
                         rounded-3xl p-8
                         transition-all duration-500
                         hover:-translate-y-2
                         hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]"
            >
              {/* Soft Glow */}
              <div className="absolute inset-0 rounded-3xl
                              bg-orange-400/10 opacity-0
                              group-hover:opacity-100 blur-2xl transition -z-10" />

              {/* Icon */}
              <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center
                              rounded-full bg-orange-500/10 text-orange-600">
                {step.icon}
              </div>

              {/* Step Number */}
              <p className="text-sm text-gray-400 mb-1">
                Step {step.id}
              </p>

              {/* Title */}
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h4>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
