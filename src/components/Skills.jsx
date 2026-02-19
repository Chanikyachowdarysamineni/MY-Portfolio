import { motion } from 'framer-motion'
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaJava,
} from 'react-icons/fa'
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiSocketdotio,
  SiFirebase,
  SiMysql,
  SiTypescript,
  SiVite,
  SiNetlify,
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Technical Skills',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
        { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
        { name: 'React', icon: FaReact, color: '#61DAFB' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'React Native', icon: FaReact, color: '#61DAFB' },
        { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
        { name: 'Express.js', icon: SiExpress, color: '#000000' },
        { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'Socket.io', icon: SiSocketdotio, color: '#010101' },
        { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
        { name: 'Python', icon: FaPython, color: '#3776AB' },
        { name: 'REST API', icon: TbApi, color: '#8b5cf6' },
      ],
    },
    {
      title: 'Other Skills',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'Git', icon: FaGitAlt, color: '#F05032' },
        { name: 'GitHub', icon: FaGithub, color: '#181717' },
        { name: 'Vite', icon: SiVite, color: '#646CFF' },
        { name: 'Netlify', icon: SiNetlify, color: '#00C7B7' },
      ],
    },
    {
      title: 'Programming Languages',
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'C', icon: FaDatabase, color: '#A8B9CC' },
        { name: 'Java', icon: FaJava, color: '#007396' },
        { name: 'Python', icon: FaPython, color: '#3776AB' },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  }

  const categoryVariants = {
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
    <section id="skills" className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
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
              scale: [1, 1.3, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-cosmic-cyan/20 to-cosmic-blue/20 rounded-full blur-3xl"
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
              Skills & Expertise
            </span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto backdrop-blur-sm bg-white/5 px-4 sm:px-6 py-2 sm:py-3 rounded-full inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Technologies and tools I work with to bring ideas to life
          </motion.p>
        </motion.div>

        {/* Skills Categories */}
        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={categoryVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-8"
            >
              {/* Category Title */}
              <div className="flex items-center gap-2 sm:gap-4">
                <motion.div
                  className={`h-1 flex-grow bg-gradient-to-r ${category.color} rounded-full`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white whitespace-nowrap px-2">
                  {category.title}
                </h3>
                <motion.div
                  className={`h-1 flex-grow bg-gradient-to-l ${category.color} rounded-full`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>

              {/* Skills Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
              >
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.15,
                      rotate: [0, -5, 5, -5, 0],
                      y: -10,
                      transition: { duration: 0.5 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/10 hover:border-cosmic-purple/50 transition-all duration-500 flex flex-col items-center gap-2 sm:gap-3 md:gap-4 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-cosmic-purple/20">
                      {/* Icon */}
                      <motion.div
                        className="text-3xl sm:text-4xl md:text-5xl"
                        style={{ color: skill.color }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <skill.icon />
                      </motion.div>

                      {/* Name */}
                      <div className="text-center">
                        <p className="text-white font-semibold text-xs sm:text-sm group-hover:text-cosmic-purple transition-colors">
                          {skill.name}
                        </p>
                      </div>

                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${skill.color}20, transparent 70%)`,
                        }}
                      />

                      {/* Glassmorphism shine */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
                        }}
                      />
                      
                      {/* Animated border */}
                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `conic-gradient(from 0deg, transparent, ${skill.color}50, transparent)`,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-16 md:mt-20 text-center px-4"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="inline-block relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl hover:shadow-cosmic-purple/30 overflow-hidden"
            style={{
              boxShadow: '0 8px 32px 0 rgba(139, 92, 246, 0.2)',
            }}
          >
            {/* Animated background gradient */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))',
                backgroundSize: '200% 200%',
              }}
            />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 relative z-10 font-medium">
              Always learning and exploring new technologies to stay ahead in the ever-evolving world of web development.
            </p>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-3xl sm:text-4xl md:text-5xl relative z-10 filter drop-shadow-lg"
            >
              📚 💻 🚀
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
