import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUsers, FaEnvelope, FaCalendar, FaSyncAlt, FaTimes, FaEye } from 'react-icons/fa'
import axios from 'axios'

const AdminDashboard = ({ isOpen, onClose, visitorEmail }) => {
  const [visitors, setVisitors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalVisitors, setTotalVisitors] = useState(0)
  const [emailVisitCount, setEmailVisitCount] = useState({})

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

  useEffect(() => {
    if (isOpen) {
      fetchVisitors()
    }
  }, [isOpen])

  const fetchVisitors = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${BACKEND_URL}/api/visitors/all`)
      if (response.data.success) {
        const visitorsList = response.data.data
        setVisitors(visitorsList)
        setTotalVisitors(visitorsList.length)

        // Count visits per email
        const emailCounts = {}
        visitorsList.forEach((visitor) => {
          emailCounts[visitor.email] = (emailCounts[visitor.email] || 0) + 1
        })
        setEmailVisitCount(emailCounts)
      }
    } catch (err) {
      setError('Failed to fetch visitors: ' + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl"
            style={{
              background: 'linear-gradient(to bottom right, rgba(34,34,59,0.95), rgba(74,78,105,0.9), rgba(34,34,59,0.95))',
              border: '1px solid rgba(201,173,167,0.2)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors z-10"
            >
              <FaTimes size={20} />
            </button>

            <div className="p-8">
              {/* Header */}
              <motion.div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                  <FaUsers className="text-amber-400" />
                  Portfolio Visitors Analytics
                </h2>
                <p className="text-slate-400">
                  View and track all portfolio visitor information
                </p>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4"
                  style={{
                    background: 'linear-gradient(to bottom right, rgba(201,173,167,0.1), rgba(201,173,167,0.05))',
                    border: '1px solid rgba(201,173,167,0.3)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <FaUsers className="text-amber-300 text-xl" />
                    <div>
                      <p className="text-slate-400 text-xs sm:text-sm">Total Visits</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">
                        {totalVisitors}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br rounded-lg p-4"
                  style={{
                    background: 'linear-gradient(to bottom right, rgba(154,140,152,0.1), rgba(154,140,152,0.05))',
                    border: '1px solid rgba(154,140,152,0.3)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-amber-300 text-xl" />
                    <div>
                      <p className="text-slate-400 text-xs sm:text-sm">Unique Emails</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">
                        {Object.keys(emailVisitCount).length}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={fetchVisitors}
                  className="bg-gradient-to-br rounded-lg p-4 cursor-pointer group"
                  style={{
                    background: 'linear-gradient(to bottom right, rgba(74,78,105,0.1), rgba(74,78,105,0.05))',
                    border: '1px solid rgba(74,78,105,0.3)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <FaSyncAlt className="text-amber-300 text-xl group-hover:rotate-180 transition-transform duration-300" />
                    <div>
                      <p className="text-slate-400 text-xs sm:text-sm">Refresh</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">
                        {loading ? 'Updating...' : 'Ready'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Visitors Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden"
              >
                {loading ? (
                  <div className="p-8 text-center">
                    <p className="text-slate-400">Loading visitors...</p>
                  </div>
                ) : visitors.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-slate-400">
                      No visitors yet. Share your portfolio!
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-700/50 bg-slate-700/20">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300">
                            Email
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300">
                            Visits
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300">
                            Visited
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {visitors.map((visitor, index) => (
                          <motion.tr
                            key={visitor._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                          >
                            <td className="px-4 py-3 text-xs sm:text-sm text-white font-medium">
                              {visitor.fullName}
                            </td>
                            <td className="px-4 py-3 text-xs sm:text-sm text-slate-400">
                              {visitor.email}
                            </td>
                            <td className="px-4 py-3 text-xs sm:text-sm text-slate-400">
                              <motion.span
                                whileHover={{ scale: 1.1 }}
                                className="inline-flex items-center gap-1 bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded"
                              >
                                <FaEye size={12} />
                                {emailVisitCount[visitor.email] || 1}
                              </motion.span>
                            </td>
                            <td className="px-4 py-3 text-xs sm:text-sm text-slate-400 flex items-center gap-1">
                              <FaCalendar size={12} />
                              {formatDate(visitor.visitedAt)}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AdminDashboard
