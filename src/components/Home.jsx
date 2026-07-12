import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload, FaArrowRight } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'

const Home = () => {
  const socialLinks = [
    { href: 'https://github.com/Chanikyachowdarysamineni', Icon: FaGithub, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/', Icon: FaLinkedin, label: 'LinkedIn' },
    { href: 'https://leetcode.com/u/oO8MDDX40s/', Icon: SiLeetcode, label: 'LeetCode' },
    { href: 'mailto:chanikyachowdary86@gmail.com', Icon: FaEnvelope, label: 'Email' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[var(--color-background)]">
      
      {/* Subtle Background Accent */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-[var(--color-violet)] opacity-[0.05] blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--color-coral)] opacity-[0.05] blur-[100px] pointer-events-none" />

      <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 z-10"
        >
          {/* Availability Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-surface)] text-[var(--color-heading)] border border-[var(--color-border)] shadow-soft">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for opportunities
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-[var(--color-heading)] leading-[1.1]">
              Chanikya Chowdary Samineni
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-[var(--color-body)] leading-relaxed">
              Full Stack Developer | Mobile App Developer | AI & ML Enthusiast <br className="hidden lg:block" /> Building Innovative Web, Mobile, and AI-Powered Solutions
            </p>
            <p className="text-base sm:text-lg text-[var(--color-muted)] max-w-lg leading-relaxed">
              Motivated Computer Science undergraduate seeking an entry-level position as a Full Stack Developer to apply technical skills, solve real-world problems, and grow as a software professional.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-cta shadow-glow-accent hover:-translate-y-1 transition-all duration-300"
            >
              View My Work
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
            </a>
            
            <a
              href="/Resume_CCS.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-[var(--color-heading)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-soft hover:border-[var(--color-charcoal)] transition-all duration-300"
            >
              <FaFileDownload className="text-[var(--color-muted)] group-hover:text-[var(--color-heading)] transition-colors" size={14} />
              Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-5 pt-4">
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] hover:text-[var(--color-heading)] transition-colors"
                aria-label={label}
              >
                <Icon size={22} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Visual / Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            {/* Avatar container */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-soft-lg bg-white/5 border-2 border-white/10 z-10">
              <img
                src="/profile.jpg"
                alt="Chanikya Chowdary Samineni"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling.style.display = 'flex'
                }}
              />
              {/* Fallback */}
              <div
                className="hidden absolute inset-0 items-center justify-center text-6xl font-bold text-[var(--color-muted)] bg-[var(--color-background)]"
              >
                CS
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Home
