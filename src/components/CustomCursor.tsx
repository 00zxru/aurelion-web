'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor || !trail) return

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
      
      trail.style.left = `${e.clientX}px`
      trail.style.top = `${e.clientY}px`
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a, button')) {
        setHovering(true)
        cursor.classList.add('hover')
      } else {
        setHovering(false)
        cursor.classList.remove('hover')
      }
    }

    const handleMouseOut = () => {
      setHovering(false)
      cursor.classList.remove('hover')
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor-dot"
        style={{
          transform: `translate(-50%, -50%) scale(${hovering ? 2 : 1})`,
        }}
      />
      <div
        ref={trailRef}
        className="cursor-trail"
        style={{
          transform: `translate(-50%, -50%) scale(${hovering ? 1.5 : 1})`,
          opacity: hovering ? 0.8 : 0.3,
        }}
      />
    </>
  )
}
