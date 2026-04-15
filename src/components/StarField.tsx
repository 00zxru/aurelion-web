'use client'

import { useEffect, useRef } from 'react'

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create stars
    const createStar = () => {
      const star = document.createElement('div')
      star.className = 'star'
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      star.style.animationDelay = `${Math.random() * 3}s`
      star.style.animationDuration = `${3 + Math.random() * 2}s`
      return star
    }

    // Add stars
    for (let i = 0; i < 100; i++) {
      container.appendChild(createStar())
    }

    // Create shooting stars
    const createShootingStar = () => {
      const shootingStar = document.createElement('div')
      shootingStar.className = 'absolute w-1 h-1 bg-matte-gold rounded-full'
      shootingStar.style.left = `${Math.random() * 100}%`
      shootingStar.style.top = `${Math.random() * 50}%`
      
      const trail = document.createElement('div')
      trail.className = 'absolute w-20 h-0.5 bg-gradient-to-r from-transparent to-matte-gold/50'
      trail.style.transform = 'rotate(-45deg)'
      trail.style.transformOrigin = 'right center'
      
      shootingStar.appendChild(trail)
      container.appendChild(shootingStar)

      // Animate shooting star
      const duration = 1000 + Math.random() * 2000
      const startX = parseFloat(shootingStar.style.left)
      const startY = parseFloat(shootingStar.style.top)
      
      shootingStar.animate([
        { transform: `translate(0, 0)`, opacity: 1 },
        { transform: `translate(200px, 200px)`, opacity: 0 }
      ], {
        duration: duration,
        easing: 'ease-out'
      }).onfinish = () => {
        shootingStar.remove()
      }
    }

    // Create shooting stars periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        createShootingStar()
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="stars fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  )
}
