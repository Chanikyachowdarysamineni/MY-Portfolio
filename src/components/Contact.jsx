import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaFileDownload, FaArrowRight } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'

const SectionBadge = ({ children }) => (
  <div className="section-header-badge">
    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
    {children}
  </div>
)

const Contact = () => {
  const contactCards = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'chanikyachowdary86@gmail.com',
      href: 'mailto:chanikyachowdary86@gmail.com',
      color: '#FF6584',
      action: 'Send Email',
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'chanikya-chowdary-samineni',
      href: 'https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/',
      color: '#0A66C2',
      action: 'Connect',
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'Chanikyachowdarysamineni',
      href: 'https://github.com/Chanikyachowdarysamineni',
      color: '#6C63FF',
      action: 'Follow',
    },
    {
      icon: SiLeetcode,
      label: 'LeetCode',
      value: 'chanikyacs / oO8MDDX40s',
      href: 'https://leetcode.com/u/oO8MDDX40s/',
      color: '#FFA116',
      action: 'View Profile',
    },
  ]

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(108,99,255,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionBadge>Get In Touch</SectionBadge>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[var(--color-heading)]">
            Let's Connect
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            Available for full-time Software Engineer, Full Stack, and AI/ML roles. Reach out via email or connect on professional channels.
          </p>
        </motion.div>

        {/* ── Availability Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 sm:p-8 mb-12 text-center relative overflow-hidden"
          style={{ border: '1px solid rgba(16,185,129,0.3)' }}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold font-mono mb-4"
            style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981', border: '1px solid rgba(16,185,129,0.25)' }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            Seeking Full-Time Opportunities (Graduating 2027 · Currently 7th Semester)
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-heading)] mb-2">
            Ready to Build Next-Gen Products Together
          </h3>
          <p className="text-sm text-[var(--color-muted)] max-w-xl mx-auto mb-6">
            B.Tech CSE student at Vignan's Foundation for Science, Technology & Research. Experienced in MERN stack, Python ML, and leadership.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:chanikyachowdary86@gmail.com"
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm text-white transition-all hover:-translate-y-0.5 hover:shadow-glow"
              style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}
            >
              <FaEnvelope size={15} /> Direct Email
            </a>
            <a
              href="/Resume_CCS.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm text-[var(--color-text)] transition-all hover:-translate-y-0.5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border-light)' }}
            >
              <FaFileDownload size={15} /> Download Resume
            </a>
          </div>
        </motion.div>

        {/* ── Contact Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {contactCards.map((card, i) => (
            <motion.a
              key={card.label}
              href={card.href}
              target={card.href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group glass-card rounded-2xl p-6 flex items-center justify-between transition-all duration-300 premium-card"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: card.color + '15', border: `1px solid ${card.color}30` }}
                >
                  <card.icon size={20} style={{ color: card.color }} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-muted)] mb-0.5">
                    {card.label}
                  </div>
                  <div className="text-sm font-semibold text-[var(--color-heading)] truncate">
                    {card.value}
                  </div>
                </div>
              </div>

              <div
                className="flex items-center gap-1 text-xs font-semibold shrink-0 ml-3 group-hover:translate-x-1 transition-transform"
                style={{ color: card.color }}
              >
                <span>{card.action}</span>
                <FaArrowRight size={10} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* ── Location Footer ── */}
        <div className="text-center text-xs font-medium text-[var(--color-muted)] flex items-center justify-center gap-2">
          <FaMapMarkerAlt size={12} className="text-[var(--color-primary)]" />
          <span>Based in India 🇮🇳 · Open to relocation & remote work</span>
        </div>

      </div>
    </section>
  )
}

export default Contact
