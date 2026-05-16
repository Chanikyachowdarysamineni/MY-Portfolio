import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaPython, FaDatabase, FaGitAlt, FaGithub, FaJava,
  FaPaintBrush, FaServer, FaWrench, FaCode,
  FaBook, FaLaptopCode, FaRocket,
} from 'react-icons/fa'
import {
  SiTailwindcss, SiExpress, SiMongodb, SiSocketdotio,
  SiFirebase, SiMysql, SiTypescript, SiVite, SiNetlify, SiPostman,
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'

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

const SkillCard = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useSpring(useTransform(y, [-40, 40], [8, -8]), { stiffness: 300, damping: 25 })
  const rotY = useSpring(useTransform(x, [-40, 40], [-8, 8]), { stiffness: 300, damping: 25 })

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <motion.div
      variants={{
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: { type: 'spring', stiffness: 200, damping: 18 },
        },
      }}
      className="group relative"
      style={{ perspective: '600px' }}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setIsHovered(false) }}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.08, y: -6 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="relative rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: isHovered
            ? `0 16px 40px rgba(0,0,0,0.5), 0 0 30px ${skill.color}25`
            : '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.3s ease',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Color glow on hover */}
        <motion.div
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${skill.color}15 0%, transparent 60%)`,
          }}
        />

        {/* Conic gradient border on hover */}
        <motion.div
          animate={isHovered ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-[-1px] rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${skill.color}60, transparent, ${skill.color}40)`,
            zIndex: -1,
          }}
        />

        {/* Icon */}
        <motion.div
          animate={isHovered ? { scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="relative text-4xl sm:text-5xl"
          style={{ color: skill.color, transform: 'translateZ(20px)' }}
        >
          <skill.icon />
          {/* Icon bloom */}
          <motion.div
            animate={isHovered ? { opacity: 0.5, scale: 1.5 } : { opacity: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 blur-lg"
            style={{ color: skill.color }}
          >
            <skill.icon />
          </motion.div>
        </motion.div>

        {/* Name */}
        <p
          className="text-xs sm:text-sm font-semibold text-center transition-colors duration-200"
          style={{
            color: isHovered ? '#e2e8f0' : '#94a3b8',
            transform: 'translateZ(10px)',
          }}
        >
          {skill.name}
        </p>

        {/* Level indicator dots */}
        {skill.level && (
          <div className="flex gap-1" style={{ transform: 'translateZ(10px)' }}>
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                className="w-1 h-1 rounded-full transition-all duration-300"
                style={{
                  background: dot <= skill.level ? skill.color : 'rgba(255,255,255,0.12)',
                  boxShadow: dot <= skill.level && isHovered ? `0 0 6px ${skill.color}` : 'none',
                }}
              />
            ))}
          </div>
        )}

        {/* Shimmer sweep */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                transform: 'skewX(-20deg)',
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

const SkillCategory = ({ category, categoryIndex }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: categoryIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Category header */}
      <div className="flex items-center gap-4">
        <motion.div
          className={`h-px flex-grow bg-gradient-to-r ${category.color} opacity-40`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        />
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <category.icon size={16} style={{ color: '#a78bfa', flexShrink: 0 }} />
          <h3 className="text-sm sm:text-base font-bold text-white">{category.title}</h3>
        </div>
        <motion.div
          className={`h-px flex-grow bg-gradient-to-l ${category.color} opacity-40`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        />
      </div>

      {/* Skills grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        transition={{ staggerChildren: 0.06 }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4"
      >
        {category.skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} index={index} />
        ))}
      </motion.div>
    </motion.div>
  )
}

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: FaPaintBrush,
      color: 'from-violet-500 to-pink-500',
      skills: [
        { name: 'HTML5', icon: FaHtml5, color: '#E34F26', level: 5 },
        { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6', level: 5 },
        { name: 'JavaScript', icon: FaJs, color: '#F7DF1E', level: 4 },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 3 },
        { name: 'React', icon: FaReact, color: '#61DAFB', level: 5 },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 5 },
        { name: 'React Native', icon: FaReact, color: '#61DAFB', level: 3 },
      ],
    },
    {
      title: 'Backend & Database',
      icon: FaServer,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'Node.js', icon: FaNodeJs, color: '#339933', level: 4 },
        { name: 'Express.js', icon: SiExpress, color: '#AAAAAA', level: 4 },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248', level: 4 },
        { name: 'MySQL', icon: SiMysql, color: '#4479A1', level: 3 },
        { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', level: 4 },
        { name: 'Socket.io', icon: SiSocketdotio, color: '#25c2a0', level: 3 },
        { name: 'REST API', icon: TbApi, color: '#8b5cf6', level: 5 },
      ],
    },
    {
      title: 'Tools & DevOps',
      icon: FaWrench,
      color: 'from-emerald-500 to-teal-500',
      skills: [
        { name: 'Git', icon: FaGitAlt, color: '#F05032', level: 4 },
        { name: 'GitHub', icon: FaGithub, color: '#a78bfa', level: 4 },
        { name: 'Vite', icon: SiVite, color: '#646CFF', level: 4 },
        { name: 'Netlify', icon: SiNetlify, color: '#00C7B7', level: 4 },
        { name: 'Postman', icon: SiPostman, color: '#FF6C37', level: 4 },
      ],
    },
    {
      title: 'Programming Languages',
      icon: FaCode,
      color: 'from-amber-500 to-orange-500',
      skills: [
        { name: 'JavaScript', icon: FaJs, color: '#F7DF1E', level: 4 },
        { name: 'Python', icon: FaPython, color: '#3776AB', level: 4 },
        { name: 'Java', icon: FaJava, color: '#007396', level: 3 },
        { name: 'C', icon: FaDatabase, color: '#A8B9CC', level: 3 },
      ],
    },
  ]

  return (
    <section id="skills" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 70%, rgba(139,92,246,0.04) 0%, transparent 50%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="[ Tech Stack ]"
          title="Skills & Expertise"
          subtitle="Technologies and tools I use to transform ideas into production-ready software."
        />

        <div className="space-y-14">
          {skillCategories.map((category, index) => (
            <SkillCategory key={index} category={category} categoryIndex={index} />
          ))}
        </div>

        {/* Bottom CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <motion.div
            whileHover={{ y: -4 }}
            className="relative rounded-2xl p-8 text-center overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(139,92,246,0.07) 0%, rgba(6,182,212,0.05) 100%)',
              border: '1px solid rgba(139,92,246,0.15)',
            }}
          >
            <motion.div
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute inset-0 opacity-20"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.15), rgba(139,92,246,0.15))',
                backgroundSize: '200% 100%',
              }}
            />
            <div className="relative z-10 space-y-3">
              <p className="text-gray-300 text-base sm:text-lg font-medium">
                Always learning and exploring new technologies
              </p>
              <p className="text-gray-500 text-sm">
                Currently diving deeper into AI/ML, WebAssembly, and distributed systems
              </p>
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center justify-center gap-4 pt-1"
              >
                {[FaBook, FaLaptopCode, FaRocket].map((Icon, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                  >
                    <Icon size={20} style={{ color: i === 0 ? '#a78bfa' : i === 1 ? '#60a5fa' : '#22d3ee', opacity: 0.7 }} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

