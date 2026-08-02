import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaPython, FaGitAlt, FaGithub, FaJava, FaDatabase,
} from 'react-icons/fa'
import {
  SiTailwindcss, SiExpress, SiMongodb, SiSocketdotio,
  SiFirebase, SiMysql, SiTypescript, SiPostman,
  SiGooglecloud, SiTensorflow, SiScikitlearn, SiJupyter,
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'

const SectionBadge = ({ children }) => (
  <div className="section-header-badge">
    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
    {children}
  </div>
)

const skillCategories = [
  {
    id: 'languages',
    label: 'Languages',
    color: '#6C63FF',
    skills: [
      { name: 'Java',       icon: FaJava,    color: '#007396', level: 85 },
      { name: 'Python',     icon: FaPython,  color: '#3776AB', level: 82 },
      { name: 'JavaScript', icon: FaJs,      color: '#F7DF1E', level: 90 },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 70 },
      { name: 'C',          icon: FaDatabase,color: '#A8B9CC', level: 75 },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#00D4FF',
    skills: [
      { name: 'HTML5',       icon: FaHtml5,       color: '#E34F26', level: 95 },
      { name: 'CSS3',        icon: FaCss3Alt,      color: '#1572B6', level: 88 },
      { name: 'React',       icon: FaReact,        color: '#61DAFB', level: 92 },
      { name: 'React Native',icon: FaReact,        color: '#61DAFB', level: 80 },
      { name: 'Tailwind',    icon: SiTailwindcss,  color: '#06B6D4', level: 88 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & DB',
    color: '#10B981',
    skills: [
      { name: 'Node.js',    icon: FaNodeJs,       color: '#339933', level: 88 },
      { name: 'Express.js', icon: SiExpress,       color: '#AAAAAA', level: 85 },
      { name: 'MongoDB',    icon: SiMongodb,       color: '#47A248', level: 82 },
      { name: 'MySQL',      icon: SiMysql,         color: '#4479A1', level: 78 },
      { name: 'Firebase',   icon: SiFirebase,      color: '#FFCA28', level: 80 },
      { name: 'REST APIs',  icon: TbApi,           color: '#8b5cf6', level: 90 },
      { name: 'WebSocket',  icon: SiSocketdotio,   color: '#25c2a0', level: 75 },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Cloud',
    color: '#F59E0B',
    skills: [
      { name: 'Machine Learning', icon: SiScikitlearn, color: '#F7931E', level: 78 },
      { name: 'NLP',              icon: FaPython,       color: '#3776AB', level: 75 },
      { name: 'TensorFlow',       icon: SiTensorflow,   color: '#FF6F00', level: 70 },
      { name: 'Google Cloud',     icon: SiGooglecloud,  color: '#4285F4', level: 72 },
      { name: 'Jupyter',          icon: SiJupyter,      color: '#F37626', level: 80 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    color: '#FF6584',
    skills: [
      { name: 'Git',     icon: FaGitAlt,   color: '#F05032', level: 88 },
      { name: 'GitHub',  icon: FaGithub,   color: '#a78bfa', level: 88 },
      { name: 'Postman', icon: SiPostman,  color: '#FF6C37', level: 82 },
    ],
  },
]

// Circular SVG progress ring
const CircleProgress = ({ level, color, size = 80, stroke = 6 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (inView ? (level / 100) * circ : circ)

  return (
    <svg ref={ref} width={size} height={size} className="skill-ring">
      <circle className="skill-ring-track" cx={size/2} cy={size/2} r={r} strokeWidth={stroke} />
      <circle
        className="skill-ring-fill"
        cx={size/2} cy={size/2} r={r}
        strokeWidth={stroke}
        stroke={color}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
      />
    </svg>
  )
}

const SkillCard = ({ skill, catColor, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-card rounded-2xl p-4 flex flex-col items-center gap-2 text-center hover:border-[var(--color-border-light)] transition-all duration-300 premium-card"
    >
      {/* Progress ring */}
      <div className="relative">
        <CircleProgress level={skill.level} color={skill.color} size={64} stroke={5} />
        <div className="absolute inset-0 flex items-center justify-center">
          <skill.icon size={18} style={{ color: skill.color }} />
        </div>
      </div>
      <div>
        <div className="text-xs font-semibold text-[var(--color-heading)]">{skill.name}</div>
        <div className="text-[10px] font-mono mt-0.5" style={{ color: catColor }}>{skill.level}%</div>
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const [activeTab, setActiveTab] = useState('languages')
  const activeCategory = skillCategories.find(c => c.id === activeTab)

  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 bottom-1/3 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <SectionBadge>Tech Stack</SectionBadge>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[var(--color-heading)]">
            Skills & Expertise
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            Technologies and tools I use to transform ideas into production-ready software.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === cat.id ? 'shadow-glow-sm' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
              style={activeTab === cat.id ? {
                background: cat.color + '20',
                border: `1px solid ${cat.color}40`,
                color: cat.color,
              } : {
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--color-border)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4"
        >
          {activeCategory?.skills.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              catColor={activeCategory.color}
              delay={i * 0.06}
            />
          ))}
        </motion.div>

        {/* All skills overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 glass-card rounded-3xl p-8"
        >
          <h3 className="text-lg font-display font-bold text-[var(--color-heading)] mb-6 text-center">
            Full Technology Arsenal
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skillCategories.flatMap(cat =>
              cat.skills.map(skill => (
                <motion.div
                  key={skill.name + cat.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)' }}
                >
                  <skill.icon size={14} style={{ color: skill.color }} />
                  <span className="text-[var(--color-text)]">{skill.name}</span>
                </motion.div>
              ))
            )}
          </div>

          <p className="text-center text-sm text-[var(--color-muted)] mt-6 font-mono italic">
            Always learning — currently exploring WebAssembly, LangChain, and distributed systems.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
