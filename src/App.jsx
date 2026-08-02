import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowUp, FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'

import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import About          from './components/About'
import Experience     from './components/Experience'
import Leadership     from './components/Leadership'
import Skills         from './components/Skills'
import Projects       from './components/Projects'
import Achievements   from './components/Achievements'
import CodingProfiles from './components/CodingProfiles'
import WhyHireMe      from './components/WhyHireMe'
import Contact        from './components/Contact'
import LoadingScreen  from './components/LoadingScreen'
import CommandPalette from './components/CommandPalette'
import ScrollProgress from './components/ScrollProgress'

import './App.css'

function App() {
  const [isLoading, setIsLoading]     = useState(true)
  const [isDark, setIsDark]           = useState(false)
  const [cmdOpen, setCmdOpen]         = useState(false)
  const [showBackTop, setShowBackTop] = useState(false)

  // Dark mode class
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark',  isDark)
    root.classList.toggle('light', !isDark)
  }, [isDark])

  // Command palette keyboard shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(open => !open)
      }
      if (e.key === 'Escape') setCmdOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Command Palette */}
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main App */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-screen"
        style={{ background: 'var(--color-bg)' }}
      >
        <Navbar
          isDark={isDark}
          toggleTheme={() => setIsDark(d => !d)}
          onCommandPalette={() => setCmdOpen(true)}
        />

        <main className="relative">
          <Hero />
          <About />
          <Experience />
          <Leadership />
          <Skills />
          <Projects />
          <Achievements />
          <CodingProfiles />
          <WhyHireMe />
          <Contact />
        </main>

        {/* ─── Footer ─── */}
        <footer className="relative border-t"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-deep)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-6"
            >
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm text-white"
                  style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
                  CC
                </div>
                <span className="font-display font-bold text-[var(--color-heading)]">Chanikya Chowdary Samineni</span>
              </div>

              <p className="text-sm text-[var(--color-muted)] text-center max-w-md">
                Engineering scalable systems. Designing premium experiences.
                Building the future, one commit at a time.
              </p>

              {/* Nav links */}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-[var(--color-muted)]">
                {['Home', 'About', 'Experience', 'Leadership', 'Skills', 'Projects', 'Contact'].map(link => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={e => {
                      e.preventDefault()
                      document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>

              {/* Social */}
              <div className="flex items-center gap-4">
                {[
                  { href: 'https://github.com/Chanikyachowdarysamineni', Icon: FaGithub, label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/', Icon: FaLinkedin, label: 'LinkedIn' },
                  { href: 'https://leetcode.com/u/oO8MDDX40s/', Icon: SiLeetcode, label: 'LeetCode' },
                  { href: 'mailto:chanikyachowdary86@gmail.com', Icon: FaEnvelope, label: 'Email' },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-all hover:-translate-y-0.5"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)' }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>

              <div className="w-full h-px" style={{ background: 'var(--color-border)' }} />

              <div className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
                <span>Built with</span>
                <FaHeart size={10} className="text-red-500" />
                <span>by Chanikya using React + Framer Motion · {new Date().getFullYear()}</span>
              </div>

              {/* Keyboard hint */}
              <p className="text-[10px] text-[var(--color-subtle)] font-mono">
                Press <kbd className="px-1.5 py-0.5 rounded text-[9px]" style={{ background: 'var(--color-border)', border: '1px solid var(--color-border-light)' }}>Ctrl+K</kbd> to open command palette
              </p>
            </motion.div>
          </div>
        </footer>
      </motion.div>

      {/* Back to top */}
      <AnimatePresence>
        {showBackTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-glow transition-all hover:-translate-y-1 hover:shadow-glow-lg"
            style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}
            aria-label="Back to top"
          >
            <FaArrowUp size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
