import React, { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import brainImg from "../../assets/Brain.png"

const commands = [
  "Initializing Mindful Journey...",
  "Connecting to Consciousness Network...",
  "Calibrating Emotional Awareness...",
  "Aligning Daily Intentions...",
  "Syncing Breath & Mind...",
  "Preparing Meditation Environment...",
  "Welcome to Avyakt Ehsaas"
]

const PARTICLE_COUNT = 60
const TOWARD_BRAIN_COUNT = 40
const MAX_VISIBLE_COMMANDS = 3

const TextLoader = () => {
  const [commandQueue, setCommandQueue] = useState([])
  const executedCommands = useMemo(() => new Set(), [])

  // Add commands one by one
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index >= commands.length) {
        clearInterval(interval)
        return
      }

      const cmd = commands[index]
      if (!executedCommands.has(cmd)) {
        setCommandQueue((prev) => {
          const newQueue = [...prev, { id: Date.now() + Math.random(), text: cmd }]
          // Sliding window: max 3 commands
          if (newQueue.length > MAX_VISIBLE_COMMANDS) newQueue.shift()
          return newQueue
        })
        executedCommands.add(cmd)
      }
      index++
    }, 1200)

    return () => clearInterval(interval)
  }, [executedCommands])

  // Floating background particles
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 3,
      })),
    []
  )

  // Particles moving toward brain
  const towardBrain = useMemo(
    () =>
      Array.from({ length: TOWARD_BRAIN_COUNT }).map(() => ({
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 2,
      })),
    []
  )

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0f1a] flex items-center justify-center overflow-hidden">
      
      {/* 🌌 Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white opacity-20"
          style={{ width: p.size, height: p.size, top: `${p.y}%`, left: `${p.x}%` }}
          animate={{ y: ["0%", "-20%", "0%"], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

     <motion.img
  src={brainImg}
  alt="Brain"
  className="relative z-10 w-72"
  initial={{ scale: 0 }} // mount animation
  animate={{
    scale: [1, 1.07, 1], // pulse after mount
  }}
  transition={{
    duration: 4,          // slow heartbeat
    ease: "easeInOut",
    repeat: Infinity,
    delay: 1,             // delay so mount animation completes first
  }}
/>


      {/* ✨ Particles moving toward brain */}
      {towardBrain.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400 opacity-40"
          style={{ width: p.size, height: p.size, top: `${p.startY}%`, left: `${p.startX}%` }}
          animate={{ top: "50%", left: "50%", opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 5 + Math.random() * 2,
            delay: p.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeIn",
          }}
        />
      ))}

      {/* 💻 Terminal commands */}
  <div className="absolute bottom-28 left-10 flex flex-col items-start gap-2 font-mono text-xl md:text-2xl text-white drop-shadow-md z-20">
  <AnimatePresence>
    {commandQueue.map((cmd) => (
      <motion.div
        key={cmd.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative pl-8" // space for pseudo
      >
        {/* pseudo arrow */}
        <span className="absolute left-0 text-[#60a5fa]">&gt;_</span>
        {cmd.text}
      </motion.div>
    ))}
  </AnimatePresence>
</div>


    </div>
  )
}

export default TextLoader
