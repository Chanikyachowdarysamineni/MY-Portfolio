import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa'
import { SiMongodb, SiExpress, SiTailwindcss, SiFirebase, SiSocketdotio } from 'react-icons/si'

const Projects = () => {
  const projects = [
    {
      title: 'Mahotsav Portal',
      description: 'A comprehensive event management platform featuring real-time updates, user authentication, and dynamic content management. Built with modern web technologies for optimal performance.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Socket.io', 'Firebase'],
      image: '🎉',
      gradient: 'from-purple-500 to-pink-500',
      github: 'https://github.com/Chanikyachowdarysamineni',
      live: 'https://vignanmahotsav.in/',
      icons: [FaReact, FaNodeJs, SiMongodb, SiExpress, SiSocketdotio, SiFirebase]
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
    <section id="projects" className="min-h-screen py-20 px-6 relative">
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
            className="text-5xl md:text-6xl font-bold mb-4 relative z-10"
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
            className="text-gray-400 text-lg max-w-2xl mx-auto backdrop-blur-sm bg-white/5 px-6 py-3 rounded-full inline-block"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -15,
                rotateZ: 2,
                transition: { duration: 0.3 }
              }}
              className="group relative perspective-1000"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card */}
              <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-cosmic-purple/50 transition-all duration-500 shadow-2xl hover:shadow-cosmic-purple/20">
                {/* Gradient Overlay */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${project.gradient}`} />

                {/* Content */}
                <div className="p-6 flex flex-col h-full">
                  {/* Icon/Emoji */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-6xl mb-4"
                  >
                    {project.image}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cosmic-purple transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-4 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Icons */}
                  <div className="flex gap-3 mb-4">
                    {project.icons.map((Icon, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="text-cosmic-cyan text-xl"
                      >
                        <Icon />
                      </motion.div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-full text-cosmic-purple text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 mt-auto pt-4 border-t border-gray-800">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      <FaGithub />
                      <span>Code</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.live}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white rounded-lg hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all"
                    >
                      <FaExternalLinkAlt />
                      <span>Live</span>
                    </motion.a>
                  </div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.2), transparent 70%)`,
                  }}
                />
                
                {/* Glassmorphism shine effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
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
