import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, FaDownload, FaUsers } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'

const Navbar = ({ currentVisitorEmail, onVisitorsClick }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const ADMIN_EMAIL = 'chanikyachowdary86@gmail.com'
  const isAdmin = currentVisitorEmail === ADMIN_EMAIL
  const navItems = ['Home', 'Projects', 'Publications', 'Skills']

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const sections = ['home', 'projects', 'publications', 'skills']
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
    { href: 'https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/', Icon: FaLinkedin, label: 'LinkedIn', color: '#4a4e69' },
    { href: 'https://github.com/Chanikyachowdarysamineni', Icon: FaGithub, label: 'GitHub', color: '#9a8c98' },
    { href: 'https://leetcode.com/u/oO8MDDX40s/', Icon: SiLeetcode, label: 'LeetCode', color: '#c9ada7' },
    { href: 'mailto:chanikyachowdary86@gmail.com', Icon: FaEnvelope, label: 'Email', color: '#c9ada7' },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}
    >
      {/* Glass background panel */}
      <motion.div
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0"
        style={{
          background: 'rgba(34, 34, 59, 0.75)',
          backdropFilter: 'blur(28px) saturate(200%)',
          borderBottom: '1px solid rgba(201, 173, 167, 0.1)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.4), 0 0 60px rgba(201,173,167,0.04)',
        }}
      />

      {/* Top accent line */}
      <motion.div
        animate={{ scaleX: isScrolled ? 1 : 0, opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 right-0 h-[1px] origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, #c9ada7 30%, #9a8c98 70%, transparent)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection('home')}
            className="relative group flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-7 h-7 rounded-full flex-shrink-0"
              style={{
                background: 'conic-gradient(from 0deg, #c9ada7, #4a4e69, #9a8c98, #c9ada7)',
                padding: '1.5px',
              }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: '#22223b', fontSize: '9px' }}
              >
                CC
              </div>
            </motion.div>
            <span
              className="text-base sm:text-lg font-bold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #c9ada7 0%, #4a4e69 50%, #9a8c98 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Chanikya's Portfolio
            </span>
            <motion.div
              className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 origin-left"
              style={{ background: 'linear-gradient(90deg, #c9ada7, #9a8c98)' }}
            />
          </motion.button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.toLowerCase()
              return (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 + 0.2 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ color: isActive ? '#c9ada7' : '#9a8c98' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'rgba(201,173,167,0.12)',
                        border: '1px solid rgba(201,173,167,0.25)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavDot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: '#c9ada7' }}
                    />
                  )}
                </motion.button>
              )
            })}

            {/* Visitors Button - Show only for admin */}
            {isAdmin && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                onClick={onVisitorsClick}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="relative ml-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                style={{
                  background: 'rgba(201, 173, 167, 0.12)',
                  color: '#c9ada7',
                  border: '1px solid rgba(201, 173, 167, 0.3)',
                }}
              >
                <FaUsers size={14} />
                <span>Visitors</span>
              </motion.button>
            )}
          </div>

          {/* Right side: social icons + resume */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 mr-2">
              {socialLinks.map(({ href, Icon, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative p-2 rounded-lg text-gray-500 transition-all duration-200 group"
                  title={label}
                >
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: `${color}15` }}
                  />
                  <Icon size={16} style={{ position: 'relative', color: 'inherit' }} className="group-hover:text-white transition-colors" />
                  <span
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ background: 'rgba(15,15,30,0.9)', color: '#f2e9e4', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {label}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Resume button */}
            <motion.a
              href="/Chanikya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #c9ada7, #4a4e69)',
                boxShadow: '0 4px 15px rgba(201,173,167,0.3)',
              }}
            >
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', transform: 'skewX(-15deg)' }}
              />
              <FaDownload size={12} className="relative z-10" />
              <span className="relative z-10">Resume</span>
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden relative p-2 rounded-lg text-gray-400"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes size={16} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden mt-3 overflow-hidden"
            >
              <div
                className="rounded-2xl p-4 space-y-1"
                style={{
                  background: 'rgba(10, 10, 25, 0.95)',
                  border: '1px solid rgba(139,92,246,0.15)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {navItems.map((item) => {
                  const isActive = activeSection === item.toLowerCase()
                  return (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                      style={{
                        color: isActive ? '#a78bfa' : '#94a3b8',
                        background: isActive ? 'rgba(139,92,246,0.1)' : 'transparent',
                        border: isActive ? '1px solid rgba(139,92,246,0.2)' : '1px solid transparent',
                      }}
                    >
                      {item}
                    </button>
                  )
                })}

                <div className="pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3 mb-3">
                    {socialLinks.map(({ href, Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                  <a
                    href="/Chanikya_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
                  >
                    <FaDownload size={12} />
                    Download Resume
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar
