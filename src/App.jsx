import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaCoffee } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import axios from 'axios'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Projects from './components/Projects'
import Publications from './components/Publications'
import Skills from './components/Skills'
import CosmicBackground from './components/CosmicBackground'
import LoadingScreen from './components/LoadingScreen'
import VisitorForm from './components/VisitorForm'
import AdminDashboard from './components/AdminDashboard'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showVisitorForm, setShowVisitorForm] = useState(true)
  const [currentVisitorEmail, setCurrentVisitorEmail] = useState(null)
  const [showAdminDashboard, setShowAdminDashboard] = useState(false)

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
  const ADMIN_EMAIL = 'chanikyachowdary86@gmail.com'

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'

    // Check if visitor email is stored from previous visit
    const storedEmail = localStorage.getItem('visitorEmail')
    if (storedEmail) {
      setCurrentVisitorEmail(storedEmail)
      setShowVisitorForm(false)
    }
  }, [])

  const handleVisitorSubmit = async (formData) => {
    try {
      // Save to backend
      const response = await axios.post(
        `${BACKEND_URL}/api/visitors/register`,
        {
          fullName: formData.fullName,
          email: formData.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.data.success) {
        // Store email and name in localStorage for this session
        localStorage.setItem('visitorEmail', formData.email)
        localStorage.setItem('visitorName', formData.fullName)
        setCurrentVisitorEmail(formData.email)

        // Close form after success animation
        setTimeout(() => {
          setShowVisitorForm(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting visitor info:', error)
      throw new Error(
        error.response?.data?.message ||
          'Failed to save your information. Please try again.'
      )
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Visitor Form Modal */}
      <VisitorForm isOpen={showVisitorForm} onSubmit={handleVisitorSubmit} />

      {/* Admin Dashboard Modal */}
      <AdminDashboard 
        isOpen={showAdminDashboard} 
        onClose={() => setShowAdminDashboard(false)}
        visitorEmail={currentVisitorEmail}
      />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen bg-cosmic-dark text-white overflow-x-hidden"
      >
        
        {/* Animated Background */}
        <CosmicBackground />

        {/* Main Content */}
        <div className="relative z-10">
        <Navbar 
          currentVisitorEmail={currentVisitorEmail}
          onVisitorsClick={() => setShowAdminDashboard(true)}
        />
        <Home />
        <Projects />
        <Publications />
        <Skills />
        
        {/* Footer */}
        <footer className="relative px-4 sm:px-6 mt-12 sm:mt-16">
          {/* Top divider with glow */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-px w-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.6) 30%, rgba(6,182,212,0.6) 70%, transparent 100%)',
              boxShadow: '0 0 20px rgba(139,92,246,0.3)',
            }}
          />

          <div className="max-w-7xl mx-auto py-12 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-10"
            >
              {/* Name & tagline */}
              <div className="text-center space-y-2">
                <motion.p
                  className="text-2xl sm:text-3xl font-black tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #22d3ee 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Chanikya Chowdary Samineni
                </motion.p>
                <p className="text-gray-500 text-sm sm:text-base font-medium">
                  Full Stack Developer | React Engineer | Open Source Enthusiast
                </p>
              </div>

              {/* Tech stack used */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { label: 'React 18', color: '#61DAFB' },
                  { label: 'Vite 5', color: '#646CFF' },
                  { label: 'Tailwind CSS', color: '#06B6D4' },
                  { label: 'Framer Motion', color: '#FF0055' },
                  { label: 'Node.js', color: '#339933' },
                ].map((tech) => (
                  <motion.span
                    key={tech.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="tech-tag text-xs"
                    style={{ borderColor: tech.color + '30', color: tech.color }}
                  >
                    {tech.label}
                  </motion.span>
                ))}
              </div>

              {/* Social links */}
              <motion.div className="flex items-center gap-5">
                {[
                  { label: 'GitHub', href: 'https://github.com/Chanikyachowdarysamineni', Icon: FaGithub, color: '#a78bfa' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/', Icon: FaLinkedin, color: '#0ea5e9' },
                  { label: 'LeetCode', href: 'https://leetcode.com/u/oO8MDDX40s/', Icon: SiLeetcode, color: '#f59e0b' },
                  { label: 'Email', href: 'mailto:chanikyachowdary86@gmail.com', Icon: FaEnvelope, color: '#06b6d4' },
                ].map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors text-xs sm:text-sm font-medium"
                  >
                    <link.Icon size={16} style={{ color: 'inherit' }} className="group-hover:text-current" />
                    <span className="hidden sm:inline">{link.label}</span>
                  </motion.a>
                ))}
              </motion.div>

              {/* Bottom line */}
              <div className="flex flex-col items-center gap-2 pt-2 border-t border-white/5 w-full">
                <motion.p
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm font-mono text-center"
                >
                  Crafted with
                  <FaHeart size={12} style={{ color: '#a78bfa' }} />
                  and a lot of
                  <FaCoffee size={12} style={{ color: '#f59e0b' }} />
                  &mdash; Copyright {new Date().getFullYear()} All rights reserved
                </motion.p>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>
      </motion.div>
    </>
  )
}

export default App
