import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaArrowRight, FaRocket, FaCode, FaCertificate, FaTrophy, FaChevronRight } from 'react-icons/fa'

const SectionBadge = ({ children }) => (
  <div className="section-header-badge">
    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
    {children}
  </div>
)

const AnimatedCounter = ({ end, suffix = '', prefix = '', label, sublabel, color, icon: Icon }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    let startTime = null
    requestAnimationFrame(step)
  }, [inView, end])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-card rounded-2xl p-6 text-center overflow-hidden premium-card"
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(circle at center, ${color}08, transparent)` }} />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
          style={{ background: color + '15', border: `1px solid ${color}30` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <div className="text-4xl lg:text-5xl font-display font-bold mb-1 counter-number"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}80)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {prefix}{count}{suffix}
        </div>
        <div className="text-sm font-semibold text-[var(--color-heading)] mb-0.5">{label}</div>
        <div className="text-xs text-[var(--color-muted)]">{sublabel}</div>
      </div>
    </motion.div>
  )
}

const roadmapSteps = [
  { year: '2023', label: 'Started CS Journey', desc: "B.Tech at VFSTR (Vignan's University)", color: '#6C63FF', done: true },
  { year: '2024', label: 'IEEE Published + ML Win', desc: 'Research & Hackathon', color: '#00D4FF', done: true },
  { year: '2025', label: 'Vice President & Ambassador', desc: 'Executive Board Leadership', color: '#10B981', done: true },
  { year: '2026', label: 'Web Dev & Full Stack', desc: 'State Meets & Products', color: '#F59E0B', done: true },
  { year: '2027', label: 'Graduating B.Tech CSE', desc: '7th Sem — Seeking MNC Role', color: '#FF6584', done: false },
]

const recruiterPoints = [
  {
    title: 'Ship Fast, Ship Right',
    detail: 'Built 10+ production-ready applications with focus on clean architecture and scalable code.',
    color: '#6C63FF',
    icon: '🚀',
  },
  {
    title: 'Full-Stack Versatility',
    detail: 'Comfortable across the entire stack — from pixel-perfect UIs to database schemas and API design.',
    color: '#00D4FF',
    icon: '⚡',
  },
  {
    title: 'AI/ML Integration Ready',
    detail: 'Built real-world NLP systems and ML pipelines. Published IEEE research on ML applications.',
    color: '#10B981',
    icon: '🧠',
  },
  {
    title: 'Proven Under Pressure',
    detail: 'Won hackathons, managed high-traffic festival platforms with zero downtime, delivered on deadlines.',
    color: '#F59E0B',
    icon: '🏆',
  },
  {
    title: 'Continuous Learner',
    detail: 'Earned certifications in Google Cloud, SAP, and HackerRank while maintaining strong academic performance.',
    color: '#FF6584',
    icon: '📚',
  },
  {
    title: 'Team Player & Leader',
    detail: 'Led development teams, mentored peers, and built platforms serving 500+ concurrent students.',
    color: '#6C63FF',
    icon: '👥',
  },
]

const WhyHireMe = () => {
  return (
    <section id="whyhireme" className="section-padding relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(108,99,255,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <SectionBadge>Recruiter Brief</SectionBadge>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[var(--color-heading)]">
            Why Hire{' '}
            <span style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Me?
            </span>
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            Not just skills — measurable impact, proven delivery, and the mindset to grow at scale.
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          <AnimatedCounter end={10} suffix="+"  label="Projects Shipped"  sublabel="Production-ready"   color="#6C63FF" icon={FaRocket} />
          <AnimatedCounter end={6}  suffix="+"  label="Certifications"    sublabel="Industry recognized" color="#F59E0B" icon={FaCertificate} />
          <AnimatedCounter end={20} suffix="+"  label="Tech Mastered"     sublabel="Languages & Frameworks" color="#00D4FF" icon={FaCode} />
          <AnimatedCounter end={1}  suffix=""   label="IEEE Publication"  sublabel="Peer-reviewed research" color="#10B981" icon={FaTrophy} />
        </div>

        {/* Value Props */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl font-display font-bold text-[var(--color-heading)] text-center mb-10">
            The Value I Bring
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recruiterPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-5 group premium-card"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{point.icon}</span>
                  <div>
                    <h4 className="font-display font-semibold text-[var(--color-heading)] mb-1 text-sm">{point.title}</h4>
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed">{point.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Career Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl font-display font-bold text-[var(--color-heading)] text-center mb-10">
            Career Roadmap
          </h3>
          <div className="relative">
            {/* Line */}
            <div className="absolute top-6 left-0 right-0 h-px hidden sm:block"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.3) 20%, rgba(108,99,255,0.3) 80%, transparent)' }} />
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {roadmapSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center relative"
                >
                  {/* Dot */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 relative z-10"
                    style={{
                      background: step.done ? step.color + '20' : 'rgba(255,255,255,0.03)',
                      border: step.done ? `2px solid ${step.color}50` : '2px dashed rgba(255,255,255,0.1)',
                      boxShadow: step.done ? `0 0 16px ${step.color}30` : 'none',
                    }}>
                    {step.done ? (
                      <span className="text-sm font-bold font-mono" style={{ color: step.color }}>✓</span>
                    ) : (
                      <span className="text-sm">🎯</span>
                    )}
                  </div>
                  <div className="text-[10px] font-mono font-bold mb-1" style={{ color: step.color }}>{step.year}</div>
                  <div className="text-xs font-semibold text-[var(--color-heading)] mb-0.5">{step.label}</div>
                  <div className="text-[10px] text-[var(--color-muted)]">{step.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recruiter Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-8 sm:p-12 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,212,255,0.06), rgba(16,185,129,0.05))',
            border: '1px solid rgba(108,99,255,0.2)',
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 rounded-br-full opacity-20"
            style={{ background: 'linear-gradient(135deg, #6C63FF, transparent)' }} />
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-20"
            style={{ background: 'linear-gradient(315deg, #00D4FF, transparent)' }} />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6"
              style={{ background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)', color: '#6C63FF' }}>
              📌 Recruiter Summary
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-heading)] mb-4">
              The Story in One Paragraph
            </h3>
            <p className="text-[var(--color-muted)] leading-relaxed mb-8 text-base sm:text-lg">
              I'm a Computer Science graduate who doesn't just write code — I{' '}
              <span className="text-[var(--color-text)] font-medium">architect solutions, ship products, and drive impact</span>.
              From building AI-powered chat systems and publishing IEEE research to winning hackathons and managing platforms
              with thousands of users — every project I touch becomes{' '}
              <span className="text-[var(--color-primary)] font-semibold">measurably better</span>.
              I bring full-stack versatility, ML/AI capability, and an obsession with user experience that will make your team
              <span className="text-[var(--color-text)] font-medium"> ship better products faster</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:chanikyachowdary86@gmail.com"
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all hover:-translate-y-1 hover:shadow-glow"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}
              >
                Let's Talk <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
              </a>
              <a
                href="/Resume_CCS.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[var(--color-text)] transition-all hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyHireMe
