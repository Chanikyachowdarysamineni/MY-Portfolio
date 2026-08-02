import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaGraduationCap, FaCode, FaHeart, FaLightbulb, FaRocket, FaUserTie } from 'react-icons/fa'

const SectionBadge = ({ children }) => (
  <div className="section-header-badge">
    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
    {children}
  </div>
)

const AnimatedCounter = ({ end, label, suffix = '', prefix = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    let startTime = null
    requestAnimationFrame(step)
  }, [inView, end])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-4xl font-display font-bold mb-1" style={{
        background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm text-[var(--color-muted)] font-medium">{label}</div>
    </motion.div>
  )
}

const timelineEvents = [
  {
    year: '2023',
    title: 'Joined B.Tech Computer Science',
    org: "Vignan's Foundation for Science, Technology & Research (Vignan's University)",
    description: 'Began B.Tech CSE degree with a focus on data structures, algorithms, and full-stack web engineering.',
    icon: FaGraduationCap,
    color: '#6C63FF',
  },
  {
    year: '2024',
    title: 'Joint Secretary — Alumni Linkages Club',
    org: 'VFSTR Student Executive Council',
    description: 'Served as Joint Secretary, managing student-alumni communications and on-campus alumni engagement initiatives.',
    icon: FaUserTie,
    color: '#00D4FF',
  },
  {
    year: '2025',
    title: 'IEEE Publication, Vice President & CSE Department Ambassador',
    org: 'IEEE Xplore, VFSTR Board & CSE Dept',
    description: 'Published peer-reviewed IEEE research paper on ML Weather Forecasting, elevated to Vice President, and selected as 1 of 12 CSE Department Ambassadors.',
    icon: FaLightbulb,
    color: '#F59E0B',
  },
  {
    year: '2026',
    title: 'Web Dev Internship & State Chapter Alumni Meets',
    org: 'Industry Experience & University Leadership',
    description: 'Engineered MERN applications during web development internship and organized state chapter alumni meets in Telangana and Karnataka.',
    icon: FaRocket,
    color: '#10B981',
  },
  {
    year: '2027',
    title: 'Graduating B.Tech CSE (Currently in 7th Semester)',
    org: 'Seeking Full-Time Opportunities',
    description: 'Completing B.Tech degree in 2027; currently in 7th semester and actively seeking full-time Software Engineer / Full Stack roles.',
    icon: FaGraduationCap,
    color: '#FF6584',
  },
]

const values = [
  { icon: FaCode,       title: 'Clean Code',       desc: 'Writing readable, maintainable, and well-documented code.' },
  { icon: FaRocket,     title: 'Impact First',      desc: 'Every line of code should solve a real problem and create value.' },
  { icon: FaLightbulb,  title: 'Continuous Learning',desc: 'Staying ahead by constantly learning emerging technologies.' },
  { icon: FaHeart,      title: 'User-Centric',      desc: 'Building experiences users love with empathy and attention to detail.' },
]

const About = () => {
  return (
    <section id="about" className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <SectionBadge>About Me</SectionBadge>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[var(--color-heading)]">
            The Story So Far
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            A passionate developer on a mission to build software that matters.
          </p>
        </motion.div>

        {/* Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl p-8 mb-16"
        >
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-lg text-[var(--color-text)] leading-relaxed">
                I'm a <span className="text-[var(--color-primary)] font-semibold">Computer Science undergraduate (2023–2027, currently in 7th semester)</span> at
                Vignan's Foundation for Science, Technology & Research (Vignan's University), specializing in full-stack web engineering,
                mobile apps, and AI-powered systems.
              </p>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Recognized as a <span className="text-[var(--color-text)] font-medium">CSE Department Ambassador</span> and serving as
                <span className="text-[var(--color-text)] font-medium"> Vice President of the Alumni Linkages Club</span>, I combine engineering execution
                with active institutional leadership.
              </p>
              <p className="text-[var(--color-muted)] leading-relaxed">
                My approach: understand the problem deeply, architect elegantly, and deliver with pixel-perfect attention to detail.
                I'm seeking full-time opportunities at top MNCs to ship high-impact software.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Location', value: 'India 🇮🇳' },
                { label: 'Education', value: 'B.Tech CSE (2023–27)' },
                { label: 'Semester', value: '7th Semester' },
                { label: 'Focus', value: 'Full Stack + AI/ML' },
                { label: 'Status', value: '🟢 Open to work' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-xs text-[var(--color-muted)] w-24 shrink-0 font-mono uppercase tracking-wider">{label}</span>
                  <span className="text-sm text-[var(--color-text)] font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20 p-8 rounded-3xl"
          style={{ background: 'rgba(108,99,255,0.05)', border: '1px solid rgba(108,99,255,0.12)' }}>
          <AnimatedCounter end={10}  suffix="+" label="Projects Built" />
          <AnimatedCounter end={6}   suffix="+" label="Certifications" />
          <AnimatedCounter end={20}  suffix="+" label="Technologies" />
          <AnimatedCounter end={1}   suffix=""  label="IEEE Publication" prefix="" />
        </div>

        {/* Timeline + Values */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Journey Timeline */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-display font-bold text-[var(--color-heading)] mb-8"
            >
              My Journey (2023–2027)
            </motion.h3>
            <div className="relative pl-10">
              {/* Vertical line */}
              <div className="timeline-line" />
              <div className="space-y-8">
                {timelineEvents.map((event, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative"
                  >
                    {/* Dot */}
                    <div className="absolute -left-10 mt-1 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: event.color + '20', border: `1px solid ${event.color}50` }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: event.color }} />
                    </div>

                    <div className="glass-card rounded-2xl p-4 hover:border-[var(--color-border-light)] transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                          style={{ background: event.color + '15', color: event.color }}>
                          {event.year}
                        </span>
                      </div>
                      <h4 className="font-display font-semibold text-[var(--color-heading)] text-sm mb-0.5">{event.title}</h4>
                      <p className="text-[10px] font-medium text-[var(--color-muted)] mb-2">{event.org}</p>
                      <p className="text-xs text-[var(--color-muted)] leading-relaxed">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-display font-bold text-[var(--color-heading)] mb-8"
            >
              Core Values
            </motion.h3>
            <div className="space-y-4">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-5 group hover:border-[var(--color-border-light)] transition-all duration-300 premium-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                      style={{ background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.2)' }}>
                      <v.icon size={18} className="text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--color-heading)] mb-1 font-display">{v.title}</h4>
                      <p className="text-sm text-[var(--color-muted)] leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6 glass-card rounded-2xl p-5"
            >
              <h4 className="text-sm font-semibold text-[var(--color-heading)] mb-3 font-display">Technical Strengths</h4>
              <div className="flex flex-wrap gap-2">
                {['MERN Stack', 'React Native', 'Python', 'Machine Learning', 'NLP', 'Google Cloud', 'Firebase', 'REST APIs', 'WebSocket', 'SQL & NoSQL'].map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.15)', color: 'var(--color-text)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
