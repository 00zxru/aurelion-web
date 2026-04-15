'use client'

import { motion } from 'framer-motion'
import { Member, House } from '@/types/houses'
import WorkGallery from './WorkGallery'

interface MemberProfileProps {
  member: Member
  house: House
}

export default function MemberProfile({ member, house }: MemberProfileProps) {
  const isRevealed = member.status === 'revealed'

  return (
    <div className="min-h-screen py-24 px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          {/* Name or UNREVEALED */}
          <h1 className="text-5xl md:text-7xl font-serif text-soft-white mb-4">
            {isRevealed ? member.name : 'UNREVEALED'}
          </h1>

          {/* House affiliation */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: house.color }}
            />
            <p className="text-matte-gold tracking-wide">
              {house.name}
            </p>
          </div>

          {/* Descriptor */}
          <p className="text-soft-white/70 text-lg tracking-wide">
            {member.descriptor}
          </p>
        </motion.div>

        {/* Profile Content */}
        {isRevealed && member.profile ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-24"
          >
            {/* Overview */}
            <section>
              <h2 className="text-3xl font-serif text-soft-white mb-8 text-center">
                Overview
              </h2>
              <div className="text-center max-w-2xl mx-auto">
                <p className="text-soft-white/70 leading-relaxed tracking-wide">
                  {member.profile.overview}
                </p>
              </div>
            </section>

            {/* Work Gallery */}
            {member.profile.work.length > 0 && (
              <section>
                <h2 className="text-3xl font-serif text-soft-white mb-16 text-center">
                  Work
                </h2>
                <WorkGallery works={member.profile.work} />
              </section>
            )}

            {/* Social Links */}
            {member.profile.socialLinks.length > 0 && (
              <section>
                <h2 className="text-3xl font-serif text-soft-white mb-8 text-center">
                  Connections
                </h2>
                <div className="flex justify-center space-x-8">
                  {member.profile.socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-soft-white/50 hover:text-matte-gold transition-colors duration-300"
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        {link.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Contact */}
            <section>
              <h2 className="text-3xl font-serif text-soft-white mb-8 text-center">
                Contact
              </h2>
              <div className="text-center space-y-4">
                {member.profile.contact.email && (
                  <p className="text-soft-white/70">
                    <span className="text-matte-gold/50">Email:</span>{' '}
                    <a 
                      href={`mailto:${member.profile.contact.email}`}
                      className="hover:text-matte-gold transition-colors"
                    >
                      {member.profile.contact.email}
                    </a>
                  </p>
                )}
                {member.profile.contact.website && (
                  <p className="text-soft-white/70">
                    <span className="text-matte-gold/50">Web:</span>{' '}
                    <a 
                      href={member.profile.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-matte-gold transition-colors"
                    >
                      {member.profile.contact.website}
                    </a>
                  </p>
                )}
                {member.profile.contact.inquiries && (
                  <p className="text-soft-white/50 text-sm mt-8">
                    {member.profile.contact.inquiries}
                  </p>
                )}
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center py-24"
          >
            <p className="text-soft-white/50 text-lg tracking-wide">
              Recognition pending.
            </p>
            <p className="text-matte-gold/30 text-sm mt-4">
              Not all are observed.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
