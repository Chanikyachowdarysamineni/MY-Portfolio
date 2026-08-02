import { motion } from 'framer-motion'
import { FaBriefcase, FaFlask, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const SectionBadge = ({ children }) => (
  <div className="section-header-badge">
    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
    {children}
  </div>
)

const experiences = [
  {
    type: 'internship',
    title: 'Web Development Intern',
    company: 'Industry Experience',
    location: 'India',
    period: '2024',
    duration: '3 months',
    description: 'Developed and maintained responsive web applications using the MERN stack. Collaborated with senior developers on real-world projects and gained hands-on experience with REST APIs, database design, and deployment pipelines.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Git'],
    achievements: ['Built 3 production features', 'Reduced API response time by 30%', 'Mentored peers on clean code practices'],
    icon: FaBriefcase,
    color: '#6C63FF',
    gradient: 'from-[#6C63FF] to-[#00D4FF]',
  },
  {
    type: 'research',
    title: 'Research Publication Author',
    company: 'IEEE International Conference',
    location: 'Academic',
    period: '2025',
    duration: 'Research Project',
    description: 'Authored and published peer-reviewed research paper "Harnessing Machine Learning for Intelligent Weather Forecasting: From Data-Driven Models to Predictive Accuracy" at an IEEE conference.',
    tech: ['Python', 'LSTM Neural Networks', 'Machine Learning', 'Data Analysis', 'IEEE Research'],
    achievements: ['IEEE Xplore Published (Doc ID: 11324360)', 'Compared 5+ ML model architectures', 'Achieved 94%+ forecast accuracy'],
    icon: FaFlask,
    color: '#F59E0B',
    gradient: 'from-[#F59E0B] to-[#FF6584]',
  },
]

const typeColors = {
  internship: { bg: 'rgba(108,99,255,0.1)', border: 'rgba(108,99,255,0.2)', text: '#6C63FF', label: 'Internship' },
  research:   { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', text: '#F59E0B', label: 'Research' },
}

const Experience = () => {
  return (
    <section id="experience" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/3 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <SectionBadge>Experience</SectionBadge>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[var(--color-heading)]">
            Professional Experience
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            Web development internship and peer-reviewed IEEE research publication.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[21px] top-0 bottom-0 w-px hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(108,99,255,0.4) 10%, rgba(108,99,255,0.4) 90%, transparent)' }} />

          <div className="space-y-8">
            {experiences.map((exp, i) => {
              const typeStyle = typeColors[exp.type] || typeColors.internship
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-6"
                >
                  {/* Dot */}
                  <div className="relative shrink-0 hidden sm:flex flex-col items-center">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center z-10 mt-4"
                      style={{ background: exp.color + '15', border: `1px solid ${exp.color}30` }}>
                      <exp.icon size={18} style={{ color: exp.color }} />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 group">
                    <div className="glass-card rounded-2xl p-6 transition-all duration-300 premium-card">
                      {/* Top row */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                              style={{ background: typeStyle.bg, border: `1px solid ${typeStyle.border}`, color: typeStyle.text }}>
                              {typeStyle.label}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-display font-bold text-[var(--color-heading)] mt-1">{exp.title}</h3>
                          <p className="text-sm font-semibold mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 text-xs text-[var(--color-muted)]">
                          <div className="flex items-center gap-1.5">
                            <FaClock size={11} />
                            <span className="font-mono">{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FaMapMarkerAlt size={11} />
                            <span>{exp.location}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full font-mono"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)' }}>
                            {exp.duration}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">{exp.description}</p>

                      {/* Achievements */}
                      <div className="mb-4 space-y-1.5">
                        {exp.achievements.map((ach, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-[var(--color-text)]">
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: exp.color }} />
                            {ach}
                          </div>
                        ))}
                      </div>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((t, j) => (
                          <span key={j} className="px-2.5 py-1 rounded-lg text-xs font-medium text-[var(--color-muted)]"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
