'use client'

import { motion } from 'framer-motion'

export default function EntryExperience() {
  return (
    <div className="fixed inset-0 bg-deep-black z-50 flex items-center justify-center">
      {/* Star field background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Solar glow */}
      <div className="solar-flare" style={{ top: '20%', left: '60%' }} />
      
      {/* AURELION text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-serif text-soft-white tracking-wider glow-gold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          AURELION
        </motion.h1>
        
        <motion.p
          className="mt-8 text-sm text-matte-gold tracking-widest opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          Observed.
        </motion.p>
      </motion.div>
    </div>
  )
}
