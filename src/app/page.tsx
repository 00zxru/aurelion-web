'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import EntryExperience from '@/components/EntryExperience'
import StarField from '@/components/StarField'
import CustomCursor from '@/components/CustomCursor'
import Houses from '@/components/Houses'

export default function Home() {
  const [showEntry, setShowEntry] = useState(true)
  const [showMain, setShowMain] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEntry(false)
      setTimeout(() => setShowMain(true), 500)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-deep-black overflow-hidden">
      {/* Entry Experience */}
      {showEntry && <EntryExperience />}
      
      {/* Main Content */}
      {showMain && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative"
        >
          {/* Background Elements */}
          <StarField />
          <CustomCursor />
          
          {/* Header */}
          <Header />
          
          {/* Hero Section */}
          <Hero />
          
          {/* Houses Section */}
          <Houses />
        </motion.div>
      )}
    </div>
  )
}
