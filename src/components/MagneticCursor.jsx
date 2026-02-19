import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const MagneticCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let timeoutId

    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
      
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setIsVisible(true), 100)
    }

    const mouseEnter = () => setIsVisible(true)
    const mouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseenter', mouseEnter)
    window.addEventListener('mouseleave', mouseLeave)

    // Add hover effects for interactive elements
    const handleMouseOver = () => setCursorVariant('hover')
    const handleMouseOut = () => setCursorVariant('default')

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]')
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseOver)
        el.addEventListener('mouseleave', handleMouseOut)
      })
    }

    addHoverListeners()

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mouseenter', mouseEnter)
      window.removeEventListener('mouseleave', mouseLeave)
      observer.disconnect()
      clearTimeout(timeoutId)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 1.5,
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      border: '2px solid rgba(139, 92, 246, 0.8)',
    },
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-cosmic-purple pointer-events-none z-[9999] mix-blend-difference"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cosmic-cyan pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.2,
        }}
        style={{
          opacity: isVisible ? 1 : 0,
          boxShadow: '0 0 10px rgba(6, 182, 212, 0.8), 0 0 20px rgba(6, 182, 212, 0.5)',
        }}
      />
    </>
  )
}

export default MagneticCursor
