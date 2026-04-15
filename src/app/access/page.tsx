'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Access() {
  const [accessCode, setAccessCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Simulate access code validation
    setTimeout(() => {
      if (accessCode === 'AURELION2024') {
        setSuccess(true)
        // Redirect to dashboard after delay
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 2000)
      } else {
        setError('Recognition not confirmed.')
        setIsSubmitting(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-deep-black flex items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-soft-white mb-4 glow-gold">
            Access
          </h1>
          <p className="text-matte-gold/70 tracking-wide">
            Recognition required.
          </p>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                placeholder="Enter recognition code"
                className="w-full px-4 py-3 bg-deep-black/50 border border-matte-gold/20 focus:border-matte-gold/50 text-soft-white placeholder-soft-white/30 transition-all duration-300 text-center tracking-widest"
                disabled={isSubmitting}
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !accessCode}
              className="w-full py-3 bg-matte-gold/10 hover:bg-matte-gold/20 border border-matte-gold/30 text-soft-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Confirming...' : 'Proceed'}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-matte-gold/50 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif text-soft-white mb-4">
              Recognition confirmed.
            </h2>
            <p className="text-matte-gold/70">
              Entering archive...
            </p>
          </motion.div>
        )}

        <div className="mt-16 text-center">
          <p className="text-soft-white/30 text-sm">
            Not all are recognized.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
