import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaUserTie, FaCalendarAlt, FaMapMarkerAlt,
  FaExpandAlt, FaTimes, FaUsers, FaGraduationCap,
  FaGlobe, FaCheckCircle, FaAward,
} from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'

const SectionBadge = ({ children }) => (
  <div className="section-header-badge">
    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
    {children}
  </div>
)

// ─── Major Alumni Events Data ────────────────────────────────────────────────
const alumniEvents = [
  {
    id: 'reunion-2024',
    title: 'Alumni Reunion Meet',
    date: '28 June 2024',
    location: 'Campus VFSTR, Vadlamudi, Guntur',
    type: 'On-Campus Flagship Reunion',
    description:
      'Orchestrated the annual flagship on-campus Alumni Reunion at VFSTR, bringing together multi-batch graduates for interactive panel discussions, campus walk-throughs, and mentorship sessions with current students.',
    highlights: [
      'Multi-batch alumni reunion',
      'Student-alumni panel discussions',
      'Campus networking & mentorship lounge',
    ],
    image: null,
    accent: '#6C63FF',
    badge: 'On Campus',
  },
  {
    id: 'telangana-2025',
    title: 'Telangana Chapter Alumni Meet',
    date: '20 December 2025',
    location: 'Kondapur Campus, Vignan Schools, Hyderabad',
    type: 'State Chapter Conference',
    description:
      'Organized and hosted the Telangana Chapter Alumni Meet in Hyderabad. Facilitated key industrial networking sessions, university development briefings, and alumni directory updates with over 150+ regional alumni.',
    highlights: [
      '150+ regional alumni attended',
      'Industrial collaboration discussions',
      'Official Telangana Chapter networking evening',
    ],
    image: '/HYD chapters.jpeg',
    imageCaption: 'Telangana Chapter Alumni Meet at Kondapur Campus, Vignan Schools, Hyderabad',
    accent: '#00D4FF',
    badge: 'Hyderabad Chapter',
  },
  {
    id: 'karnataka-2026',
    title: 'Karnataka Chapter Alumni Meet',
    date: '7 June 2026',
    location: 'Novotel, Bengaluru',
    type: 'State Chapter Convention',
    description:
      'Led the execution of the grand Karnataka Chapter Alumni Meet at Novotel, Bengaluru — connecting tech leaders, startup founders, and senior engineers with the university leadership to foster research & placement partnerships.',
    highlights: [
      'Hosted at Novotel, Bengaluru',
      'Tech leadership & founder panel',
      'University placement & research alliance',
    ],
    image: '/BNG chapters.jpeg',
    imageCaption: 'Karnataka Chapter Alumni Meet at Novotel, Bengaluru',
    accent: '#10B981',
    badge: 'Bengaluru Chapter',
  },
]

const Leadership = () => {
  const [activeMedia, setActiveMedia] = useState(null)

  return (
    <>
      <section id="leadership" className="section-padding relative">
        {/* Background ambiance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute left-1/3 top-1/4 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }}
          />
          <div
            className="absolute right-1/4 bottom-1/4 w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)', filter: 'blur(50px)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionBadge>Leadership & Responsibility</SectionBadge>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[var(--color-heading)]">
              Positions of Responsibility
            </h2>
            <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
              Leading student-alumni initiatives, representing the CSE department as an ambassador, and orchestrating state chapter conventions.
            </p>
          </motion.div>

          {/* ── Grid: Vice President Spotlight & Department Ambassador ── */}
          <div className="grid lg:grid-cols-12 gap-8 mb-16">

            {/* Vice President Spotlight Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between"
              style={{
                border: '1px solid rgba(108,99,255,0.25)',
              }}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono"
                    style={{ background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)', color: '#6C63FF' }}
                  >
                    <FaUserTie size={12} /> Vice President (2025 – 2026)
                  </span>
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono"
                    style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.25)', color: '#00D4FF' }}
                  >
                    Joint Secretary (2024 – 2025)
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-heading)] mb-1">
                  Alumni Linkages Club
                </h3>

                <p className="text-xs font-semibold text-[var(--color-primary)] mb-4">
                  Vignan's Foundation for Science, Technology & Research (Vignan's University)
                </p>

                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
                  Served as <strong>Joint Secretary (2024–2025)</strong> and elevated to <strong>Vice President (2025–2026)</strong> of the Alumni Linkages Club. Leading the core executive body engaging thousands of university alumni globally, organizing major state chapter meets, and creating structured mentorship programs connecting students directly with industry leaders.
                </p>

                {/* Key Duties */}
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    'Multi-state Alumni Chapter Operations',
                    'Student-Alumni Mentorship Frameworks',
                    'Corporate & University Relations',
                    'Event Logistics & Dignitary Management',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[var(--color-text)]">
                      <FaCheckCircle size={13} className="text-[var(--color-primary)] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics strip */}
              <div className="grid grid-cols-4 gap-2 pt-4 border-t border-[var(--color-border)]">
                {[
                  { v: '3+',   l: 'Meets', c: '#6C63FF' },
                  { v: '3',    l: 'States', c: '#00D4FF' },
                  { v: '500+', l: 'Alumni', c: '#10B981' },
                  { v: '2025–26', l: 'Term', c: '#F59E0B' },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-2 rounded-xl" style={{ background: stat.c + '0D' }}>
                    <div className="text-base sm:text-lg font-display font-bold" style={{ color: stat.c }}>{stat.v}</div>
                    <div className="text-[10px] text-[var(--color-muted)] font-medium">{stat.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CSE Department Ambassador Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
              style={{
                border: '1px solid rgba(245,158,11,0.3)',
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono"
                    style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#F59E0B' }}
                  >
                    <FaAward size={12} /> Recognized Honor
                  </span>
                  <span className="text-xs font-mono text-[var(--color-muted)]">AY 2025–26</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-heading)] mb-1">
                  CSE Department Ambassador
                </h3>

                <p className="text-xs font-semibold text-[var(--color-primary)] mb-3">
                  1 of 12 Selected Department Ambassadors
                </p>

                <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-4">
                  Officially selected as one of 12 Department Ambassadors across the entire Computer Science & Engineering department for Academic Year 2025–26. Recognized for leadership, academic excellence, and representing the department in official publications (featured on Page 31 of CSE Chronicle June 2026).
                </p>
              </div>

              {/* Poster Preview Button Card */}
              <div
                className="relative rounded-2xl overflow-hidden group cursor-pointer border border-[var(--color-border)]"
                onClick={() => setActiveMedia({
                  title: 'CSE Department Ambassadors (AY 2025–26)',
                  subtitle: 'Official CSE Chronicle Publication | June 2026',
                  image: '/cse_ambassadors.png',
                  badge: 'Department Ambassador',
                  accent: '#F59E0B',
                  date: 'Academic Year 2025–26',
                  location: 'Dept of CSE, VFSTR (Vignan\'s University)',
                  description: 'Official department poster featuring Samineni Chanikya Chowdary among the 12 recognized Department Ambassadors.',
                })}
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src="/cse_ambassadors.png"
                    alt="CSE Department Ambassadors Poster"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black/40">
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-md bg-white/20">
                      <FaExpandAlt size={11} /> View Official Poster
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-[var(--color-surface)] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--color-heading)]">View Ambassadors Poster</span>
                  <span className="text-[10px] text-[#F59E0B] font-mono font-bold">Page 31 →</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ── Major Alumni Events Organized ── */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 rounded-full bg-[var(--color-primary)]" />
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-heading)]">
                  Major Events Organized
                </h3>
              </div>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(108,99,255,0.3), transparent)' }} />
            </div>

            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {alumniEvents.map((evt, index) => (
                <motion.article
                  key={evt.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="group glass-card rounded-3xl overflow-hidden flex flex-col premium-card"
                  style={{ border: `1px solid ${evt.accent}25` }}
                >
                  {/* Image or Pattern Header */}
                  {evt.image ? (
                    <div
                      className="relative h-52 overflow-hidden cursor-pointer group"
                      onClick={() => setActiveMedia(evt)}
                    >
                      <img
                        src={evt.image}
                        alt={evt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Zoom hint overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black/40">
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-md bg-white/20">
                          <FaExpandAlt size={11} /> View Photo
                        </span>
                      </div>

                      <span
                        className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono"
                        style={{ background: 'rgba(0,0,0,0.65)', border: `1px solid ${evt.accent}40`, color: evt.accent }}
                      >
                        {evt.badge}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="relative h-44 flex items-center justify-center p-6"
                      style={{
                        background: `radial-gradient(circle at center, ${evt.accent}18, transparent)`,
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ background: evt.accent + '20', border: `1.5px solid ${evt.accent}40` }}
                      >
                        <FaGraduationCap size={28} style={{ color: evt.accent }} />
                      </div>
                      <span
                        className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono"
                        style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${evt.accent}40`, color: evt.accent }}
                      >
                        {evt.badge}
                      </span>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)] mb-2">
                      <FaCalendarAlt size={12} style={{ color: evt.accent }} />
                      <span>{evt.date}</span>
                    </div>

                    <h4 className="text-lg font-display font-bold text-[var(--color-heading)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                      {evt.title}
                    </h4>

                    <div className="flex items-start gap-1.5 text-xs text-[var(--color-muted)] mb-4">
                      <FaMapMarkerAlt size={12} className="shrink-0 mt-0.5" style={{ color: evt.accent }} />
                      <span>{evt.location}</span>
                    </div>

                    <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-4 flex-1">
                      {evt.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-3 border-t border-[var(--color-border)]">
                      {evt.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-[var(--color-text)]">
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: evt.accent }} />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Photo Action button if image present */}
                    {evt.image && (
                      <button
                        onClick={() => setActiveMedia(evt)}
                        className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all"
                        style={{ background: evt.accent + '12', border: `1px solid ${evt.accent}30`, color: evt.accent }}
                      >
                        <FaExpandAlt size={10} /> Expand Event Photo
                      </button>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Media Lightbox Modal ── */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9500] flex items-center justify-center p-4 sm:p-6"
            style={{ background: 'rgba(3, 3, 10, 0.92)', backdropFilter: 'blur(12px)' }}
            onClick={() => setActiveMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden glass-card"
              style={{ border: `1px solid ${activeMedia.accent || '#6C63FF'}40` }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveMedia(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center text-white bg-black/60 hover:bg-black/80 transition-colors border border-white/20"
                aria-label="Close"
              >
                <FaTimes size={14} />
              </button>

              {/* Photo Display */}
              <div className="relative max-h-[75vh] flex items-center justify-center bg-black/60 overflow-hidden">
                <img
                  src={activeMedia.image}
                  alt={activeMedia.title}
                  className="max-h-[75vh] w-full object-contain"
                />
              </div>

              {/* Caption Footer */}
              <div className="p-6 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono"
                    style={{
                      background: (activeMedia.accent || '#6C63FF') + '20',
                      color: activeMedia.accent || '#6C63FF',
                      border: `1px solid ${(activeMedia.accent || '#6C63FF')}30`,
                    }}
                  >
                    {activeMedia.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] font-mono">
                    <FaCalendarAlt size={12} style={{ color: activeMedia.accent || '#6C63FF' }} />
                    <span>{activeMedia.date}</span>
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-[var(--color-heading)] mb-1">
                  {activeMedia.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] mb-3">
                  <FaMapMarkerAlt size={12} style={{ color: activeMedia.accent || '#6C63FF' }} />
                  <span>{activeMedia.location}</span>
                </div>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  {activeMedia.imageCaption || activeMedia.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Leadership
