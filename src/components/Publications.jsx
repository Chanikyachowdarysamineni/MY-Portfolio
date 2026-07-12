import { motion } from 'framer-motion'
import { FaBookOpen, FaUserGraduate, FaExternalLinkAlt, FaFilePdf } from 'react-icons/fa'

const publicationsList = [
  {
    title: 'Machine Learning-Based Weather Forecasting',
    publisher: 'IEEE Conference Publication',
    role: 'Main Author',
    description: 'A comprehensive study on predicting weather patterns using advanced machine learning algorithms and neural networks, improving accuracy over traditional meteorological models.',
    link: 'https://ieeexplore.ieee.org/document/11324360',
    pdf: '/ML_Weather_Forecasting_Paper.pdf'
  }
]

const PublicationCard = ({ pub, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 hover:shadow-soft-xl hover:border-[var(--color-primary)]/30 transition-all duration-300 flex flex-col"
  >
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 shrink-0 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)]">
          <FaBookOpen size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[var(--color-heading)] mb-2">
            {pub.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-[var(--color-body)]">
            <span className="flex items-center gap-1.5 text-[var(--color-primary)]">
              {pub.publisher}
            </span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-[var(--color-border)]" />
            <span className="flex items-center gap-1.5">
              <FaUserGraduate size={14} className="text-[var(--color-muted)]" />
              {pub.role}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
      {pub.description}
    </p>

    <div className="flex gap-4 mt-auto pt-4 border-t border-[var(--color-border)]">
      {pub.link && (
        <a
          href={pub.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
        >
          <span>View on IEEE</span>
          <FaExternalLinkAlt size={12} />
        </a>
      )}
      {pub.pdf && (
        <a
          href={pub.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-[var(--color-heading)] hover:text-[var(--color-primary)] transition-colors"
        >
          <FaFilePdf size={14} className="text-[var(--color-muted)]" />
          <span>Read Paper</span>
        </a>
      )}
    </div>
  </motion.div>
)

const Publications = () => {
  return (
    <section id="publications" className="py-32 px-4 sm:px-6 relative max-w-4xl mx-auto">
      <div className="text-center mb-24 space-y-4">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-ink)] text-[var(--color-bone)]">
          Research
        </div>
        <h2 className="text-5xl sm:text-6xl font-display font-bold tracking-tight text-[var(--color-heading)]">
          Publications
        </h2>
        <p className="text-[var(--color-muted)] text-lg sm:text-xl max-w-2xl mx-auto font-medium">
          Academic research and technical papers I have authored.
        </p>
      </div>

      <div className="space-y-6">
        {publicationsList.map((pub, index) => (
          <PublicationCard key={index} pub={pub} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Publications
