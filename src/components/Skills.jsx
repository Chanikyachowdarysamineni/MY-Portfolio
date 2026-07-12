import { motion } from 'framer-motion'
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
  <div className="text-center mb-24 space-y-4">
    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-ink)] text-[var(--color-bone)]">
      {badge}
    </div>
    <h2 className="text-5xl sm:text-6xl font-display font-bold tracking-tight text-[var(--color-heading)]">
      {title}
    </h2>
    <p className="text-[var(--color-muted)] text-lg sm:text-xl max-w-2xl mx-auto font-medium">
      {subtitle}
    </p>
  </div>
)

const SkillCategoryCard = ({ category, index }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 hover:shadow-soft-xl hover:border-[var(--color-primary)]/30 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)]">
          <category.icon size={20} />
        </div>
        <h3 className="text-xl font-bold text-[var(--color-heading)]">
          {category.title}
        </h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, i) => (
          <div
            key={i}
            className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-colors"
          >
            <skill.icon
              size={16}
              style={{ color: skill.color }}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-sm font-medium text-[var(--color-body)] group-hover:text-[var(--color-heading)] transition-colors">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: FaPaintBrush,
      skills: [
        { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
        { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'React', icon: FaReact, color: '#61DAFB' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'React Native', icon: FaReact, color: '#61DAFB' },
      ],
    },
    {
      title: 'Backend & Database',
      icon: FaServer,
      skills: [
        { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
        { name: 'Express.js', icon: SiExpress, color: '#AAAAAA' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
        { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
        { name: 'Socket.io', icon: SiSocketdotio, color: '#25c2a0' },
        { name: 'REST API', icon: TbApi, color: '#8b5cf6' },
      ],
    },
    {
      title: 'Tools & DevOps',
      icon: FaWrench,
      skills: [
        { name: 'Git', icon: FaGitAlt, color: '#F05032' },
        { name: 'GitHub', icon: FaGithub, color: '#a78bfa' },
        { name: 'Vite', icon: SiVite, color: '#646CFF' },
        { name: 'Netlify', icon: SiNetlify, color: '#00C7B7' },
        { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      ],
    },
    {
      title: 'Programming Languages',
      icon: FaCode,
      skills: [
        { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
        { name: 'Python', icon: FaPython, color: '#3776AB' },
        { name: 'Java', icon: FaJava, color: '#007396' },
        { name: 'C', icon: FaDatabase, color: '#A8B9CC' },
      ],
    },
  ]

  return (
    <section id="skills" className="min-h-screen py-32 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Tech Stack"
          title="Skills & Expertise"
          subtitle="Technologies and tools I use to transform ideas into production-ready software."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard key={index} category={category} index={index} />
          ))}
        </div>

        {/* Bottom CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-16"
        >
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 text-center shadow-soft">
            <h4 className="text-xl font-semibold text-[var(--color-heading)] mb-2">
              Always learning and exploring
            </h4>
            <p className="text-[var(--color-muted)] max-w-lg mx-auto">
              Currently diving deeper into AI/ML, WebAssembly, and distributed systems architecture.
            </p>
            <div className="flex justify-center gap-6 mt-6">
              <FaBook size={20} className="text-[var(--color-muted)]" />
              <FaLaptopCode size={20} className="text-[var(--color-muted)]" />
              <FaRocket size={20} className="text-[var(--color-muted)]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

