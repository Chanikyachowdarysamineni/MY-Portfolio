import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload, FaArrowRight, FaChevronDown } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import ParticleBackground from './ParticleBackground'

const ROLES = [
  'Software Engineer',
  'Full Stack Developer',
  'AI & ML Enthusiast',
  'Cloud Developer',
  'React Native Developer',
]

const useTypingEffect = (words, typingSpeed = 80, deletingSpeed = 40, pauseMs = 1800) => {
  const [display, setDisplay] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]
    if (isPaused) {
      const timer = setTimeout(() => { setIsPaused(false); setIsDeleting(true) }, pauseMs)
      return () => clearTimeout(timer)
    }
    const speed = isDeleting ? deletingSpeed : typingSpeed
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplay(word.slice(0, display.length + 1))
        if (display.length + 1 === word.length) setIsPaused(true)
      } else {
        setDisplay(word.slice(0, display.length - 1))
        if (display.length - 1 === 0) {
          setIsDeleting(false)
          setWordIndex((wordIndex + 1) % words.length)
        }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [display, isDeleting, isPaused, wordIndex, words, typingSpeed, deletingSpeed, pauseMs])

  return display
}

const socialLinks = [
  { href: 'https://github.com/Chanikyachowdarysamineni', Icon: FaGithub, label: 'GitHub', color: 'hover:text-[var(--color-heading)]' },
  { href: 'https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/', Icon: FaLinkedin, label: 'LinkedIn', color: 'hover:text-[#0A66C2]' },
  { href: 'https://leetcode.com/u/oO8MDDX40s/', Icon: SiLeetcode, label: 'LeetCode', color: 'hover:text-[#FFA116]' },
  { href: 'mailto:chanikyachowdary86@gmail.com', Icon: FaEnvelope, label: 'Email', color: 'hover:text-[var(--color-secondary)]' },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const Hero = () => {
  const typedRole = useTypingEffect(ROLES)
  const scrollToNext = () => {
    const el = document.getElementById('about')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(108,99,255,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute top-1/3 left-0 w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(255,101,132,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { size: 60, top: '15%', left: '8%',  delay: 0,   color: 'rgba(108,99,255,0.15)',   shape: 'rounded-xl', duration: 6 },
          { size: 40, top: '70%', left: '5%',  delay: 2,   color: 'rgba(0,212,255,0.12)',    shape: 'rounded-full', duration: 8 },
          { size: 50, top: '20%', right: '8%', delay: 1,   color: 'rgba(255,101,132,0.12)',  shape: 'rounded-lg', duration: 7 },
          { size: 30, top: '60%', right: '10%',delay: 3,   color: 'rgba(16,185,129,0.12)',   shape: 'rounded-full', duration: 5 },
          { size: 80, top: '80%', left: '20%', delay: 1.5, color: 'rgba(245,158,11,0.08)',   shape: 'rounded-2xl', duration: 9 },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className={`absolute ${shape.shape} border`}
            style={{
              width: shape.size, height: shape.size,
              top: shape.top, left: shape.left, right: shape.right,
              background: shape.color,
              borderColor: shape.color,
            }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: shape.duration, delay: shape.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ─── Left: Text Content ─── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Availability badge */}
            <motion.div variants={item}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold"
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  color: '#10B981',
                }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Available for Opportunities
              </div>
            </motion.div>

            {/* Name */}
            <motion.div variants={item} className="space-y-3">
              <div className="text-sm font-mono text-[var(--color-muted)] tracking-[0.25em] uppercase">
                Hi there, I'm
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight">
                <span className="block text-[var(--color-heading)]">Chanikya</span>
                <span className="block" style={{
                  background: 'linear-gradient(135deg, #6C63FF 0%, #00D4FF 60%, #10B981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Chowdary
                </span>
              </h1>
            </motion.div>

            {/* Typing effect */}
            <motion.div variants={item} className="flex items-center gap-2 h-8">
              <span className="text-lg sm:text-xl font-medium text-[var(--color-muted)]">I'm a</span>
              <span className="text-lg sm:text-xl font-semibold text-[var(--color-primary)]">
                {typedRole}
              </span>
              <span className="typing-cursor" />
            </motion.div>

            {/* Bio */}
            <motion.p variants={item} className="text-base sm:text-lg text-[var(--color-muted)] max-w-xl leading-relaxed">
              Motivated Computer Science undergraduate passionate about building{' '}
              <span className="text-[var(--color-text)] font-medium">scalable full-stack solutions</span>,{' '}
              <span className="text-[var(--color-text)] font-medium">AI-powered applications</span>, and{' '}
              <span className="text-[var(--color-text)] font-medium">cross-platform mobile apps</span>{' '}
              that make a real-world impact.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
              <a
                href="mailto:chanikyachowdary86@gmail.com"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 ripple-container"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}
              >
                Hire Me
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={13} />
              </a>

              <a
                href="/Resume_CCS.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[var(--color-text)] transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--color-border-light)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(108,99,255,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border-light)'}
              >
                <FaFileDownload size={13} />
                View Resume
              </a>

              <a
                href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[var(--color-text)] transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--color-border-light)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border-light)'}
              >
                View Projects
              </a>

              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[var(--color-text)] transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--color-border-light)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,101,132,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border-light)'}
              >
                Contact Me
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="flex items-center gap-5 pt-2">
              <span className="text-xs text-[var(--color-muted)] font-mono tracking-widest uppercase">Find me on</span>
              <div className="h-px flex-1 max-w-[40px]" style={{ background: 'var(--color-border)' }} />
              {socialLinks.map(({ href, Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className={`text-[var(--color-muted)] ${color} transition-all duration-200 hover:-translate-y-0.5 hover:scale-110`}
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── Right: Profile Image (Square with Curved Edges) ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            {/* Square Container with Curved Edges */}
            <div
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
              style={{
                border: '1px solid var(--color-border-light)',
                background: 'var(--color-surface)',
                boxShadow: '0 20px 50px rgba(108,99,255,0.15)',
              }}
            >
              <img
                src="/profile.jpg"
                alt="Chanikya Chowdary Samineni"
                className="w-full h-full object-cover object-center"
                onError={e => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling.style.display = 'flex'
                }}
              />
              {/* Fallback */}
              <div
                className="w-full h-full items-center justify-center text-6xl font-display font-bold hidden"
                style={{
                  display: 'none',
                  background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,255,0.1))',
                  color: 'var(--color-primary)',
                }}
              >
                CS
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToNext}
        >
          <span className="text-[10px] font-mono text-[var(--color-muted)] tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaChevronDown size={14} className="text-[var(--color-muted)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
