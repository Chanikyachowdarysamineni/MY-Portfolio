import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/[0.02] backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-cosmic-purple/10' 
          : 'bg-transparent'
      }`}
      style={
        isScrolled
          ? {
              boxShadow: '0 8px 32px 0 rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(24px) saturate(180%)',
            }
          : {}
      }
    >
      {/* Animated top border gradient */}
      {isScrolled && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cosmic-purple to-transparent"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative text-lg sm:text-xl md:text-2xl font-bold cursor-pointer group"
            onClick={() => scrollToSection('home')}
          >
            <span className="bg-gradient-to-r from-cosmic-purple via-cosmic-blue to-cosmic-cyan bg-clip-text text-transparent">
              Chanikya's Portfolio
            </span>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {['Home', 'Projects', 'Publications', 'Skills'].map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="relative text-gray-200 hover:text-cosmic-purple transition-colors font-medium group"
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
            
            {/* Social Icons */}
            <div className="flex items-center space-x-3 lg:space-x-4 ml-4">
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-cosmic-cyan transition-colors relative group"
              >
                <FaLinkedin size={18} className="md:w-5 md:h-5" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-cosmic-cyan"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: -5, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/Chanikyachowdarysamineni"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-cosmic-purple transition-colors relative group"
              >
                <FaGithub size={18} className="md:w-5 md:h-5" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-cosmic-purple"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="https://leetcode.com/u/oO8MDDX40s/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-yellow-500 transition-colors relative group"
              >
                <SiLeetcode size={18} className="md:w-5 md:h-5" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-yellow-500"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: -5, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:chanikyachowdary86@gmail.com"
                className="text-gray-200 hover:text-cosmic-blue transition-colors relative group"
              >
                <FaEnvelope size={18} className="md:w-5 md:h-5" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-cosmic-blue"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </div>

            <motion.a
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              href="/Chanikya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block px-4 lg:px-6 py-2 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all text-sm lg:text-base relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-cosmic-cyan to-cosmic-purple"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Resume</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-white text-xl sm:text-2xl relative z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-3 sm:mt-4 pb-3 sm:pb-4 space-y-3 sm:space-y-4"
          >
            {['Home', 'Projects', 'Publications', 'Skills'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left text-gray-200 hover:text-cosmic-purple transition-colors font-medium py-2 text-sm sm:text-base"
              >
                {item}
              </button>
            ))}
            
            <div className="flex items-center space-x-4 sm:space-x-6 pt-3 sm:pt-4">
              <a
                href="https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-cosmic-cyan"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/Chanikyachowdarysamineni"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-cosmic-purple"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://leetcode.com/u/oO8MDDX40s/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-yellow-500"
              >
                <SiLeetcode size={24} />
              </a>
              <a
                href="mailto:chanikyachowdary86@gmail.com"
                className="text-gray-200 hover:text-cosmic-blue"
              >
                <FaEnvelope size={24} />
              </a>
            </div>

            <a
              href="/Chanikya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 sm:px-6 py-2 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white rounded-full font-semibold mt-3 sm:mt-4 text-center text-sm sm:text-base"
            >
              Resume
            </a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
