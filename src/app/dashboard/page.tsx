'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />
      case 'profile':
        return <ProfileBuilder />
      case 'work':
        return <WorkManagement />
      case 'media':
        return <MediaLibrary />
      case 'settings':
        return <Settings />
      default:
        return <Overview />
    }
  }

  return (
    <div className="min-h-screen bg-deep-black flex">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-deep-black/50 border-r border-matte-gold/10 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-serif text-soft-white glow-gold">
            Archive
          </h2>
          <p className="text-matte-gold/50 text-sm mt-2">
            Recognition confirmed.
          </p>
        </div>

        <ul className="space-y-2">
          {[
            { id: 'overview', name: 'Overview' },
            { id: 'profile', name: 'Profile' },
            { id: 'work', name: 'Work' },
            { id: 'media', name: 'Media' },
            { id: 'settings', name: 'Settings' }
          ].map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-2 rounded transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-matte-gold bg-matte-gold/10'
                    : 'text-soft-white/50 hover:text-soft-white hover:bg-matte-gold/5'
                }`}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {/* Status Bar */}
        <div className="mb-8 pb-4 border-b border-matte-gold/10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-serif text-soft-white capitalize">
              {activeTab}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-matte-gold/50 text-sm">
                Status: Observed
              </span>
              <div className="w-2 h-2 bg-matte-gold rounded-full" />
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  )
}

function Overview() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-matte-gold/20">
          <h3 className="text-xl font-serif text-soft-white mb-2">Works</h3>
          <p className="text-3xl text-matte-gold">12</p>
          <p className="text-soft-white/50 text-sm mt-2">Recorded</p>
        </div>
        <div className="p-6 border border-matte-gold/20">
          <h3 className="text-xl font-serif text-soft-white mb-2">Recognition</h3>
          <p className="text-3xl text-matte-gold">Active</p>
          <p className="text-soft-white/50 text-sm mt-2">House SOLIS</p>
        </div>
        <div className="p-6 border border-matte-gold/20">
          <h3 className="text-xl font-serif text-soft-white mb-2">Status</h3>
          <p className="text-3xl text-matte-gold">Observed</p>
          <p className="text-soft-white/50 text-sm mt-2">Last: Today</p>
        </div>
      </div>

      <div className="p-6 border border-matte-gold/20">
        <h3 className="text-xl font-serif text-soft-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <span className="text-soft-white/70">Work updated</span>
            <span className="text-matte-gold/50 text-sm">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-soft-white/70">Profile reviewed</span>
            <span className="text-matte-gold/50 text-sm">1 day ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-soft-white/70">Recognition confirmed</span>
            <span className="text-matte-gold/50 text-sm">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileBuilder() {
  return (
    <div className="space-y-8">
      <div className="p-6 border border-matte-gold/20">
        <h3 className="text-xl font-serif text-soft-white mb-6">Identity</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-matte-gold/70 text-sm mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-deep-black/50 border border-matte-gold/20 text-soft-white"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-matte-gold/70 text-sm mb-2">House</label>
            <select className="w-full px-4 py-2 bg-deep-black/50 border border-matte-gold/20 text-soft-white">
              <option>HOUSE SOLIS</option>
              <option>HOUSE HELIOS</option>
              <option>HOUSE APOLLO</option>
              <option>HOUSE VULCAN</option>
              <option>HOUSE NOCTIS</option>
            </select>
          </div>
          <div>
            <label className="block text-matte-gold/70 text-sm mb-2">Descriptor</label>
            <textarea
              className="w-full px-4 py-2 bg-deep-black/50 border border-matte-gold/20 text-soft-white"
              rows={3}
              placeholder="Brief description"
            />
          </div>
        </div>
      </div>

      <div className="p-6 border border-matte-gold/20">
        <h3 className="text-xl font-serif text-soft-white mb-6">Social & Contact</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-matte-gold/70 text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-deep-black/50 border border-matte-gold/20 text-soft-white"
              placeholder="contact@example.com"
            />
          </div>
          <div>
            <label className="block text-matte-gold/70 text-sm mb-2">Website</label>
            <input
              type="url"
              className="w-full px-4 py-2 bg-deep-black/50 border border-matte-gold/20 text-soft-white"
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-matte-gold/20 border border-matte-gold/40 text-soft-white hover:bg-matte-gold/30 transition-all duration-300">
          Save Profile
        </button>
      </div>
    </div>
  )
}

function WorkManagement() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-serif text-soft-white">Works</h3>
        <button className="px-4 py-2 bg-matte-gold/20 border border-matte-gold/40 text-soft-white hover:bg-matte-gold/30 transition-all duration-300">
          Add Work
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 border border-matte-gold/20">
            <div className="aspect-[4/3] bg-deep-black/50 mb-4 flex items-center justify-center">
              <div className="text-soft-white/30">
                <div className="text-4xl mb-2">{'\u25c6'}</div>
                <p className="text-sm">Work {i}</p>
              </div>
            </div>
            <h4 className="text-soft-white mb-2">Work Title {i}</h4>
            <p className="text-matte-gold/50 text-sm">Category · Year</p>
            <div className="mt-4 flex space-x-2">
              <button className="text-matte-gold/50 hover:text-matte-gold text-sm">Edit</button>
              <span className="text-matte-gold/20">·</span>
              <button className="text-matte-gold/50 hover:text-matte-gold text-sm">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MediaLibrary() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-serif text-soft-white">Media Library</h3>
        <button className="px-4 py-2 bg-matte-gold/20 border border-matte-gold/40 text-soft-white hover:bg-matte-gold/30 transition-all duration-300">
          Upload
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} className="aspect-square bg-deep-black/50 border border-matte-gold/10 flex items-center justify-center cursor-pointer hover:border-matte-gold/30 transition-all duration-300">
            <div className="text-soft-white/20 text-center">
              <div className="text-2xl mb-1">{'\u25c6'}</div>
              <p className="text-xs">Asset {i}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Settings() {
  return (
    <div className="space-y-8">
      <div className="p-6 border border-matte-gold/20">
        <h3 className="text-xl font-serif text-soft-white mb-6">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-soft-white/70">Public Profile</span>
            <button className="w-12 h-6 bg-matte-gold/20 border border-matte-gold/40 rounded-full relative">
              <div className="w-4 h-4 bg-matte-gold rounded-full absolute top-1 left-1" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-soft-white/70">Email Notifications</span>
            <button className="w-12 h-6 bg-deep-black/50 border border-matte-gold/20 rounded-full relative">
              <div className="w-4 h-4 bg-soft-white/30 rounded-full absolute top-1 right-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 border border-matte-gold/20">
        <h3 className="text-xl font-serif text-soft-white mb-6">Account</h3>
        <div className="space-y-4">
          <button className="text-matte-gold/50 hover:text-matte-gold text-sm">Change Password</button>
          <div className="pt-4 border-t border-matte-gold/10">
            <button className="text-red-400/50 hover:text-red-400 text-sm">Remove Recognition</button>
          </div>
        </div>
      </div>
    </div>
  )
}
