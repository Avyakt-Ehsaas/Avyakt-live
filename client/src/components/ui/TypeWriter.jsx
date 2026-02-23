import { useState, useEffect } from "react";
import { motion , AnimatePresence} from "framer-motion";

export function Typewriter({ texts }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 1500); 

    return () => clearInterval(interval);
  }, [texts]);
  
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1], // premium easing
          }}
          style={{ display: "inline-block" }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
