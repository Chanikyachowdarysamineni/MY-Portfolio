import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

const VisitorForm = ({ onSubmit, isOpen }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      await onSubmit(formData)
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md mx-4 rounded-2xl shadow-2xl border p-8"
            style={{
              background: 'linear-gradient(to bottom right, rgba(34,34,59,0.95), rgba(74,78,105,0.9), rgba(34,34,59,0.95))',
              border: '1px solid rgba(201,173,167,0.3)',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => {}}
              className="absolute top-4 right-4 text-amber-200 hover:text-white transition-colors"
              aria-label="Close"
            >
              <FaTimes size={20} />
            </button>

            {/* Content */}
            {!submitted ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Welcome! 👋
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Please share your details before exploring the portfolio
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-amber-50 mb-2"
                    >
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-2 rounded-lg bg-amber-900/20 border ${
                        errors.fullName ? 'border-red-500' : 'border-amber-600/40'
                      } text-white placeholder-amber-300/50 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-amber-50 mb-2"
                    >
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-2 rounded-lg bg-amber-900/20 border ${
                        errors.email ? 'border-red-500' : 'border-amber-600/40'
                      } text-white placeholder-amber-300/50 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Submit Error */}
                  {errors.submit && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                      {errors.submit}
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 py-2 px-4 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(to right, #c9ada7, #9a8c98)',
                    }}
                  >
                    {loading ? 'Submitting...' : 'Continue to Portfolio'}
                  </motion.button>
                </form>
              </>
            ) : (
              // Success Message
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-4"
                >
                  <span className="text-green-500 text-xl">✓</span>
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Thank you!
                </h3>
                <p className="text-slate-400 text-sm">
                  Your information has been saved successfully
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default VisitorForm
