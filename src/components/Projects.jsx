import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const Projects = () => {
  const projects = [
    {
      title: 'Mahotsav Portal',
      tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Socket.io', 'Firebase'],
      gradient: 'from-purple-500 to-pink-500',
      github: 'https://github.com/Chanikyachowdarysamineni',
      live: 'https://vignanmahotsav.in/'
    },
    {
      title: 'Safe Chat AI',
      tags: ['React', 'AI', 'Tailwind CSS', 'Firebase', 'Real-time Chat'],
      gradient: 'from-cyan-500 to-blue-500',
      github: 'https://github.com/Chanikyachowdarysamineni/Safe-Chat-AI.git',
      live: 'https://safe-chat-ai.netlify.app/'
    },
    {
      title: 'CSE-HUB',
      tags: ['React', 'Dashboard', 'Notifications', 'Real-time'],
      gradient: 'from-green-500 to-teal-500',
      github: 'https://github.com/Chanikyachowdarysamineni/CSE-HUB.git',
      live: 'https://github.com/Chanikyachowdarysamineni/CSE-HUB.git'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="projects" className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          {/* Decorative glass orb */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-cosmic-purple/20 to-cosmic-cyan/20 rounded-full blur-3xl"
          />
          
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 relative z-10"
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="bg-gradient-to-r from-cosmic-purple to-cosmic-cyan bg-clip-text text-transparent drop-shadow-lg">
              Featured Projects
            </span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto backdrop-blur-sm bg-white/5 px-4 sm:px-6 py-2 sm:py-3 rounded-full inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Showcasing my recent work and creative solutions
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 hover:border-cosmic-purple/50 transition-all duration-300 shadow-lg hover:shadow-cosmic-purple/20">
                {/* Gradient Overlay */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`} />

                {/* Content */}
                <div className="p-4 flex flex-col">
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-cosmic-purple transition-colors">
                    {project.title}
                  </h3>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-full text-cosmic-purple text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                    >
                      <FaGithub />
                      <span>GitHub</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white rounded-lg hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all text-sm"
                    >
                      <FaExternalLinkAlt />
                      <span>Live</span>
                    </motion.a>
                  </div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15), transparent 70%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/Chanikyachowdarysamineni"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 border-2 border-cosmic-purple text-cosmic-purple rounded-full font-semibold hover:bg-cosmic-purple/10 transition-all"
          >
            View All Projects on GitHub →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
