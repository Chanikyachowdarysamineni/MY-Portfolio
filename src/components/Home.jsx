import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { FaRocket, FaCode, FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { useState, useEffect, useRef } from 'react'

// Typewriter hook
const useTypewriter = (words, speed = 80, deleteSpeed = 50, pause = 2000) => {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx % words.length]
    let timeout

    if (!isDeleting && displayed === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && displayed === '') {
      setIsDeleting(false)
      setWordIdx((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(() => {
        setDisplayed(isDeleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1))
      }, isDeleting ? deleteSpeed : speed)
    }
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIdx, words, speed, deleteSpeed, pause])

  return displayed
}

// Interactive tilt card
const TiltCard = ({ children, className = '', style = {} }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 300, damping: 30 })
  const rotY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 })

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <motion.div
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', ...style }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const StatCard = ({ value, label, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
    whileHover={{ y: -4, scale: 1.04 }}
    className="flex-1 min-w-[90px] relative group cursor-default"
  >
    <div
      className="relative rounded-2xl px-4 py-4 text-center overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(circle at 50% 120%, rgba(201,173,167,0.12), transparent 60%)' }}
      />
      <motion.div
        className="text-2xl font-black mb-0.5 group-hover:text-cosmic-purple-light transition-colors"
        style={{
          background: 'linear-gradient(135deg, #c9ada7, #4a4e69)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        whileHover={{ scale: 1.1 }}
      >
        {value}
      </motion.div>
      <div className="text-xs text-gray-500 font-medium">{label}</div>
    </div>
  </motion.div>
)

const Home = () => {
  const roles = ['Full Stack Developer', 'React Developer', 'Node.js Engineer', 'Problem Solver', 'Open Source Enthusiast']
  const typewriterText = useTypewriter(roles)

  const socialLinks = [
    { href: 'https://github.com/Chanikyachowdarysamineni', Icon: FaGithub, label: 'GitHub', color: '#9a8c98' },
    { href: 'https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/', Icon: FaLinkedin, label: 'LinkedIn', color: '#4a4e69' },
    { href: 'https://leetcode.com/u/oO8MDDX40s/', Icon: SiLeetcode, label: 'LeetCode', color: '#c9ada7' },
    { href: 'mailto:chanikyachowdary86@gmail.com', Icon: FaEnvelope, label: 'Email', color: '#c9ada7' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Section-level glow */}
      <div
        className="absolute top-1/3 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,173,167,0.08) 0%, transparent 60%)' }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,173,167,0.06) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ---- LEFT COLUMN ---- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-7 z-10"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <motion.span
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: 'rgba(201,173,167,0.1)',
                border: '1px solid rgba(201,173,167,0.3)',
                color: '#c9ada7',
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ background: '#9a8c98', boxShadow: '0 0 8px #9a8c98' }}
              />
              Available for opportunities
            </motion.span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05]">
              <span className="text-white">Hi, I'm </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #c9ada7 0%, #4a4e69 50%, #9a8c98 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
              >
                Chanikya Chowdary Samineni
              </span>
            </h1>

            {/* Typewriter */}
            <div className="flex items-center gap-2 h-9 sm:h-10">
              <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-400">
                {typewriterText}
              </span>
              <span
                className="inline-block w-[2px] h-6 sm:h-7 rounded-sm"
                style={{
                  background: '#c9ada7',
                  animation: 'blink 1s step-end infinite',
                  boxShadow: '0 0 8px rgba(201,173,167,0.8)',
                }}
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-lg"
          >
            Crafting high-performance, visually stunning web experiences. Specialized in{' '}
            <span className="text-cosmic-taupe font-semibold">React</span>,{' '}
            <span className="text-cosmic-mauve font-semibold">Node.js</span>, and modern full-stack architectures.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
            {/* Primary CTA */}
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="group relative flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #c9ada7, #9a8c98, #4a4e69)',
                boxShadow: '0 8px 30px rgba(201,173,167,0.4), 0 0 0 1px rgba(201,173,167,0.2)',
              }}
            >
              <motion.div
                animate={{ x: ['-120%', '120%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 w-full"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', transform: 'skewX(-20deg)' }}
              />
              <FaRocket size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform relative z-10" />
              <span className="relative z-10">View My Work</span>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="mailto:chanikyachowdary86@gmail.com"
              className="group relative flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(201,173,167,0.3)',
                color: '#c9ada7',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(201,173,167,0.08)' }}
              />
              <FaCode size={14} className="relative z-10" />
              <span className="relative z-10">Let's Connect</span>
            </motion.a>

            {/* Resume download */}
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="/Chanikya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-gray-400 hover:text-white transition-colors"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <FaDownload size={12} />
              <span>Resume</span>
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 pt-1">
            <span className="text-xs text-gray-600 font-mono uppercase tracking-wider mr-1">Find me on</span>
            {socialLinks.map(({ href, Icon, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-xl text-gray-500 transition-all duration-200 group relative"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                title={label}
              >
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: `${color}18` }}
                />
                <Icon size={16} className="relative z-10 group-hover:text-white transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="flex gap-3 pt-2">
            {[
              { value: '15+', label: 'Technologies', delay: 1.4 },
              { value: '10+', label: 'Projects', delay: 1.5 },
              { value: '1', label: 'Publication', delay: 1.6 },
              { value: '100%', label: 'Dedication', delay: 1.7 },
            ].map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </motion.div>
        </motion.div>

        {/* ---- RIGHT COLUMN - Profile visual ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative flex justify-center items-center"
        >
          <TiltCard className="relative" style={{ perspective: '800px' }}>
            {/* Outer decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 m-auto rounded-full"
              style={{
                width: 'calc(100% + 60px)',
                height: 'calc(100% + 60px)',
                top: '-30px',
                left: '-30px',
                border: '1px dashed rgba(139,92,246,0.2)',
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 m-auto rounded-full"
              style={{
                width: 'calc(100% + 100px)',
                height: 'calc(100% + 100px)',
                top: '-50px',
                left: '-50px',
                border: '1px dotted rgba(6,182,212,0.15)',
              }}
            />

            {/* Glow blob behind image */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(6,182,212,0.2) 50%, transparent 70%)' }}
            />

            {/* Image container */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
            >
              {/* Conic gradient ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full"
                style={{ padding: '3px', background: 'conic-gradient(from 0deg, #8b5cf6, #3b82f6, #06b6d4, #10b981, #8b5cf6)' }}
              >
                <div className="w-full h-full rounded-full" style={{ background: '#03040f' }} />
              </motion.div>

              {/* Profile image */}
              <div
                className="absolute inset-[5px] rounded-full overflow-hidden"
                style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)' }}
              >
                <motion.img
                  src="/profile.jpg"
                  alt="Chanikya Chowdary Samineni"
                  className="w-full h-full object-cover object-center"
                  style={{ scale: 1.05 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling.style.display = 'flex'
                  }}
                />
                {/* Fallback */}
                <div
                  className="absolute inset-0 items-center justify-center text-8xl"
                  style={{
                    display: 'none',
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))',
                  }}
                >
                  CS
                </div>

                {/* Hover gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, transparent 50%, rgba(6,182,212,0.2) 100%)' }}
                />
              </div>

              {/* Orbiting dots */}
              {[
                { color: '#8b5cf6', size: 10, radius: 55, speed: 10, startAngle: 0 },
                { color: '#06b6d4', size: 8, radius: 55, speed: 14, startAngle: 120 },
                { color: '#3b82f6', size: 6, radius: 55, speed: 18, startAngle: 240 },
              ].map(({ color, size, speed, startAngle }, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: 'center' }}
                >
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: size,
                      height: size,
                      background: color,
                      boxShadow: `0 0 ${size * 2}px ${color}`,
                      top: '2%',
                      left: '50%',
                      transform: `translateX(-50%) rotate(${startAngle}deg)`,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Floating tech badges */}
            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-6 top-1/4 px-3 py-2 rounded-xl text-xs font-mono font-bold text-white"
              style={{
                background: 'rgba(14,10,30,0.9)',
                border: '1px solid rgba(139,92,246,0.4)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            >
              <span style={{ color: '#a78bfa' }}>const</span> <span className="text-white">dev</span> = <span style={{ color: '#22d3ee' }}>"chanikya"</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -right-4 bottom-1/4 flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{
                background: 'rgba(14,10,30,0.9)',
                border: '1px solid rgba(6,182,212,0.4)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ background: '#10b981', boxShadow: '0 0 8px #10b981' }}
              />
              <span className="text-xs font-bold text-gray-300">React + Node.js</span>
            </motion.div>
          </TiltCard>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-gray-700 flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], height: ['30%', '60%', '30%'] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 rounded-full bg-cosmic-purple"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Home
