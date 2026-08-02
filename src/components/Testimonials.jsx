import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const SectionBadge = ({ children }) => (
  <div className="section-header-badge">
    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
    {children}
  </div>
)

const testimonials = [
  {
    id: 1,
    name: 'Prof. Ramesh Kumar',
    role: 'Associate Professor, CSE Dept.',
    org: "Vignan's Foundation for Science, Technology & Research (Vignan's University)",
    text: 'Chanikya is one of the most dedicated students I have mentored. His ability to translate complex theoretical concepts into working, production-grade software is exceptional. His IEEE research publication demonstrates not just technical skill but academic rigor and a commitment to advancing knowledge.',
    color: '#6C63FF',
    initials: 'RK',
  },
  {
    id: 2,
    name: 'Sai Priya',
    role: 'Senior Developer & Mentor',
    org: 'Web Dev Internship',
    text: 'Working with Chanikya during the internship was refreshing. He picks up new concepts incredibly fast and applies them thoughtfully. His MERN stack skills are already at a senior level, and his attention to code quality impressed the entire team. He will thrive in any high-growth engineering team.',
    color: '#00D4FF',
    initials: 'SP',
  },
  {
    id: 3,
    name: 'Vijay Srinivas',
    role: 'Team Lead & Collaborator',
    org: 'ML Hackathon Team',
    text: 'We won the ML hackathon partly because of Chanikya\'s NLP expertise and his ability to stay calm under pressure. He architected our entire ML pipeline in hours and debugged complex model issues that would have stalled most developers. A true problem-solver with leadership instincts.',
    color: '#10B981',
    initials: 'VS',
  },
  {
    id: 4,
    name: 'Ananya Reddy',
    role: 'Project Collaborator',
    org: 'Mahotsav Website Project',
    text: 'Chanikya built the festival platform from scratch and it handled thousands of users without a single crash. His real-time architecture using Socket.io and Firebase was cleverly designed. Beyond the technical skills, he communicates clearly and keeps the team aligned — a rare combination.',
    color: '#F59E0B',
    initials: 'AR',
  },
]

const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent(c => (c + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const go = (idx) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }
  const prev = () => { setDirection(-1); setCurrent(c => (c - 1 + testimonials.length) % testimonials.length) }
  const next = () => { setDirection(1);  setCurrent(c => (c + 1) % testimonials.length) }

  const t = testimonials[current]

  return (
    <section id="testimonials" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <SectionBadge>Testimonials</SectionBadge>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[var(--color-heading)]">
            What People Say
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            Recommendations from professors, mentors, and collaborators.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-3xl p-8 sm:p-10 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-8 right-8 opacity-20">
                <FaQuoteLeft size={40} style={{ color: t.color }} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: t.color }}>★</span>
                ))}
              </div>

              <blockquote className="text-base sm:text-lg text-[var(--color-text)] leading-relaxed mb-8 italic">
                "{t.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-base font-display font-bold"
                  style={{ background: t.color + '20', border: `1px solid ${t.color}30`, color: t.color }}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-display font-bold text-[var(--color-heading)]">{t.name}</div>
                  <div className="text-sm text-[var(--color-muted)]">{t.role}</div>
                  <div className="text-xs font-mono mt-0.5" style={{ color: t.color }}>{t.org}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    background: i === current ? testimonials[i].color : 'var(--color-border-light)',
                  }}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-3">
              <button onClick={prev}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)' }}>
                <FaChevronLeft size={14} />
              </button>
              <button onClick={next}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)' }}>
                <FaChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
