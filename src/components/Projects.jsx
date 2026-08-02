import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaExternalLinkAlt, FaGithub, FaTimes,
  FaShieldAlt, FaBolt, FaLayerGroup, FaClipboardList, FaUsers, FaCloud,
  FaArrowRight, FaCheck,
} from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'

// ─── Section Badge ────────────────────────────────────────────────────────────
const SectionBadge = ({ children }) => (
  <div className="section-header-badge">
    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
    {children}
  </div>
)

// ─── Project Data ─────────────────────────────────────────────────────────────
const clientProjects = [
  {
    id: 'inv',
    title: 'Inventory Management System',
    subtitle: 'Electrical Component Stock Tracker',
    description:
      'A full-stack MERN inventory solution purpose-built for an electrical business. Replaces error-prone spreadsheets with real-time dashboards, automated low-stock alerts, and category-level analytics — reducing manual overhead by over 80%.',
    icon: FaBolt,
    accent: '#F59E0B',
    gradFrom: '#F59E0B',
    gradTo: '#FF6584',
    bgPattern: 'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(245,158,11,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(255,101,132,0.12) 0%, transparent 60%)',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    features: [
      'Real-time stock dashboard',
      'Automated low-stock alerts',
      'Category & SKU management',
      'Export & analytics reports',
      'Role-based access control',
    ],
    impact: 'Eliminated manual stock errors and cut inventory reconciliation time by 80%.',
    live: 'https://electricity-inventory-management-ivm.onrender.com',
    github: null,
    status: 'Live',
  },
  {
    id: 'csehub',
    title: 'CSE-HUB Platform',
    subtitle: 'Department Student Resource Hub',
    description:
      'A centralized web platform for the CSE department serving 500+ students. Provides real-time notifications, departmental announcements, resource downloads, and an event calendar — replacing scattered WhatsApp groups and email chains.',
    icon: FaLayerGroup,
    accent: '#00D4FF',
    gradFrom: '#00D4FF',
    gradTo: '#10B981',
    bgPattern: 'radial-gradient(ellipse 80% 60% at 80% 30%, rgba(0,212,255,0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 20% 70%, rgba(16,185,129,0.10) 0%, transparent 60%)',
    tags: ['React', 'Firebase', 'Real-time', 'Node.js', 'Notifications'],
    features: [
      'Real-time push notifications',
      'Resource & notes library',
      'Event & exam calendar',
      'Departmental announcements',
      'Student dashboard portal',
    ],
    impact: 'Centralized info for 500+ students; reduced communication latency from hours to seconds.',
    live: 'https://github.com/Chanikyachowdarysamineni/CSE-HUB.git',
    github: 'https://github.com/Chanikyachowdarysamineni/CSE-HUB.git',
    status: 'Live',
  },
  {
    id: 'faculty',
    title: 'Faculty Workload Manager',
    subtitle: 'Administrative Load Distribution System',
    description:
      'An institutional web system that automates teaching load balancing across faculty members. Administrators configure constraints; the system computes optimal assignments, generates visual analytics, and exports workload reports for accreditation audits.',
    icon: FaClipboardList,
    accent: '#10B981',
    gradFrom: '#10B981',
    gradTo: '#6C63FF',
    bgPattern: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(16,185,129,0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 50% 80%, rgba(108,99,255,0.10) 0%, transparent 60%)',
    tags: ['React', 'Node.js', 'MongoDB', 'Analytics', 'Admin Dashboard'],
    features: [
      'Automated load balancing',
      'Visual workload analytics',
      'Schedule conflict detection',
      'Accreditation-ready reports',
      'Faculty self-service portal',
    ],
    impact: 'Saves 5+ hours of manual scheduling per week; used live by department administration.',
    live: 'https://160.187.169.41/csefaculty/',
    github: null, // no source — live demo only
    status: 'Production',
  },
]

const personalProjects = [
  {
    id: 'safechat',
    title: 'SafeChat AI',
    subtitle: 'AI-Powered Real-Time Content Moderation',
    description:
      'A real-time chat platform with an embedded NLP moderation engine that intercepts toxic content before delivery. Built with a Python micro-service for inference, a MERN backend for persistence, and Socket.io for sub-100ms live messaging.',
    icon: FaShieldAlt,
    accent: '#6C63FF',
    gradFrom: '#6C63FF',
    gradTo: '#00D4FF',
    bgPattern: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(108,99,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 70%, rgba(0,212,255,0.12) 0%, transparent 60%)',
    tags: ['React', 'Node.js', 'NLP', 'Python', 'Socket.io', 'MongoDB'],
    features: [
      'Real-time NLP moderation',
      'JWT Authentication & sessions',
      'Live WebSocket chat',
      'Admin moderation dashboard',
      'Toxic content reporting',
    ],
    impact: '90%+ toxic content detection rate; seamless chat latency under 100 ms.',
    live: 'https://safe-chat-ai.netlify.app/',
    github: 'https://github.com/Chanikyachowdarysamineni/Safe-Chat-AI.git',
    status: 'Live',
    featured: true,
  },
  {
    id: 'cocreatex',
    title: 'CocreateX',
    subtitle: 'Collaborative Creative Platform',
    description:
      'A platform designed for creators and developers to collaborate in real-time on ideas, designs, and code snippets. Features live co-editing, project versioning, role-based permissions, and an integrated commenting system for async feedback loops.',
    icon: FaUsers,
    accent: '#FF6584',
    gradFrom: '#FF6584',
    gradTo: '#F59E0B',
    bgPattern: 'radial-gradient(ellipse 80% 60% at 80% 30%, rgba(255,101,132,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 20% 70%, rgba(245,158,11,0.12) 0%, transparent 60%)',
    tags: ['React', 'Node.js', 'WebSocket', 'Firebase', 'Collaboration'],
    features: [
      'Real-time co-editing',
      'Project version control',
      'Role-based permissions',
      'Async comment threads',
      'Creator profile pages',
    ],
    impact: 'Enables distributed teams to co-create without friction; zero context-switching overhead.',
    live: 'https://github.com/Chanikyachowdarysamineni',
    github: 'https://github.com/Chanikyachowdarysamineni',
    status: 'In Progress',
    featured: false,
  },
]

// ─── Thumbnail Component ──────────────────────────────────────────────────────
const ProjectThumbnail = ({ project }) => (
  <div
    className="relative h-48 rounded-2xl overflow-hidden flex items-center justify-center mb-6 shrink-0"
    style={{ background: project.bgPattern }}
  >
    {/* Grid lines overlay */}
    <div className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }}
    />
    {/* Centered icon */}
    <div
      className="relative z-10 w-20 h-20 rounded-3xl flex items-center justify-center"
      style={{
        background: project.accent + '18',
        border: `1.5px solid ${project.accent}35`,
        boxShadow: `0 0 40px ${project.accent}25`,
      }}
    >
      <project.icon size={32} style={{ color: project.accent }} />
    </div>
    {/* Status badge */}
    <div
      className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider"
      style={{
        background: 'rgba(0,0,0,0.5)',
        border: `1px solid ${project.accent}40`,
        color: project.accent,
        backdropFilter: 'blur(6px)',
      }}
    >
      {project.status === 'Live' && <span className="mr-1">●</span>}
      {project.status}
    </div>
    {/* Featured badge */}
    {project.featured && (
      <div
        className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold"
        style={{ background: 'rgba(108,99,255,0.25)', border: '1px solid rgba(108,99,255,0.4)', color: '#a78bfa' }}
      >
        <HiSparkles size={10} /> Featured
      </div>
    )}
    {/* Bottom gradient fade */}
    <div
      className="absolute bottom-0 left-0 right-0 h-16"
      style={{ background: 'linear-gradient(to top, var(--color-surface) 0%, transparent 100%)' }}
    />
  </div>
)

// ─── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, onOpen }) => (
  <motion.article
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="group relative flex flex-col glass-card rounded-3xl overflow-hidden cursor-pointer"
    style={{ border: `1px solid ${project.accent}15` }}
    onClick={() => onOpen(project)}
    tabIndex={0}
    onKeyDown={e => e.key === 'Enter' && onOpen(project)}
    role="button"
    aria-label={`View ${project.title} case study`}
  >
    {/* Hover glow border */}
    <div
      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ boxShadow: `inset 0 0 0 1px ${project.accent}35, 0 20px 60px ${project.accent}12` }}
    />

    <div className="p-6 flex flex-col flex-1">
      <ProjectThumbnail project={project} />

      {/* Title */}
      <div className="mb-3">
        <h3
          className="text-lg font-display font-bold text-[var(--color-heading)] mb-1 group-hover:transition-colors duration-300"
          style={{ '--hover-color': project.accent }}
        >
          <span className="group-hover:text-[var(--color-primary)] transition-colors duration-200">
            {project.title}
          </span>
        </h3>
        <p className="text-xs font-medium text-[var(--color-muted)]">{project.subtitle}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Impact pill */}
      <div
        className="flex items-start gap-2 rounded-xl p-3 mb-4"
        style={{ background: project.accent + '0D', border: `1px solid ${project.accent}20` }}
      >
        <div className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
          style={{ background: project.accent + '25' }}>
          <FaCheck size={8} style={{ color: project.accent }} />
        </div>
        <p className="text-xs text-[var(--color-text)] leading-relaxed">{project.impact}</p>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map(t => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-md text-[10px] font-medium text-[var(--color-muted)]"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)' }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA row */}
      <div className="mt-auto flex items-center gap-2.5" onClick={e => e.stopPropagation()}>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: `linear-gradient(135deg, ${project.gradFrom}, ${project.gradTo})` }}
          >
            <FaExternalLinkAlt size={10} /> Live Demo
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[var(--color-text)] transition-all hover:-translate-y-0.5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border-light)' }}
          >
            <FaGithub size={12} /> Source
          </a>
        )}
        <button
          className="ml-auto flex items-center gap-1 text-xs text-[var(--color-muted)] group-hover:text-[var(--color-primary)] transition-colors duration-200"
          onClick={e => { e.stopPropagation(); onOpen(project) }}
        >
          Case Study <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </motion.article>
)

// ─── Case Study Modal ─────────────────────────────────────────────────────────
const CaseStudyModal = ({ project, onClose }) => {
  if (!project) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
      style={{ background: 'rgba(3,3,10,0.88)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 24 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl"
        style={{
          background: 'var(--color-surface)',
          border: `1px solid ${project.accent}30`,
          boxShadow: `0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px ${project.accent}15`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className="relative h-48 rounded-t-3xl overflow-hidden flex items-end px-8 pb-6"
          style={{ background: project.bgPattern }}
        >
          <div className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
              backgroundSize: '28px 28px',
            }}
          />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-28"
            style={{ background: `linear-gradient(to top, var(--color-surface) 0%, transparent 100%)` }} />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center z-20 transition-all hover:scale-110"
            style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.1)' }}
            aria-label="Close"
          >
            <FaTimes size={13} className="text-white" />
          </button>

          <div className="relative z-10 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: project.accent + '20', border: `1.5px solid ${project.accent}40` }}
            >
              <project.icon size={24} style={{ color: project.accent }} />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-[var(--color-heading)]">{project.title}</h2>
              <p className="text-sm text-[var(--color-muted)]">{project.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-7">

          {/* Overview */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)] font-mono mb-2">Overview</h3>
            <p className="text-sm text-[var(--color-text)] leading-relaxed">{project.description}</p>
          </div>

          {/* Impact */}
          <div
            className="rounded-2xl p-5"
            style={{ background: project.accent + '0C', border: `1px solid ${project.accent}25` }}
          >
            <h3 className="text-[10px] font-bold uppercase tracking-widest font-mono mb-2"
              style={{ color: project.accent }}>
              Impact
            </h3>
            <p className="text-sm text-[var(--color-text)] leading-relaxed">{project.impact}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)] font-mono mb-3">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div
                    className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: project.accent + '18', border: `1px solid ${project.accent}25` }}
                  >
                    <FaCheck size={8} style={{ color: project.accent }} />
                  </div>
                  <span className="text-sm text-[var(--color-text)]">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)] font-mono mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(t => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[var(--color-text)]"
                  style={{
                    background: project.accent + '0F',
                    border: `1px solid ${project.accent}25`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: `linear-gradient(135deg, ${project.gradFrom}, ${project.gradTo})` }}
              >
                <FaExternalLinkAlt size={12} /> Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold text-[var(--color-text)] transition-all hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border-light)' }}
              >
                <FaGithub size={14} /> Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Category Label ───────────────────────────────────────────────────────────
const CategoryLabel = ({ label, count, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className="flex items-center gap-4 mb-8"
  >
    <div className="flex items-center gap-3">
      <div className="w-1 h-8 rounded-full" style={{ background: color }} />
      <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-heading)]">
        {label}
      </h3>
      <span
        className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono"
        style={{ background: color + '15', color, border: `1px solid ${color}30` }}
      >
        {count}
      </span>
    </div>
    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }} />
  </motion.div>
)

// ─── Main Projects Section ────────────────────────────────────────────────────
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <>
      <section id="projects" className="section-padding relative">
        {/* Background ambiance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/4 top-0 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)', transform: 'translate(-50%, -30%)' }} />
          <div className="absolute right-1/4 bottom-0 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)', filter: 'blur(50px)', transform: 'translate(50%, 30%)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-center mb-20"
          >
            <SectionBadge>Portfolio</SectionBadge>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[var(--color-heading)]">
              Professional Projects
            </h2>
            <p className="mt-5 text-lg text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
              From client-commissioned products to independent experiments — work that ships,
              scales, and creates measurable impact.
            </p>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-6 mt-10"
            >
              {[
                { v: '5',   l: 'Projects',       c: '#6C63FF' },
                { v: '2',   l: 'Categories',      c: '#00D4FF' },
                { v: '3',   l: 'Live Deployments',c: '#10B981' },
                { v: '10+', l: 'Technologies',    c: '#F59E0B' },
              ].map(({ v, l, c }) => (
                <div key={l} className="flex flex-col items-center gap-0.5">
                  <span className="text-2xl font-display font-bold" style={{ color: c }}>{v}</span>
                  <span className="text-xs text-[var(--color-muted)] font-medium">{l}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Client Projects ── */}
          <div className="mb-20">
            <CategoryLabel
              label="Client Projects"
              count={clientProjects.length}
              color="#00D4FF"
              delay={0}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientProjects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} onOpen={setSelectedProject} />
              ))}
            </div>
          </div>

          {/* ── Personal Projects ── */}
          <div>
            <CategoryLabel
              label="Personal Projects"
              count={personalProjects.length}
              color="#6C63FF"
              delay={0.1}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {personalProjects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} onOpen={setSelectedProject} />
              ))}
            </div>
          </div>

          {/* ── GitHub CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-20"
          >
            <p className="text-sm text-[var(--color-muted)] mb-4">
              More experiments and contributions available on GitHub
            </p>
            <a
              href="https://github.com/Chanikyachowdarysamineni"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm text-[var(--color-text)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border-light)' }}
            >
              <FaGithub size={18} />
              <span>Explore GitHub Profile</span>
              <FaArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Case Study Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Projects
