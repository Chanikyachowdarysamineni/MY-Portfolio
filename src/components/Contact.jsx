import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import { useState } from 'react'

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormState({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }, 1500)
  }

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const contactLinks = [
    { icon: FaEnvelope, label: 'Email', value: 'chanikyachowdary86@gmail.com', href: 'mailto:chanikyachowdary86@gmail.com' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'India', href: '#' },
    { icon: FaLinkedin, label: 'LinkedIn', value: 'Chanikya Chowdary', href: 'https://www.linkedin.com/in/chanikya-chowdary-samineni-245659318/' },
    { icon: FaGithub, label: 'GitHub', value: 'Chanikyachowdarysamineni', href: 'https://github.com/Chanikyachowdarysamineni' },
  ]

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-ink)] text-[var(--color-bone)]">
            Get In Touch
          </div>
          <h2 className="text-5xl sm:text-6xl font-display font-bold tracking-tight text-[var(--color-heading)]">
            Let's Connect
          </h2>
          <p className="text-[var(--color-muted)] text-lg sm:text-xl max-w-2xl mx-auto font-medium">
            Have a project in mind, looking for a developer, or just want to chat? Drop me a message!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 shadow-soft">
              <h3 className="text-2xl font-bold text-[var(--color-heading)] mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] group-hover:text-[var(--color-primary)] group-hover:border-[var(--color-primary)]/30 transition-colors">
                      <link.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--color-muted)]">{link.label}</p>
                      <p className="text-base font-semibold text-[var(--color-body)] group-hover:text-[var(--color-heading)] transition-colors">
                        {link.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 shadow-soft"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[var(--color-heading)]">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-body)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[var(--color-heading)]">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-body)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-[var(--color-heading)]">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-body)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white transition-all duration-300 ${
                  submitted 
                    ? 'bg-green-500' 
                    : 'bg-gradient-cta hover:shadow-glow-accent'
                }`}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : submitted ? (
                  <span>Message Sent!</span>
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane size={14} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
