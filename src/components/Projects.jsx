import { motion } from 'framer-motion'
import { useRef } from 'react'
import {
  FaGithub, FaExternalLinkAlt, FaArrowRight,
  FaCalendarAlt, FaShieldAlt, FaTerminal, FaLayerGroup, FaBolt, FaClipboardList,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa'

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

const CaseStudyCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden hover:shadow-2xl hover:border-[var(--color-coral)]/40 transition-all duration-500"
    >
      <div className="p-6 sm:p-8 flex flex-col gap-6 h-full">
        
        {/* Top Side: Story */}
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-coral)] group-hover:scale-110 transition-transform duration-500">
              <project.emoji size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-heading)] group-hover:text-[var(--color-coral)] transition-colors duration-300 line-clamp-2">
              {project.title}
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-violet)] mb-1.5">The Challenge</h4>
              <p className="text-sm text-[var(--color-body)] leading-relaxed">
                {project.challenge}
              </p>
            </div>
            
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-violet)] mb-1.5">The Process</h4>
              <p className="text-sm text-[var(--color-body)] leading-relaxed">
                {project.process}
              </p>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-coral)] mb-1.5">The Impact</h4>
              <p className="text-sm font-medium text-[var(--color-heading)] leading-relaxed">
                {project.impact}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Side: Tech & Links */}
        <div className="flex flex-col border-t border-[var(--color-border)] pt-5 mt-auto">
          <div className="flex-grow">
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-body)] group-hover:border-[var(--color-violet)]/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-white bg-[var(--color-coral)] shadow-glow-accent hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Live Demo</span>
                <FaExternalLinkAlt size={12} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-[var(--color-heading)] bg-[var(--color-background)] border-2 border-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-[var(--color-bone)] transition-all duration-300"
              >
                <span>Source</span>
                <FaGithub size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const scrollContainerRef = useRef(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -600, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 600, behavior: 'smooth' })
    }
  }

  const projects = [
    {
      title: 'Safe Chat AI',
      challenge: 'Online platforms struggle with toxic behavior and inappropriate content, manual moderation is slow and inefficient at scale.',
      process: 'Developed an AI-powered moderation engine using Natural Language Processing to analyze messages in real-time before they reach the recipient. Built a robust MERN stack backend with secure JWT authentication.',
      impact: 'Successfully filters toxic messages in real-time, providing a safe, seamless chat experience for users while reducing moderation overhead by 90%.',
      tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Machine Learning', 'NLP'],
      emoji: FaShieldAlt,
      github: 'https://github.com/Chanikyachowdarysamineni/Safe-Chat-AI.git',
      live: 'https://safe-chat-ai.netlify.app/',
    },

    {
      title: 'Inventory Management System',
      challenge: 'Managing electrical component stock manually using spreadsheets was prone to errors, leading to stockouts and workflow bottlenecks.',
      process: 'Architected a comprehensive web-based dashboard using the MERN stack. Implemented secure CRUD operations, stock tracking algorithms, and a MongoDB schema optimized for fast querying and data integrity.',
      impact: 'Streamlined the entire inventory workflow, providing administrators with real-time stock visibility and automated alerts for low inventory items.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'MERN Stack'],
      emoji: FaBolt,
      live: 'https://electricity-inventory-management-ivm.onrender.com',
    },
    {
      title: 'Mahotsav Website',
      challenge: 'College festivals require a centralized platform capable of handling high traffic for ticketing, live schedules, and attendee management.',
      process: 'Built a full-featured event management platform powered by Socket.io for live updates. Implemented Firebase for real-time data sync and deployed a highly scalable Node.js backend.',
      impact: 'Successfully managed thousands of concurrent users during the festival, ensuring zero downtime for ticketing and real-time announcements.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Socket.io', 'Firebase'],
      emoji: FaCalendarAlt,
      github: 'https://github.com/Chanikyachowdarysamineni/Mahotsav-Website.git',
      live: 'https://vignanmahotsav.in/',
    },
    {
      title: 'CSE-HUB',
      challenge: 'CS department students lacked a centralized platform for academic resources, event tracking, and department announcements.',
      process: 'Built a robust student hub featuring real-time notifications and an intuitive dashboard using React.',
      impact: 'Centralized all departmental communications and resources, significantly improving student engagement and information accessibility.',
      tags: ['React', 'Dashboard', 'Notifications', 'Real-time', 'UI/UX'],
      emoji: FaLayerGroup,
      github: 'https://github.com/Chanikyachowdarysamineni/CSE-HUB.git',
      live: 'https://github.com/Chanikyachowdarysamineni/CSE-HUB.git',
    },
    {
      title: 'Faculty Workload Management',
      challenge: 'Administrators struggled to manually balance and track teaching loads across the faculty staff.',
      process: 'Developed a comprehensive workload management system with detailed analytics and scheduling tools.',
      impact: 'Optimized teaching load distribution, saving hours of manual administrative work and ensuring fair assignment distribution.',
      tags: ['Faculty Management', 'Workload Tracking', 'Dashboard', 'Analytics', 'Administration'],
      emoji: FaClipboardList,
      github: 'https://github.com/Chanikyachowdarysamineni',
      live: 'https://160.187.169.41/csefaculty/',
    },
    {
      title: 'CoCreateX',
      challenge: 'Creative teams needed a dedicated space to co-create, share, and manage complex projects without fragmented tools.',
      process: 'Architected a real-time collaborative platform with intuitive workflows and seamless communication tools using React.',
      impact: 'Streamlined the creative process, empowering teams to collaborate more effectively in a single, unified environment.',
      tags: ['React', 'Collaboration', 'Real-time', 'UI/UX', 'Creative Platform'],
      emoji: FaLayerGroup,
      github: 'https://github.com/Chanikyachowdarysamineni',
      live: 'https://cocreatez-frontend.onrender.com',
    },
  ]

  return (
    <section id="projects" className="py-32 px-4 sm:px-6 relative">
      <div className="max-w-[100vw] mx-auto overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Case Studies"
            title="Professional Projects"
            subtitle="Deep dives into the problems I've solved, the processes I've engineered, and the impact delivered."
          />
        </div>

        <div className="flex justify-end gap-4 px-4 sm:px-16 lg:px-24 mb-6 max-w-6xl mx-auto">
          <button 
            onClick={scrollLeft}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-heading)] hover:text-[var(--color-coral)] hover:border-[var(--color-coral)]/50 hover:shadow-glow-accent transition-all duration-300"
            aria-label="Previous project"
          >
            <FaChevronLeft size={16} />
          </button>
          <button 
            onClick={scrollRight}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-heading)] hover:text-[var(--color-coral)] hover:border-[var(--color-coral)]/50 hover:shadow-glow-accent transition-all duration-300"
            aria-label="Next project"
          >
            <FaChevronRight size={16} />
          </button>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 sm:gap-8 px-4 sm:px-16 lg:px-24 pb-12 snap-x snap-mandatory hide-scrollbar"
        >
          {projects.map((project, index) => (
            <div key={index} className="min-w-[85vw] sm:min-w-[350px] lg:min-w-[420px] snap-center flex items-stretch">
              <CaseStudyCard project={project} index={index} />
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/Chanikyachowdarysamineni"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base text-[var(--color-heading)] bg-transparent border-2 border-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-[var(--color-bone)] transition-all duration-300 group"
          >
            <FaGithub size={20} />
            <span>View Archive on GitHub</span>
            <FaArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
