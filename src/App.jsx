import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaCoffee, FaArrowRight } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Publications from './components/Publications'
import Contact from './components/Contact'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isDark, setIsDark] = useState(false) // Default to light mode for white background

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setIsDark(false)
    }
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen bg-[var(--color-background)] text-[var(--color-body)] transition-colors duration-300 antialiased selection:bg-[var(--color-primary)] selection:text-white"
      >
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        
        <main className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
          <Home />
          <Projects />
          <Certifications />
          <Publications />
          <Skills />
          <Contact />
        </main>
        
        {/* Floating CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="fixed bottom-6 right-6 z-50 hidden sm:block"
        >
          <a
            href="#contact"
            className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-gradient-cta shadow-glow-accent hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Let's Work Together
            <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Footer */}
        <footer className="relative mt-24 sm:mt-32 border-t border-[var(--color-border)] bg-[var(--color-ink)] text-[var(--color-bone)]">
          <div className="w-full max-w-screen-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="text-center space-y-2">
                <p className="text-3xl font-display font-bold tracking-tight text-[var(--color-bone)]">
                  Chanikya Chowdary Samineni
                </p>
                <p className="text-gray-400 text-sm sm:text-base font-medium">
                  Engineering Scalable Systems. Designing Premium Experiences.
                </p>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-6">
                {[
                  { label: 'GitHub', href: 'https://github.com/Chanikyachowdarysamineni', Icon: FaGithub },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/', Icon: FaLinkedin },
                  { label: 'LeetCode', href: 'https://leetcode.com/u/oO8MDDX40s/', Icon: SiLeetcode },
                  { label: 'Email', href: 'mailto:chanikyachowdary86@gmail.com', Icon: FaEnvelope },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[var(--color-coral)] transition-colors"
                    aria-label={link.label}
                  >
                    <link.Icon size={24} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </footer>
      </motion.div>
    </>
  )
}

export default App
