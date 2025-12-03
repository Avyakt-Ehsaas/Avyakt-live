// client/src/components/ui/Switch.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Switch = ({ checked, onChange, disabled = false, className = '' }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500/50 ${
        checked ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gray-600'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      <motion.span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-0.5'
        }`}
        initial={false}
        animate={{
          x: checked ? 22 : 2,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20
          }
        }}
      />
    </button>
  );
};

export default Switch;