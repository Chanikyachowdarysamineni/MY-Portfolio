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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-cosmic-purple/10' 
          : 'bg-transparent'
      }`}
      style={
        isScrolled
          ? {
              boxShadow: '0 8px 32px 0 rgba(139, 92, 246, 0.1)',
            }
          : {}
      }
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-cyan bg-clip-text text-transparent cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            Chanikay's portfolio
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Projects', 'Publications', 'Skills'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-200 hover:text-cosmic-purple transition-colors font-medium"
              >
                {item}
              </motion.button>
            ))}
            
            {/* Social Icons */}
            <div className="flex items-center space-x-4 ml-4">
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                href="https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-cosmic-cyan transition-colors"
              >
                <FaLinkedin size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: -5 }}
                href="https://github.com/Chanikyachowdarysamineni"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-cosmic-purple transition-colors"
              >
                <FaGithub size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                href="https://leetcode.com/u/oO8MDDX40s/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-yellow-500 transition-colors"
              >
                <SiLeetcode size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: -5 }}
                href="mailto:chanikyachowdary86@gmail.com"
                className="text-gray-200 hover:text-cosmic-blue transition-colors"
              >
                <FaEnvelope size={20} />
              </motion.a>
            </div>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/Chanikya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all"
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 space-y-4"
          >
            {['Home', 'Projects', 'Publications', 'Skills'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left text-gray-200 hover:text-cosmic-purple transition-colors font-medium py-2"
              >
                {item}
              </button>
            ))}
            
            <div className="flex items-center space-x-6 pt-4">
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
              className="block w-full px-6 py-2 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white rounded-full font-semibold mt-4 text-center"
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
