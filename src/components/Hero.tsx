'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background elements */}
      <div 
        className="parallax-bg absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="solar-flare" style={{ top: '30%', left: '70%' }} />
      </div>

      {/* Main hero content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="relative z-10 text-center px-8"
      >
        {/* Solar halo behind wordmark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 bg-gradient-radial from-solar-glow/20 to-transparent rounded-full blur-3xl" />
        </div>

        {/* AURELION wordmark */}
        <motion.h1
          className="relative text-7xl md:text-9xl font-serif text-soft-white tracking-wider glow-gold"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          AURELION
        </motion.h1>

        {/* Taglines */}
        <motion.div
          className="mt-16 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          <p className="text-lg text-matte-gold tracking-widest">
            AURELION observes.
          </p>
          <p className="text-sm text-soft-white/70 tracking-wide">
            Continue your work.
          </p>
        </motion.div>

        {/* Subtle scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="w-0.5 h-16 bg-matte-gold/30" />
          <div className="w-1 h-1 bg-matte-gold rounded-full mx-auto -mt-1" />
        </motion.div>
      </motion.div>

      {/* Foreground parallax layer */}
      <div 
        className="parallax-foreground absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
    </section>
  )
}
