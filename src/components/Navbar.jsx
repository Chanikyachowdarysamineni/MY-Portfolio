import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa'

const Navbar = ({ isDark, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const navItems = ['Home', 'Projects', 'Skills']

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      const sections = ['home', 'projects', 'skills']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const socialLinks = [
    { href: 'https://github.com/Chanikyachowdarysamineni', Icon: FaGithub, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/', Icon: FaLinkedin, label: 'LinkedIn' },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}
    >
      {/* Glass background panel */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-surface) 70%, transparent)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--color-border)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="group flex items-center gap-2"
          >
            <span className="text-lg font-semibold tracking-tight text-[var(--color-heading)] transition-colors">
              Chanikya
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-[var(--color-background)] rounded-full p-1 border border-[var(--color-border)] shadow-soft">
            {navItems.map((item) => {
              const isActive = activeSection === item.toLowerCase()
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive ? 'text-[var(--color-heading)]' : 'text-[var(--color-muted)] hover:text-[var(--color-body)]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 rounded-full bg-[var(--color-surface)] shadow-soft"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </button>
              )
            })}
          </div>

          {/* Right side: social icons + theme toggle */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-muted)] hover:text-[var(--color-heading)] transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <div className="w-px h-4 bg-[var(--color-border)]" />

            <button
              onClick={toggleTheme}
              className="text-[var(--color-muted)] hover:text-[var(--color-heading)] transition-colors p-1"
              aria-label="Toggle Theme"
            >
              {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>

          {/* Mobile hamburger & Theme Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleTheme}
              className="text-[var(--color-muted)] hover:text-[var(--color-heading)] transition-colors p-1"
            >
              {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[var(--color-heading)] p-1"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <FaTimes size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <FaBars size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4 shadow-soft-lg space-y-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.toLowerCase()
                  return (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? 'bg-[var(--color-background)] text-[var(--color-primary)]' : 'text-[var(--color-body)]'
                      }`}
                    >
                      {item}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar
