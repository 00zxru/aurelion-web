'use client'

import { motion } from 'framer-motion'
import { HOUSES } from '@/types/houses'

export default function Houses() {
  return (
    <section className="relative min-h-screen py-24 px-8">
      <div className="container mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-soft-white mb-8">
            Houses
          </h2>
          <p className="text-matte-gold/70 tracking-wide">
            Not all are recognized.
          </p>
        </motion.div>

        {/* Houses grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {HOUSES.map((house, index) => (
            <motion.div
              key={house.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative p-8 border border-matte-gold/20 hover:border-matte-gold/40 transition-all duration-500 hover-lift">
                {/* House emblem placeholder */}
                <div className="w-24 h-24 mx-auto mb-8 rounded-full border-2 border-matte-gold/30 flex items-center justify-center">
                  <div 
                    className="w-16 h-16 rounded-full"
                    style={{ backgroundColor: house.color + '20' }}
                  />
                </div>

                {/* House name */}
                <h3 className="text-2xl font-serif text-soft-white text-center mb-4 group-hover:text-matte-gold transition-colors duration-300">
                  {house.name}
                </h3>

                {/* House description */}
                <p className="text-soft-white/60 text-center tracking-wide mb-6">
                  {house.description}
                </p>

                {/* Member count */}
                <div className="text-center">
                  <p className="text-matte-gold/50 text-sm">
                    {house.members.length} members
                  </p>
                </div>

                {/* Subtle glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{ 
                    background: `radial-gradient(circle at center, ${house.color}40 0%, transparent 70%)` 
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <p className="text-soft-white/50 tracking-wide">
            Each House observes in its own way.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
