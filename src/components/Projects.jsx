import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import {
  FaGithub, FaExternalLinkAlt, FaArrowRight,
  FaCalendarAlt, FaShieldAlt, FaTerminal, FaLayerGroup, FaBolt, FaClipboardList,
} from 'react-icons/fa'
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
          backgroundSize: '200% 200%',
          animation: 'gradientXY 4s ease infinite',
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

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useSpring(useTransform(y, [-80, 80], [6, -6]), { stiffness: 200, damping: 25 })
  const rotY = useSpring(useTransform(x, [-80, 80], [-6, 6]), { stiffness: 200, damping: 25 })

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <motion.div
      variants={{
        hidden: { y: 40, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="group relative"
      style={{ perspective: '1000px' }}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setIsHovered(false) }}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className="relative rounded-2xl overflow-hidden h-full"
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: isHovered
            ? '0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(201,173,167,0.12)'
            : '0 8px 32px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.3s ease',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Top gradient bar */}
        <motion.div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${project.gradient}`}
          animate={isHovered ? { opacity: [0.7, 1, 0.7] } : { opacity: 0.6 }}
        />

        {/* Hover glow top */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(180deg, ${project.glowColor || 'rgba(201,173,167,0.08)'} 0%, transparent 100%)`,
          }}
        />

        {/* Shimmer on hover */}
        {isHovered && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
              transform: 'skewX(-15deg)',
              zIndex: 1,
            }}
          />
        )}

        <div className="relative p-6 flex flex-col h-full" style={{ transform: 'translateZ(15px)' }}>
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            {/* Project number */}
            <span
              className="text-xs font-mono font-bold px-2 py-1 rounded-md"
              style={{
                color: '#8b5cf6',
                background: 'rgba(139,92,246,0.1)',
                border: '1px solid rgba(139,92,246,0.2)',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Floating icon */}
            <motion.div
              animate={{ y: [0, -5, 0], rotate: isHovered ? [0, 10, 0] : 0 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="opacity-60 group-hover:opacity-100 transition-opacity"
            >
              <project.emoji size={22} />
            </motion.div>
          </div>

          {/* Title */}
          <motion.h3
            className="text-xl font-bold text-white mb-3 group-hover:text-transparent transition-all duration-300"
            style={
              isHovered
                ? {
                    background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }
                : {}
            }
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-grow">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 + i * 0.04 }}
                whileHover={{ scale: 1.08, y: -1 }}
                className="tech-tag"
                style={{ transform: 'translateZ(8px)' }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-2 mt-auto" style={{ transform: 'translateZ(25px)' }}>
            {project.github && (
              <motion.a
                whileHover={{ scale: 1.04, x: -2 }}
                whileTap={{ scale: 0.96 }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-white transition-all relative overflow-hidden group/btn"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100"
                  initial={false}
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                />
                <FaGithub size={13} className="relative z-10" />
                <span className="relative z-10">Code</span>
              </motion.a>
            )}
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white relative overflow-hidden group/btn`}
              style={{
                background: `linear-gradient(135deg, ${project.btnGradient || '#7c3aed, #2563eb'})`,
                boxShadow: '0 4px 15px rgba(139,92,246,0.25)',
              }}
            >
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', transform: 'skewX(-15deg)' }}
              />
              <FaExternalLinkAlt size={11} className="relative z-10" />
              <span className="relative z-10">Live Demo</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Projects = () => {
  const projects = [
    {
      title: 'Mahotsav Website',
      description: 'A full-featured event management platform for college festivals with real-time ticketing, attendee management, and live event dashboards powered by Socket.io.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Socket.io', 'Firebase'],
      gradient: 'from-violet-500 to-pink-500',
      glowColor: 'rgba(139,92,246,0.1)',
      btnGradient: '#7c3aed, #a21caf',
      emoji: FaCalendarAlt,
      github: 'https://github.com/Chanikyachowdarysamineni/Mahotsav-Website.git',
      live: 'https://vignanmahotsav.in/',
    },
    {
      title: 'Safe Chat AI',
      description: 'An AI-powered chat platform with real-time messaging, content moderation, and smart reply suggestions. Built with Firebase for instant sync across devices.',
      tags: ['React', 'AI', 'Tailwind CSS', 'Firebase', 'Real-time'],
      gradient: 'from-cyan-500 to-blue-500',
      glowColor: 'rgba(6,182,212,0.1)',
      btnGradient: '#0891b2, #1d4ed8',
      emoji: FaShieldAlt,
      github: 'https://github.com/Chanikyachowdarysamineni/Safe-Chat-AI.git',
      live: 'https://safe-chat-ai.netlify.app/',
    },
    {
      title: 'VCODE',
      description: 'An online code editor built specifically for CS students with syntax highlighting, live preview, and a curated collection of programming exercises.',
      tags: ['React', 'Code Editor', 'Monaco', 'Web Dev', 'CSE'],
      gradient: 'from-orange-500 to-red-500',
      glowColor: 'rgba(249,115,22,0.1)',
      btnGradient: '#c2410c, #b91c1c',
      emoji: FaTerminal,
      github: 'https://github.com/Chanikyachowdarysamineni/VCODE-CSE.git',
      live: 'https://vcode-cse-1.onrender.com/',
    },
    {
      title: 'CSE-HUB',
      description: 'A comprehensive student hub for CS department featuring real-time notifications, resource sharing, event tracking, and academic dashboard.',
      tags: ['React', 'Dashboard', 'Notifications', 'Real-time', 'UI/UX'],
      gradient: 'from-emerald-500 to-teal-500',
      glowColor: 'rgba(16,185,129,0.1)',
      btnGradient: '#059669, #0f766e',
      emoji: FaLayerGroup,
      github: 'https://github.com/Chanikyachowdarysamineni/CSE-HUB.git',
      live: 'https://github.com/Chanikyachowdarysamineni/CSE-HUB.git',
    },
    {
      title: 'Electricity Inventory Management',
      description: 'A MERN stack inventory management system for electrical components with stock tracking, analytics dashboards, and automated low-stock alerts.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Dashboard'],
      gradient: 'from-yellow-500 to-orange-500',
      glowColor: 'rgba(245,158,11,0.1)',
      btnGradient: '#b45309, #c2410c',
      emoji: FaBolt,
      live: 'https://electricity-inventory-management-ivm.onrender.com',
    },
    {
      title: 'Faculty Workload Management',
      description: 'A comprehensive workload management system for faculty members to track assignments, manage schedules, and optimize teaching load distribution with analytics.',
      tags: ['Faculty Management', 'Workload Tracking', 'Dashboard', 'Analytics', 'Administration'],
      gradient: 'from-indigo-500 to-purple-500',
      glowColor: 'rgba(99,102,241,0.1)',
      btnGradient: '#4f46e5, #7c3aed',
      emoji: FaClipboardList,
      github: 'https://github.com/Chanikyachowdarysamineni',
      live: 'https://160.187.169.41/csefaculty/',
    },
    {
      title: 'CoCreateX',
      description: 'A collaborative platform designed for creative teams to co-create, share, and manage projects in real-time with seamless collaboration tools and intuitive workflows.',
      tags: ['React', 'Collaboration', 'Real-time', 'UI/UX', 'Creative Platform'],
      gradient: 'from-pink-500 to-rose-500',
      glowColor: 'rgba(236,72,153,0.1)',
      btnGradient: '#be123c, #9f1239',
      emoji: FaLayerGroup,
      github: 'https://github.com/Chanikyachowdarysamineni',
      live: 'https://cocreatez-frontend.onrender.com',
    },
  ]

  return (
    <section id="projects" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 relative">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(139,92,246,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="[ Featured Projects ]"
          title="Things I've Built"
          subtitle="A curated selection of projects that showcase my skills and passion for building impactful software."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="https://github.com/Chanikyachowdarysamineni"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold text-sm relative overflow-hidden group"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(139,92,246,0.3)',
              color: '#a78bfa',
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'rgba(139,92,246,0.07)' }}
            />
            <FaGithub size={16} className="relative z-10" />
            <span className="relative z-10">View All Projects on GitHub</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              <FaArrowRight size={12} />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
