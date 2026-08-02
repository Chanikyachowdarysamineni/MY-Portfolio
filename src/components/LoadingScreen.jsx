import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading') // 'loading' | 'done'

  useEffect(() => {
    const increments = [
      { target: 30, delay: 100 },
      { target: 60, delay: 300 },
      { target: 85, delay: 600 },
      { target: 100, delay: 900 },
    ]

    let timeouts = []
    increments.forEach(({ target, delay }) => {
      timeouts.push(setTimeout(() => {
        setProgress(target)
        if (target === 100) {
          setTimeout(() => {
            setPhase('done')
            setTimeout(onComplete, 600)
          }, 400)
        }
      }, delay))
    })

    return () => timeouts.forEach(clearTimeout)
  }, [onComplete])

  const letters = 'CCS'.split('')

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: 'var(--color-bg-deep)' }}
        >
          {/* Background glow orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          </div>

          {/* Logo mark */}
          <div className="relative mb-12">
            {/* Spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4"
              style={{
                background: 'conic-gradient(from 0deg, #6C63FF, #00D4FF, transparent, transparent)',
                borderRadius: '50%',
                filter: 'blur(2px)',
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-6"
              style={{
                background: 'conic-gradient(from 180deg, rgba(255,101,132,0.5), transparent, transparent)',
                borderRadius: '50%',
                filter: 'blur(4px)',
              }}
            />

            {/* Center initials */}
            <div className="relative w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: 'var(--color-surface)', border: '1px solid rgba(108,99,255,0.3)' }}>
              <div className="flex gap-0.5">
                {letters.map((l, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl font-display font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {l}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mb-2"
          >
            <h1 className="text-xl font-display font-semibold text-[var(--color-heading)] tracking-wide">
              Chanikya Chowdary
            </h1>
            <p className="text-sm text-[var(--color-muted)] tracking-[0.2em] uppercase mt-1">
              Full Stack Developer
            </p>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 w-48"
          >
            <div className="h-px rounded-full overflow-hidden"
              style={{ background: 'var(--color-border-light)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
                  boxShadow: '0 0 8px rgba(108,99,255,0.8)',
                  width: `${progress}%`,
                  transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-[var(--color-muted)] font-mono">Loading...</span>
              <span className="text-[10px] text-[var(--color-muted)] font-mono">{progress}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
