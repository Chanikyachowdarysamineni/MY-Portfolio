import { motion, useMotionValue, useTransform } from 'framer-motion'
import { FaBook, FaExternalLinkAlt, FaFilePdf, FaCalendarAlt } from 'react-icons/fa'
import { useState } from 'react'

const PublicationCard = ({ publication, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      variants={{
        hidden: { y: 50, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.6,
            ease: 'easeOut',
          },
        },
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="group"
      style={{ perspective: '1500px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-cosmic-purple/50 transition-all duration-500 shadow-2xl hover:shadow-cosmic-purple/30"
      >
        {/* Gradient Overlay with animation */}
        <motion.div 
          className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${publication.gradient}`}
          animate={isHovered ? { scaleX: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          animate={isHovered ? { x: ['-100%', '100%'] } : {}}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            transform: 'skewX(-20deg)',
          }}
        />

        <div className="p-8 md:p-10" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Section - Icon */}
            <div className="flex-shrink-0 self-start md:self-auto">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                animate={isHovered ? { 
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                className="w-24 h-24 bg-gradient-to-br from-cosmic-purple/20 to-cosmic-cyan/20 rounded-2xl flex items-center justify-center text-5xl border border-cosmic-purple/30 relative overflow-hidden"
                style={{ transform: 'translateZ(40px)' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/10 to-cosmic-cyan/10"
                  animate={isHovered ? { 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  } : {}}
                  transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                />
                <span className="relative z-10">{publication.icon}</span>
              </motion.div>
            </div>

            {/* Right Section - Content */}
            <div className="flex-grow space-y-4" style={{ transform: 'translateZ(30px)' }}>
              {/* Status Badge & Year */}
              <div className="flex flex-wrap items-center gap-3">
                <motion.span 
                  whileHover={{ scale: 1.05, x: 2 }}
                  className="px-4 py-1.5 bg-green-500/20 border border-green-500/40 rounded-full text-green-400 text-sm font-semibold flex items-center gap-2 backdrop-blur-sm"
                >
                  <FaBook size={12} />
                  {publication.status}
                </motion.span>
                <motion.span 
                  whileHover={{ scale: 1.05, x: 2 }}
                  className="px-4 py-1.5 bg-cosmic-blue/20 border border-cosmic-blue/40 rounded-full text-cosmic-cyan text-sm font-semibold flex items-center gap-2 backdrop-blur-sm"
                >
                  <FaCalendarAlt size={12} />
                  {publication.year}
                </motion.span>
              </div>

              {/* Title */}
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-white group-hover:text-cosmic-purple transition-colors leading-tight"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {publication.title}
              </motion.h3>

              {/* Conference */}
              <motion.p 
                className="text-cosmic-cyan font-semibold flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <FaExternalLinkAlt size={14} />
                {publication.conference}
              </motion.p>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed">
                {publication.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {publication.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1 bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-full text-cosmic-purple text-xs font-medium backdrop-blur-sm cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <motion.a
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  href={publication.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all relative overflow-hidden group/btn"
                  style={{ transform: 'translateZ(50px)' }}
                >
                  <motion.div
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    style={{ transform: 'skewX(-20deg)' }}
                  />
                  <FaFilePdf size={18} className="relative z-10 group-hover/btn:rotate-12 transition-transform" />
                  <span className="relative z-10">View Paper</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.2), transparent 70%)`,
          }}
        />
        
        {/* 3D depth layer */}
        <div className="absolute inset-2 border border-white/5 rounded-xl pointer-events-none" style={{ transform: 'translateZ(-10px)' }} />
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
      year: 'Present',
      description: 'Focused on climate prediction using supervised machine learning techniques and optimised feature engineering.',
      tags: ['Machine Learning', 'Time-Series', 'Regression', 'Weather Forecasting', 'Feature Engineering'],
      pdfLink: '/ML_Weather_Forecasting_Paper.pdf',
      gradient: 'from-blue-500 to-teal-500',
      icon: '🌦️'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="publications" className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          {/* Decorative glass orb */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-cosmic-blue/20 to-teal-500/20 rounded-full blur-3xl"
          />
          
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 relative z-10"
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="bg-gradient-to-r from-cosmic-purple to-cosmic-cyan bg-clip-text text-transparent drop-shadow-lg">
              Publications
            </span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto backdrop-blur-sm bg-white/5 px-4 sm:px-6 py-2 sm:py-3 rounded-full inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Research contributions and academic publications
          </motion.p>
        </motion.div>

        {/* Publications List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {publications.map((publication, index) => (
            <PublicationCard key={index} publication={publication} index={index} />
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="inline-block relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl hover:shadow-cosmic-cyan/30 overflow-hidden"
            style={{
              boxShadow: '0 8px 32px 0 rgba(6, 182, 212, 0.2)',
            }}
          >
            {/* Animated background */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))',
                backgroundSize: '200% 200%',
              }}
            />
            <p className="text-gray-300 text-lg mb-6 relative z-10 font-medium">
              More research publications coming soon...
            </p>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-5xl relative z-10 filter drop-shadow-lg"
            >
              📚 🔬 🎓
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Publications
