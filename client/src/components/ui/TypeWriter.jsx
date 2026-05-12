import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Typewriter({ texts }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= texts.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [texts]);

  const isFirst = index === 0;
  const isLast = index === texts.length - 1;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          transition={{
            duration: isFirst || isLast ? 0.5 : 0.3,
            ease: "easeOut",
          }}
          style={{ display: "inline-block" }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}