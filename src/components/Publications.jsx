import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { FaBook, FaExternalLinkAlt, FaFilePdf, FaCalendarAlt, FaAward, FaQuoteLeft, FaBrain } from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'
import { useState } from 'react'

const SectionHeader = ({ badge, title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="text-center mb-16 space-y-4"
  >
    <span className="section-badge">{badge}</span>
    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
      <span
        style={{
          background: 'linear-gradient(135deg, #c9ada7 0%, #4a4e69 50%, #9a8c98 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {title}
      </span>
    </h2>
    <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">{subtitle}</p>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="h-px max-w-xs mx-auto"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(201,173,167,0.5), rgba(154,140,152,0.5), transparent)' }}
    />
  </motion.div>
)

const PublicationCard = ({ publication, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useSpring(useTransform(y, [-60, 60], [3, -3]), { stiffness: 200, damping: 30 })
  const rotY = useSpring(useTransform(x, [-60, 60], [-3, 3]), { stiffness: 200, damping: 30 })

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <motion.div
      variants={{
        hidden: { y: 40, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group"
      style={{ perspective: '1400px' }}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setIsHovered(false) }}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(20px)',
          boxShadow: isHovered
            ? '0 24px 60px rgba(0,0,0,0.5), 0 0 50px rgba(201,173,167,0.1)'
            : '0 8px 32px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Top gradient bar */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${publication.gradient}`} />

        {/* Shimmer */}
        {isHovered && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none z-10"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)', transform: 'skewX(-15deg)' }}
          />
        )}

        <div className="p-7 sm:p-9" style={{ transform: 'translateZ(15px)' }}>
          {/* Top metadata row  */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(201,173,167,0.1)',
                border: '1px solid rgba(201,173,167,0.3)',
                color: '#c9ada7',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#c9ada7' }}
              />
              {publication.status}
            </span>

            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(154,140,152,0.1)',
                border: '1px solid rgba(154,140,152,0.3)',
                color: '#9a8c98',
              }}
            >
              <FaCalendarAlt size={10} />
              {publication.year}
            </span>

            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(74,78,105,0.1)',
                border: '1px solid rgba(74,78,105,0.3)',
                color: '#4a4e69',
              }}
            >
              <FaAward size={10} />
              {publication.type}
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Icon area */}
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 5 }}
                animate={isHovered ? { y: [0, -6, 0] } : {}}
                transition={isHovered ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } : {}}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-5xl relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transform: 'translateZ(30px)',
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={isHovered ? { opacity: [0.4, 0.7, 0.4] } : { opacity: 0.2 }}
                  transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                  style={{ background: `linear-gradient(135deg, ${publication.iconBg || 'rgba(6,182,212,0.15)'}, transparent)` }}
                />
                <publication.icon className="relative z-10" size={36} />
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex-grow space-y-4" style={{ transform: 'translateZ(25px)' }}>
              {/* Title */}
              <motion.h3
                className="text-xl sm:text-2xl font-bold text-white leading-tight group-hover:text-transparent transition-all duration-300"
                style={
                  isHovered
                    ? {
                        background: 'linear-gradient(135deg, #c9ada7, #9a8c98)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }
                    : {}
                }
              >
                {publication.title}
              </motion.h3>

              {/* Conference */}
              <div className="flex items-center gap-2">
                <FaExternalLinkAlt size={12} style={{ color: '#c9ada7' }} />
                <span className="text-sm font-semibold" style={{ color: '#c9ada7' }}>
                  {publication.conference}
                </span>
              </div>

              {/* Quote / Description */}
              <div
                className="relative pl-4 text-sm text-gray-500 leading-relaxed italic"
                style={{ borderLeft: '2px solid rgba(201,173,167,0.3)' }}
              >
                <FaQuoteLeft size={10} className="absolute -left-1.5 -top-1 text-cosmic-purple opacity-50" />
                {publication.description}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {publication.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.08, y: -1 }}
                    className="tech-tag"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href={publication.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #c9ada7, #9a8c98)',
                    boxShadow: '0 4px 20px rgba(201,173,167,0.25)',
                    transform: 'translateZ(40px)',
                  }}
                >
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', transform: 'skewX(-15deg)' }}
                  />
                  <FaFilePdf size={14} className="relative z-10" />
                  <span className="relative z-10">View Publication</span>
                </motion.a>
                {publication.ieeeLink && (
                  <motion.a
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    href={publication.ieeeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
                      boxShadow: '0 4px 20px rgba(245,158,11,0.25)',
                      transform: 'translateZ(40px)',
                    }}
                  >
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', transform: 'skewX(-15deg)' }}
                    />
                    <SiGooglescholar size={14} className="relative z-10" />
                    <span className="relative z-10">IEEE Xplore</span>
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hover bottom glow */}
        <motion.div
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: 'radial-gradient(ellipse at 50% 110%, rgba(201,173,167,0.1) 0%, transparent 60%)' }}
        />
      </motion.div>
    </motion.div>
  )
}

const Publications = () => {
  const publications = [
    {
      title: 'ML-Based Weather Forecasting Using Regression and Time-Series Models',
      conference: 'Mount Zion ICACRS Conference',
      status: 'Published',
      year: '2025',
      type: 'Research Paper',
      description: 'Presents a novel approach to climate prediction using ensemble supervised machine learning techniques, optimized feature engineering, and multi-step time-series forecasting achieving significant accuracy improvements over traditional models.',
      tags: ['Machine Learning', 'Time-Series', 'Regression', 'Weather Forecasting', 'Feature Engineering', 'Python'],
      pdfLink: '/ML_Weather_Forecasting_Paper.pdf',
      ieeeLink: 'https://ieeexplore.ieee.org/document/11324360',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      iconBg: 'rgba(6,182,212,0.15)',
      icon: FaBrain,
    },
  ]

  return (
    <section id="publications" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="[ Academic Research ]"
          title="Publications"
          subtitle="Peer-reviewed research contributions advancing knowledge in machine learning and data science."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.15 }}
          className="space-y-6"
        >
          {publications.map((pub, index) => (
            <PublicationCard key={index} publication={pub} index={index} />
          ))}
        </motion.div>

        {/* Coming soon card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-8"
        >
          <motion.div
            whileHover={{ y: -4 }}
            className="relative rounded-2xl p-7 text-center overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px dashed rgba(139,92,246,0.2)',
            }}
          >
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.04), transparent 70%)' }}
            />
            <div className="relative z-10 space-y-3">
              <motion.p
                className="text-gray-500 text-sm font-medium"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                More research papers in progress...
              </motion.p>
              <p className="text-xs text-gray-600 font-mono">
                Exploring topics in Computer Vision, NLP & Distributed Systems
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Publications
