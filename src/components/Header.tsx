'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setScrolled(scrolled)
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / scrollHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-matte-gold/20 z-50">
        <div 
          className="h-full bg-matte-gold transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled 
            ? 'bg-deep-black/80 backdrop-blur-solar border-b border-matte-gold/10' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo - collapses on scroll */}
            <motion.div
              animate={{ scale: scrolled ? 0.7 : 1 }}
              transition={{ duration: 0.3 }}
              className="font-serif text-2xl text-soft-white glow-gold"
            >
              AURELION
            </motion.div>

            {/* Navigation */}
            <ul className="hidden md:flex items-center space-x-12">
              {[
                { name: 'Home', href: '/' },
                { name: 'Work', href: '/work' },
                { name: 'Houses', href: '/houses' },
                { name: 'Selection', href: '/selection' },
                { name: 'Contact', href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <motion.a
                    href={item.href}
                    className="relative text-soft-white/70 hover:text-matte-gold transition-colors duration-300 tracking-wide"
                    whileHover={{ y: -2 }}
                    onHoverStart={(e) => {
                      e.currentTarget.classList.add('glow-gold')
                    }}
                    onHoverEnd={(e) => {
                      e.currentTarget.classList.remove('glow-gold')
                    }}
                  >
                    {item.name}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-matte-gold origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* Mobile menu button */}
            <button className="md:hidden text-soft-white/70 hover:text-matte-gold transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>
    </>
  )
}
