import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaTimes, FaHome, FaUser, FaBriefcase, FaCode, FaFolderOpen, FaTrophy, FaEnvelope, FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'

const commands = [
  { id: 'home',     label: 'Go to Home',           icon: FaHome,       section: 'home',     type: 'navigate' },
  { id: 'about',    label: 'Go to About',           icon: FaUser,       section: 'about',    type: 'navigate' },
  { id: 'experience', label: 'Go to Experience',   icon: FaBriefcase,  section: 'experience', type: 'navigate' },
  { id: 'leadership', label: 'Go to Leadership',   icon: FaUser,       section: 'leadership', type: 'navigate' },
  { id: 'skills',   label: 'Go to Skills',          icon: FaCode,       section: 'skills',   type: 'navigate' },
  { id: 'projects', label: 'Go to Projects',        icon: FaFolderOpen, section: 'projects', type: 'navigate' },
  { id: 'achievements', label: 'Go to Achievements',icon: FaTrophy,     section: 'achievements', type: 'navigate' },
  { id: 'whyhireme', label: 'Go to Why Hire Me',   icon: FaTrophy,     section: 'whyhireme', type: 'navigate' },
  { id: 'contact',  label: 'Go to Contact',         icon: FaEnvelope,   section: 'contact',  type: 'navigate' },
  { id: 'github',   label: 'Open GitHub Profile',   icon: FaGithub,     href: 'https://github.com/Chanikyachowdarysamineni', type: 'link' },
  { id: 'linkedin', label: 'Open LinkedIn Profile', icon: FaLinkedin,   href: 'https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/', type: 'link' },
  { id: 'leetcode', label: 'Open LeetCode Profile', icon: SiLeetcode,   href: 'https://leetcode.com/u/oO8MDDX40s/', type: 'link' },
  { id: 'email',    label: 'Send Email',            icon: FaEnvelope,   href: 'mailto:chanikyachowdary86@gmail.com', type: 'link' },
  { id: 'resume',   label: 'Download Resume',       icon: FaFileDownload, href: '/Resume_CCS.pdf', type: 'link' },
]

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)

  const filtered = query.trim()
    ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    setSelected(0)
  }, [query])

  const execute = (cmd) => {
    if (cmd.type === 'navigate') {
      const el = document.getElementById(cmd.section)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else if (cmd.type === 'link') {
      window.open(cmd.href, cmd.href.startsWith('mailto') ? '_self' : '_blank')
    }
    onClose()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown')  { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp')    { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
    if (e.key === 'Enter')      { e.preventDefault(); if (filtered[selected]) execute(filtered[selected]) }
    if (e.key === 'Escape')     onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="command-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="command-palette mx-4"
            onClick={e => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--color-border)]">
              <FaSearch size={16} className="text-[var(--color-muted)] shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search commands, sections, or links..."
                className="flex-1 bg-transparent text-[var(--color-heading)] placeholder:text-[var(--color-muted)] text-sm outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-[var(--color-muted)] hover:text-[var(--color-text)]">
                  <FaTimes size={14} />
                </button>
              )}
              <kbd className="px-2 py-1 rounded text-[10px] font-mono text-[var(--color-muted)] bg-[var(--color-border)] border border-[var(--color-border-light)]">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="py-2 max-h-80 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-[var(--color-muted)]">No commands found</p>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      i === selected
                        ? 'bg-[rgba(108,99,255,0.12)] text-[var(--color-heading)]'
                        : 'text-[var(--color-text)] hover:bg-[rgba(255,255,255,0.04)]'
                    }`}
                    onClick={() => execute(cmd)}
                    onMouseEnter={() => setSelected(i)}
                  >
                    <cmd.icon size={15} className={i === selected ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted)]'} />
                    <span>{cmd.label}</span>
                    {cmd.type === 'link' && (
                      <span className="ml-auto text-[10px] text-[var(--color-muted)] bg-[var(--color-border)] px-1.5 py-0.5 rounded font-mono">
                        ↗
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 px-4 py-2.5 border-t border-[var(--color-border)] text-[10px] text-[var(--color-muted)]">
              <span><kbd className="bg-[var(--color-border)] px-1.5 py-0.5 rounded font-mono">↑↓</kbd> navigate</span>
              <span><kbd className="bg-[var(--color-border)] px-1.5 py-0.5 rounded font-mono">↵</kbd> select</span>
              <span><kbd className="bg-[var(--color-border)] px-1.5 py-0.5 rounded font-mono">Ctrl K</kbd> toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
