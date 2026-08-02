import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaCode, FaStar, FaUsers, FaFire } from 'react-icons/fa'
import { SiLeetcode, SiGithub, SiHackerrank, SiCodechef, SiLinkedin } from 'react-icons/si'

const SectionBadge = ({ children }) => (
  <div className="section-header-badge">
    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
    {children}
  </div>
)

const profiles = [
  {
    platform: 'LeetCode',
    handle: 'oO8MDDX40s',
    url: 'https://leetcode.com/u/oO8MDDX40s/',
    icon: SiLeetcode,
    color: '#FFA116',
    gradient: 'from-[#FFA116]/20 to-[#FF6584]/10',
    stats: [
      { label: 'Problems Solved', value: '100+', icon: FaCode },
      { label: 'Contest Rating', value: 'Active', icon: FaStar },
    ],
    description: 'Practicing data structures, algorithms, and competitive programming.',
    badges: ['Arrays', 'Trees', 'DP', 'Graphs'],
  },
  {
    platform: 'GitHub',
    handle: 'Chanikyachowdarysamineni',
    url: 'https://github.com/Chanikyachowdarysamineni',
    icon: SiGithub,
    color: '#FFFFFF',
    gradient: 'from-white/10 to-[#6C63FF]/10',
    stats: [
      { label: 'Public Repos', value: '15+', icon: FaCode },
      { label: 'Contributions', value: 'Active', icon: FaFire },
    ],
    description: 'Open source projects, full-stack apps, and AI/ML experiments.',
    badges: ['React', 'Node.js', 'Python', 'ML'],
  },
  {
    platform: 'HackerRank',
    handle: 'chanikyachowdary86',
    url: 'https://www.hackerrank.com/chanikyachowdary86',
    icon: SiHackerrank,
    color: '#00EA64',
    gradient: 'from-[#00EA64]/20 to-[#00D4FF]/10',
    stats: [
      { label: 'Certificates', value: '2', icon: FaStar },
      { label: 'Skill Score', value: '5★', icon: FaStar },
    ],
    description: 'Software Engineer & Python certified developer on HackerRank.',
    badges: ['Software Engineer', 'Python Basic'],
  },
  {
    platform: 'LinkedIn',
    handle: 'chanikya-chowdary-samineni',
    url: 'https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/',
    icon: SiLinkedin,
    color: '#0A66C2',
    gradient: 'from-[#0A66C2]/20 to-[#6C63FF]/10',
    stats: [
      { label: 'Connections', value: '500+', icon: FaUsers },
      { label: 'Posts', value: 'Active', icon: FaFire },
    ],
    description: 'Professional network, recommendations, and industry connections.',
    badges: ['Full Stack', 'AI/ML', 'Open to Work'],
  },
  {
    platform: 'CodeChef',
    handle: 'chanikyacs',
    url: 'https://www.codechef.com/users/chanikyacs',
    icon: SiCodechef,
    color: '#5B4638',
    gradient: 'from-[#5B4638]/20 to-[#F59E0B]/10',
    stats: [
      { label: 'Rating', value: '★★', icon: FaStar },
      { label: 'Problems', value: '50+', icon: FaCode },
    ],
    description: 'Competitive programming and monthly coding contests.',
    badges: ['Algorithms', 'Math', 'Contests'],
  },
]

const CodingProfileCard = ({ profile, index }) => (
  <motion.a
    href={profile.url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -6, scale: 1.02 }}
    className="group glass-card rounded-2xl p-5 block transition-all duration-300"
    style={{ textDecoration: 'none' }}
  >
    {/* Top */}
    <div className={`h-24 rounded-xl mb-4 relative overflow-hidden bg-gradient-to-br ${profile.gradient} flex items-center justify-center`}>
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
        style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${profile.color}30` }}>
        <profile.icon size={24} style={{ color: profile.color }} />
      </div>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <FaExternalLinkAlt size={11} style={{ color: profile.color }} />
      </div>
      <div className="absolute inset-0" style={{
        background: `radial-gradient(circle at center, ${profile.color}10, transparent)`,
      }} />
    </div>

    <div className="space-y-3">
      <div>
        <h3 className="font-display font-bold text-[var(--color-heading)] group-hover:text-[var(--color-primary)] transition-colors">
          {profile.platform}
        </h3>
        <p className="text-xs font-mono text-[var(--color-muted)] mt-0.5">@{profile.handle}</p>
      </div>

      <p className="text-xs text-[var(--color-muted)] leading-relaxed">{profile.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        {profile.stats.map(stat => (
          <div key={stat.label} className="rounded-lg p-2 text-center"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)' }}>
            <div className="text-sm font-bold" style={{ color: profile.color }}>{stat.value}</div>
            <div className="text-[9px] text-[var(--color-muted)] mt-0.5 leading-tight">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        {profile.badges.map(b => (
          <span key={b} className="px-2 py-0.5 rounded-md text-[10px] font-medium"
            style={{ background: profile.color + '10', color: profile.color, border: `1px solid ${profile.color}20` }}>
            {b}
          </span>
        ))}
      </div>
    </div>
  </motion.a>
)

const CodingProfiles = () => (
  <section id="coding-profiles" className="section-padding relative">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute right-1/4 bottom-1/4 w-72 h-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <SectionBadge>Online Presence</SectionBadge>
        <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[var(--color-heading)]">
          Coding Profiles
        </h2>
        <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
          Active across platforms — from competitive programming to open source contributions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {profiles.map((profile, i) => (
          <CodingProfileCard key={profile.platform} profile={profile} index={i} />
        ))}
      </div>
    </div>
  </section>
)

export default CodingProfiles
