import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'

const navLinks = [
  { label: 'About',       href: '#about' },
  { label: 'Experience',  href: '#experience' },
  { label: 'Leadership',  href: '#leadership' },
  { label: 'Skills',      href: '#skills' },
  { label: 'Projects',    href: '#projects' },
  { label: 'Achievements',href: '#achievements' },
  { label: 'Contact',     href: '#contact' },
]

const Navbar = ({ isDark, toggleTheme, onCommandPalette }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'skills', 'projects', 'achievements', 'whyhireme', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href) => {
    setMobileOpen(false)
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? isDark
              ? 'rgba(7, 7, 15, 0.88)'
              : 'rgba(245, 245, 255, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? isDark
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid rgba(108,99,255,0.12)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? isDark
              ? '0 4px 30px rgba(0,0,0,0.3)'
              : '0 4px 30px rgba(108,99,255,0.08)'
            : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a
              href="#home"
              onClick={e => { e.preventDefault(); scrollTo('#home') }}
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm text-white relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
                <span>CC</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #00D4FF, #10B981)' }} />
              </div>
              <span className="hidden sm:block text-sm font-display font-semibold text-[var(--color-heading)] group-hover:text-[var(--color-primary)] transition-colors">
                Chanikya Chowdary
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => {
                const sectionId = link.href.slice(1)
                const isActive = activeSection === sectionId
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-[var(--color-primary)]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                )
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Command Palette shortcut */}
              <button
                onClick={onCommandPalette}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-[var(--color-muted)] border border-[var(--color-border)] hover:border-[var(--color-border-light)] hover:text-[var(--color-text)] transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.03)' }}
                title="Command Palette (Ctrl+K)"
              >
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: 'var(--color-border)', border: '1px solid var(--color-border-light)' }}>⌘K</kbd>
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[rgba(108,99,255,0.1)] transition-all duration-200"
                aria-label="Toggle theme"
              >
                {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
              </button>

              {/* CTA */}
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); scrollTo('#contact') }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-glow-sm hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}
              >
                Hire Me
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
              >
                {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden border-b border-[var(--color-border)]"
            style={{ background: isDark ? 'rgba(7, 7, 15, 0.98)' : 'rgba(245, 245, 255, 0.98)', backdropFilter: 'blur(20px)' }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  href={link.href}
                  onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-[var(--color-primary)] bg-[rgba(108,99,255,0.08)]'
                      : 'text-[var(--color-text)] hover:bg-[rgba(255,255,255,0.04)]'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="flex items-center gap-4 px-4 pt-3 mt-1 border-t border-[var(--color-border)]">
                {[
                  { href: 'https://github.com/Chanikyachowdarysamineni', Icon: FaGithub, label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/', Icon: FaLinkedin, label: 'LinkedIn' },
                  { href: 'mailto:chanikyachowdary86@gmail.com', Icon: FaEnvelope, label: 'Email' },
                ].map(({ href, Icon, label }) => (
                  <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                    className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors" aria-label={label}>
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
