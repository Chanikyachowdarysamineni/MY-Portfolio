import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaBolt } from 'react-icons/fa'

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading') // loading | done

  const loadingTexts = [
    'Initializing modules...',
    'Loading components...',
    'Rendering portfolio...',
    'Almost there...',
    'Welcome!',
  ]

  const currentText = loadingTexts[Math.min(Math.floor(progress / 22), loadingTexts.length - 1)]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setPhase('done')
          setTimeout(() => onComplete?.(), 600)
          return 100
        }
        return prev + 1.4
      })
    }, 25)
    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(12px)' }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
      style={{ background: '#03040f' }}
    >
      {/* Deep background gradient */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)' }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            background: i % 2 === 0 ? '#8b5cf6' : '#06b6d4',
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 3) * 25}%`,
            boxShadow: `0 0 ${10 + i * 4}px ${i % 2 === 0 ? '#8b5cf6' : '#06b6d4'}`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: 2.5 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6">
        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="relative w-20 h-20"
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #8b5cf6, #3b82f6, #06b6d4, #8b5cf6)',
              padding: '2px',
            }}
          >
            <div
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{ background: '#03040f' }}
            >
              <FaBolt size={22} style={{ color: '#a78bfa' }} />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <div className="text-center space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Chanikya Chowdary Samineni
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-sm tracking-[0.3em] uppercase font-mono"
          >
            Portfolio v2.0
          </motion.p>
        </div>

        {/* Progress section */}
        <div className="w-64 sm:w-96 space-y-3">
          {/* Bar */}
          <div className="relative h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4)',
              }}
              transition={{ duration: 0.1 }}
            />
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 w-1/2"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
            />
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentText}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-gray-500 font-mono"
              >
                {currentText}
              </motion.span>
            </AnimatePresence>
            <motion.span
              className="text-xs font-mono font-bold"
              style={{ color: '#8b5cf6' }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: i % 2 === 0 ? '#8b5cf6' : '#06b6d4' }}
            />
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border border-cosmic-purple/20 rounded-xl">
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-1 border border-cosmic-purple/20 rounded-lg"
        />
      </div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border border-cosmic-cyan/20 rounded-xl">
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute inset-1 border border-cosmic-cyan/20 rounded-lg"
        />
      </div>

      {/* Version tag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-600 font-mono tracking-widest"
      >
        REACT + VITE + TAILWIND
      </motion.div>
    </motion.div>
  )
}

export default LoadingScreen
