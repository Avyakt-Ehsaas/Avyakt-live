import { motion, useScroll, useTransform , useMotionTemplate} from "framer-motion"
import brainImg from '../../assets/Brain.png'

const BrainBackground = () => {
  const { scrollYProgress } = useScroll()

  // Scroll based transforms
  const x = useTransform(scrollYProgress, [0, 1], ["-50%", "-145%"])
  const y = useTransform(scrollYProgress, [0, 1], ["-40%", "-20%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1])

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 362])

    const glowStrength = useTransform(scrollYProgress, [0, 1], [0, 45])

  // Glow opacity
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Glow blur scale (smooth cinematic)
  const glowBlur = useTransform(scrollYProgress, [0, 1], [20, 80])

  const imageGlow = useMotionTemplate`
    drop-shadow(0 0 ${glowStrength}px rgba(120,180,255,0.9))
    drop-shadow(0 0 ${glowStrength * 1.6}px rgba(120,180,255,0.6))
  `

  const auraBlur = useMotionTemplate`
    blur(${glowBlur}px)
  `

return (
    <div className="brain-wrapper">
      <motion.div
        className="brain-bg"
        style={{
          x,
          y,
          scale,
          rotate,
          transformStyle: "preserve-3d",
        }}
      >
        {/* 🔮 Aura glow */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full"
          style={{
            filter: auraBlur,
            opacity: glowOpacity,
            background:
              "radial-gradient(circle, rgba(120,180,255,0.65), transparent 70%)",
          }}
        />

        {/* 🧠 BRAIN IMAGE */}
        <motion.img
          src={brainImg}
          alt="Brain Background"
          style={{
            backfaceVisibility: "hidden",
            filter: imageGlow,
          }}
        />
      </motion.div>
    </div>
  )
}

export default BrainBackground