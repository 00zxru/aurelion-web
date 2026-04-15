'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Work } from '@/types/houses'

interface WorkGalleryProps {
  works: Work[]
}

export default function WorkGallery({ works }: WorkGalleryProps) {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openWork = (work: Work, index: number) => {
    setSelectedWork(work)
    setCurrentIndex(index)
  }

  const closeWork = () => {
    setSelectedWork(null)
  }

  const navigateWork = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + works.length) % works.length
      : (currentIndex + 1) % works.length
    setCurrentIndex(newIndex)
    setSelectedWork(works[newIndex])
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {works.map((work, index) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
            onClick={() => openWork(work, index)}
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-matte-gold/20 hover:border-matte-gold/40 transition-all duration-500">
              {/* Image placeholder */}
              <div className="w-full h-full bg-deep-black/50 flex items-center justify-center">
                <div className="text-soft-white/30 text-center">
                  <div className="text-6xl mb-4">{'\u25c6'}</div>
                  <p className="text-sm">{work.title}</p>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-matte-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-soft-white text-lg tracking-wide">
                  {work.title}
                </p>
              </div>

              {/* Work index */}
              <div className="absolute top-4 right-4 text-matte-gold/50 text-sm">
                {String(index + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-deep-black/95 backdrop-blur-solar z-50 flex items-center justify-center p-8"
            onClick={closeWork}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeWork}
                className="absolute top-4 right-4 text-soft-white/50 hover:text-matte-gold transition-colors z-10"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Main work display */}
              <div className="relative aspect-[16/10] border border-matte-gold/30 glow-solar mb-8">
                <div className="w-full h-full bg-deep-black/50 flex items-center justify-center">
                  <div className="text-soft-white/30 text-center">
                    <div className="text-8xl mb-6">{'\u25c6'}</div>
                    <p className="text-xl">{selectedWork.title}</p>
                    <p className="text-matte-gold/50 mt-2">{selectedWork.type}</p>
                  </div>
                </div>
              </div>

              {/* Work details */}
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-serif text-soft-white">
                  {selectedWork.title}
                </h3>
                <p className="text-matte-gold/70">
                  {selectedWork.category} {selectedWork.year && `· ${selectedWork.year}`}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={() => navigateWork('prev')}
                  className="text-soft-white/50 hover:text-matte-gold transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <div className="text-matte-gold/50 text-sm">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
                </div>

                <button
                  onClick={() => navigateWork('next')}
                  className="text-soft-white/50 hover:text-matte-gold transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
