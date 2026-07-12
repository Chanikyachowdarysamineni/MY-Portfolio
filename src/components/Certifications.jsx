import { motion } from 'framer-motion'
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa'
import { SiHackerrank, SiGooglecloud, SiSap } from 'react-icons/si'

const certificationsList = [
  {
    title: 'Google Cloud Cybersecurity',
    issuer: 'Google',
    icon: SiGooglecloud,
    color: '#4285F4',
    link: 'https://www.credly.com/badges/fb685048-9325-47d6-8cd6-5cad2830dc82/linked_in_profile'
  },
  {
    title: 'SAP S/4HANA Cloud Private Edition: Sourcing & Procurement',
    issuer: 'SAP',
    icon: SiSap,
    color: '#0FAAFF',
    link: 'https://www.credly.com/badges/e503a225-eb44-4d61-ac2c-e3839841e6b4/public_url'
  },
  {
    title: 'Software Engineer',
    issuer: 'HackerRank',
    icon: SiHackerrank,
    color: '#00EA64',
    link: 'https://www.hackerrank.com/certificates/b699532ca2f9'
  },
  {
    title: 'Python (Basic)',
    issuer: 'HackerRank',
    icon: SiHackerrank,
    color: '#00EA64',
    link: 'https://www.hackerrank.com/certificates/86d16de404c5'
  }
]

const CertificationCard = ({ cert, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 hover:shadow-soft-xl hover:border-[var(--color-primary)]/30 transition-all duration-300 flex flex-col h-full"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center">
        <cert.icon size={24} style={{ color: cert.color }} />
      </div>
      {cert.link && (
        <a 
          href={cert.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors p-2"
        >
          <FaExternalLinkAlt size={14} />
        </a>
      )}
    </div>
    
    <h3 className="text-lg font-bold text-[var(--color-heading)] mb-2 flex-grow">
      {cert.title}
    </h3>
    
    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-[var(--color-border)]">
      <FaCertificate size={12} className="text-[var(--color-muted)]" />
      <span className="text-sm font-medium text-[var(--color-body)]">{cert.issuer}</span>
    </div>
  </motion.div>
)

const Certifications = () => {
  return (
    <section id="certifications" className="py-32 px-4 sm:px-6 relative max-w-7xl mx-auto">
      <div className="text-center mb-24 space-y-4">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-ink)] text-[var(--color-bone)]">
          Achievements
        </div>
        <h2 className="text-5xl sm:text-6xl font-display font-bold tracking-tight text-[var(--color-heading)]">
          Certifications
        </h2>
        <p className="text-[var(--color-muted)] text-lg sm:text-xl max-w-2xl mx-auto font-medium">
          Professional certifications and industry-recognized credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {certificationsList.map((cert, index) => (
          <CertificationCard key={index} cert={cert} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Certifications
