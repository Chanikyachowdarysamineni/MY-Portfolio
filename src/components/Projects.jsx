import { motion, useMotionValue, useTransform } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { useState } from 'react'

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [15, -15])
  const rotateY = useTransform(x, [-100, 100], [-15, 15])

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
        y: -15,
        transition: { duration: 0.3 }
      }}
      className="group relative"
      style={{ perspective: '1000px' }}
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
        {/* Animated gradient border */}
        <motion.div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`}
          animate={isHovered ? { scaleX: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
        />

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          animate={isHovered ? { x: ['-100%', '100%'] } : {}}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            transform: 'skewX(-20deg)',
          }}
        />

        {/* Content */}
        <div className="p-6 relative" style={{ transform: 'translateZ(20px)' }}>
          {/* Title with icon */}
          <div className="flex items-start justify-between mb-4">
            <motion.h3
              className="text-xl font-bold text-white group-hover:text-cosmic-purple transition-colors flex-1"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              {project.title}
            </motion.h3>
            
            {/* Floating indicator */}
            <motion.div
              animate={{
                y: [0, -5, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity"
            >
              🚀
            </motion.div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1.5 bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-full text-cosmic-purple text-xs font-medium backdrop-blur-sm hover:bg-cosmic-purple/20 hover:border-cosmic-purple/50 transition-all cursor-default"
                style={{ transform: 'translateZ(10px)' }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3" style={{ transform: 'translateZ(30px)' }}>
            <motion.a
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/80 hover:bg-gray-700 text-white rounded-xl transition-all backdrop-blur-sm text-sm font-medium group/btn relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <FaGithub className="group-hover/btn:rotate-12 transition-transform" />
              <span>GitHub</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, x: 3 }}
              whileTap={{ scale: 0.95 }}
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white rounded-xl hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all text-sm font-medium relative overflow-hidden group/btn"
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
              <FaExternalLinkAlt className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform relative z-10" />
              <span className="relative z-10">Live Demo</span>
            </motion.a>
          </div>
        </div>

        {/* Hover gradient glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.2), transparent 70%)`,
          }}
        />

        {/* 3D depth layers */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute inset-2 border border-white/5 rounded-xl"
            style={{ transform: 'translateZ(-10px)' }}
          />
          <motion.div
            className="absolute inset-4 border border-white/5 rounded-lg"
            style={{ transform: 'translateZ(-20px)' }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

const Projects = () => {
  const projects = [
    {
      title: 'Mahotsav Website',
      tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Socket.io', 'Firebase'],
      gradient: 'from-purple-500 to-pink-500',
      github: 'https://github.com/Chanikyachowdarysamineni/Mahotsav-Website.git',
      live: 'https://vignanmahotsav.in/'
    },
    {
      title: 'Safe Chat AI',
      tags: ['React', 'AI', 'Tailwind CSS', 'Firebase', 'Real-time Chat'],
      gradient: 'from-cyan-500 to-blue-500',
      github: 'https://github.com/Chanikyachowdarysamineni/Safe-Chat-AI.git',
      live: 'https://safe-chat-ai.netlify.app/'
    },
    {
      title: 'VCODE',
      tags: ['React', 'Code Editor', 'Web Development', 'CSE'],
      gradient: 'from-orange-500 to-red-500',
      github: 'https://github.com/Chanikyachowdarysamineni/VCODE-CSE.git',
      live: 'https://vcode-cse-1.onrender.com/'
    },
    {
      title: 'CSE-HUB',
      tags: ['React', 'Dashboard', 'Notifications', 'Real-time'],
      gradient: 'from-green-500 to-teal-500',
      github: 'https://github.com/Chanikyachowdarysamineni/CSE-HUB.git',
      live: 'https://github.com/Chanikyachowdarysamineni/CSE-HUB.git'
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
    <section id="projects" className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
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
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-cosmic-purple/20 to-cosmic-cyan/20 rounded-full blur-3xl"
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
              Featured Projects
            </span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto backdrop-blur-sm bg-white/5 px-4 sm:px-6 py-2 sm:py-3 rounded-full inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Showcasing my recent work and creative solutions
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>

        {/* View More with enhanced button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <motion.a
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/Chanikyachowdarysamineni"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 border-2 border-cosmic-purple text-cosmic-purple rounded-full font-semibold hover:bg-cosmic-purple/10 transition-all relative overflow-hidden group backdrop-blur-sm"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cosmic-purple/20 to-cosmic-cyan/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">View All Projects on GitHub</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
