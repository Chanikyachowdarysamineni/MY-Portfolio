import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Projects from './components/Projects'
import Publications from './components/Publications'
import Skills from './components/Skills'
import CosmicBackground from './components/CosmicBackground'
import './App.css'

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <div className="relative min-h-screen bg-cosmic-dark text-white overflow-x-hidden">
      {/* Animated Background */}
      <CosmicBackground />

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Home />
        <Projects />
        <Publications />
        <Skills />
        
        {/* Footer */}
        <footer className="relative py-8 sm:py-10 md:py-12 px-4 sm:px-6 mt-12 sm:mt-16 md:mt-20 border-t border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <motion.p 
                className="text-gray-300 font-medium text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                © 2026 Chanikya Chowdary Samineni. Built with React & Tailwind CSS
              </motion.p>
              <motion.p 
                className="text-gray-400 text-xs sm:text-sm flex items-center justify-center gap-2 flex-wrap"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Designed with <span className="text-cosmic-purple text-xl">💜</span> and lots of <span className="text-xl">☕</span>
              </motion.p>
              
              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-0.5 bg-gradient-to-r from-transparent via-cosmic-purple to-transparent mx-auto max-w-xs"
              />
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
