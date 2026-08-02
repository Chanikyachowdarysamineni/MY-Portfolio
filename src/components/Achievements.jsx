import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExternalLinkAlt, FaTrophy, FaCertificate, FaStar, FaTimes, FaExpandAlt } from 'react-icons/fa'
import { SiGooglecloud, SiSap, SiHackerrank, SiIeee } from 'react-icons/si'

const SectionBadge = ({ children }) => (
  <div className="section-header-badge">
    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
    {children}
  </div>
)

const achievements = [
  {
    id: 1,
    title: 'IEEE Research Publication',
    description: 'Authored and published peer-reviewed research: "Harnessing Machine Learning for Intelligent Weather Forecasting: From Data-Driven Models to Predictive Accuracy" at IEEE.',
    icon: SiIeee,
    type: 'Research',
    color: '#00D4FF',
    gradient: 'from-[#00D4FF]/20 to-[#6C63FF]/10',
    badge: 'Published ✓',
    link: 'https://ieeexplore.ieee.org/document/11324360',
    paperImage: '/ieee_paper_preview.png',
    year: '2025',
    impact: 'IEEE Xplore Indexed',
  },
  {
    id: 2,
    title: 'ML Hackathon Winner',
    description: 'Won a competitive Machine Learning hackathon, applying advanced NLP and predictive modeling to solve real-world challenges.',
    icon: FaTrophy,
    type: 'Competition',
    color: '#F59E0B',
    gradient: 'from-[#F59E0B]/20 to-[#FF6584]/10',
    badge: '🏆 Winner',
    link: null,
    year: '2025',
    impact: '1st Place',
  },
  {
    id: 3,
    title: 'Google Cloud Cybersecurity',
    description: 'Earned industry-recognized Google Cloud Cybersecurity Professional Certificate demonstrating cloud security expertise.',
    icon: SiGooglecloud,
    type: 'Certification',
    color: '#4285F4',
    gradient: 'from-[#4285F4]/20 to-[#34A853]/10',
    badge: 'Certified',
    link: 'https://www.credly.com/badges/fb685048-9325-47d6-8cd6-5cad2830dc82/linked_in_profile',
    year: '2024',
    impact: 'Industry Cert',
  },
  {
    id: 4,
    title: 'SAP S/4HANA Cloud Certification',
    description: 'Achieved SAP S/4HANA Cloud Private Edition certification in Sourcing & Procurement, recognized globally.',
    icon: SiSap,
    type: 'Certification',
    color: '#0FAAFF',
    gradient: 'from-[#0FAAFF]/20 to-[#6C63FF]/10',
    badge: 'Certified',
    link: 'https://www.credly.com/badges/e503a225-eb44-4d61-ac2c-e3839841e6b4/public_url',
    year: '2024',
    impact: 'SAP Official',
  },
  {
    id: 5,
    title: 'HackerRank Software Engineer',
    description: 'Earned HackerRank Software Engineer Certificate demonstrating proficiency in data structures, algorithms, and problem-solving.',
    icon: SiHackerrank,
    type: 'Certification',
    color: '#00EA64',
    gradient: 'from-[#00EA64]/20 to-[#00D4FF]/10',
    badge: 'Certified',
    link: 'https://www.hackerrank.com/certificates/b699532ca2f9',
    year: '2024',
    impact: 'Top 5%',
  },
  {
    id: 6,
    title: 'HackerRank Python Certification',
    description: 'Certified in Python programming by HackerRank, demonstrating strong fundamentals and scripting expertise.',
    icon: SiHackerrank,
    type: 'Certification',
    color: '#00EA64',
    gradient: 'from-[#00EA64]/20 to-[#10B981]/10',
    badge: 'Certified',
    link: 'https://www.hackerrank.com/certificates/86d16de404c5',
    year: '2023',
    impact: 'Python Expert',
  },
  {
    id: 7,
    title: 'PET Cambridge Certificate',
    description: 'Earned Cambridge B1 Preliminary English Test (PET) certification demonstrating strong English communication skills.',
    icon: FaCertificate,
    type: 'Language',
    color: '#6C63FF',
    gradient: 'from-[#6C63FF]/20 to-[#FF6584]/10',
    badge: 'B1 Level',
    link: null,
    year: '2023',
    impact: 'Cambridge Cert',
  },
  {
    id: 8,
    title: '10+ Projects Shipped',
    description: 'Successfully designed, built, and deployed 10+ projects ranging from AI-powered applications to enterprise web platforms.',
    icon: FaStar,
    type: 'Achievement',
    color: '#FF6584',
    gradient: 'from-[#FF6584]/20 to-[#F59E0B]/10',
    badge: '10+ Projects',
    link: '#projects',
    year: '2023–2027',
    impact: 'Production Ready',
  },
]

const typeColors = {
  Research:     '#00D4FF',
  Competition:  '#F59E0B',
  Certification:'#6C63FF',
  Language:     '#10B981',
  Achievement:  '#FF6584',
}

const AchievementCard = ({ achievement, index, onPreviewPaper }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    className="group relative glass-card rounded-2xl p-5 premium-card flex flex-col justify-between overflow-hidden"
  >
    {/* Gradient overlay */}
    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

    <div className="relative z-10 flex flex-col h-full">
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{ background: achievement.color + '15', border: `1px solid ${achievement.color}30` }}>
          <achievement.icon size={20} style={{ color: achievement.color }} />
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono"
            style={{ background: typeColors[achievement.type] + '15', color: typeColors[achievement.type], border: `1px solid ${typeColors[achievement.type]}25` }}>
            {achievement.type}
          </span>
          {achievement.link && (
            <a href={achievement.link} target={achievement.link.startsWith('#') ? '_self' : '_blank'} rel="noopener noreferrer"
              aria-label="Open link"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)' }}>
              <FaExternalLinkAlt size={10} />
            </a>
          )}
        </div>
      </div>

      <h3 className="font-display font-bold text-[var(--color-heading)] text-sm mb-1.5 leading-snug">{achievement.title}</h3>
      <p className="text-xs text-[var(--color-muted)] leading-relaxed flex-1 mb-3">{achievement.description}</p>

      {/* Paper Preview Button for IEEE */}
      {achievement.paperImage && (
        <button
          onClick={() => onPreviewPaper(achievement)}
          className="mb-3 w-full flex items-center justify-center gap-2 py-1.5 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02]"
          style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.25)', color: '#00D4FF' }}
        >
          <FaExpandAlt size={10} /> View IEEE Paper Document
        </button>
      )}

      {/* Bottom row */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)] mt-auto">
        <span className="text-[10px] font-mono text-[var(--color-muted)]">{achievement.year}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: achievement.color + '12', color: achievement.color, border: `1px solid ${achievement.color}20` }}>
            {achievement.badge}
          </span>
          <span className="text-[10px] text-[var(--color-muted)]">{achievement.impact}</span>
        </div>
      </div>
    </div>
  </motion.div>
)

const Achievements = () => {
  const [activePaper, setActivePaper] = useState(null)

  return (
    <>
      <section id="achievements" className="section-padding relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-1/4 w-72 h-72 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <SectionBadge>Achievements</SectionBadge>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[var(--color-heading)]">
              Awards & Certifications
            </h2>
            <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
              IEEE research publications, competition wins, and industry-recognized certifications.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-14"
          >
            {[
              { label: 'Certifications', value: '6+', color: '#6C63FF' },
              { label: 'Competition Wins', value: '1', color: '#F59E0B' },
              { label: 'IEEE Papers', value: '1', color: '#00D4FF' },
              { label: 'Projects Shipped', value: '10+', color: '#10B981' },
            ].map(({ label, value, color }) => (
              <div key={label} className="px-6 py-3 rounded-2xl text-center"
                style={{ background: color + '0D', border: `1px solid ${color}20` }}>
                <div className="text-2xl font-display font-bold" style={{ color }}>{value}</div>
                <div className="text-xs text-[var(--color-muted)] mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((ach, i) => (
              <AchievementCard
                key={ach.id}
                achievement={ach}
                index={i}
                onPreviewPaper={setActivePaper}
              />
            ))}
          </div>
        </div>
      </section>

      {/* IEEE Document Lightbox Modal */}
      <AnimatePresence>
        {activePaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9500] flex items-center justify-center p-4 sm:p-6"
            style={{ background: 'rgba(3, 3, 10, 0.92)', backdropFilter: 'blur(12px)' }}
            onClick={() => setActivePaper(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-3xl w-full rounded-3xl overflow-hidden glass-card"
              style={{ border: '1px solid rgba(0,212,255,0.3)' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePaper(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center text-white bg-black/60 hover:bg-black/80 transition-colors border border-white/20"
                aria-label="Close"
              >
                <FaTimes size={14} />
              </button>

              {/* Document Image Display */}
              <div className="relative max-h-[75vh] flex items-center justify-center bg-white overflow-y-auto">
                <img
                  src={activePaper.paperImage}
                  alt={activePaper.title}
                  className="w-full object-contain"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-display font-bold text-[var(--color-heading)]">
                    {activePaper.title} (2025)
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] font-mono mt-0.5">
                    IEEE Xplore Document ID: 11324360
                  </p>
                </div>

                <a
                  href="https://ieeexplore.ieee.org/document/11324360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #00D4FF, #6C63FF)' }}
                >
                  <FaExternalLinkAlt size={11} /> Open in IEEE Xplore
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Achievements
