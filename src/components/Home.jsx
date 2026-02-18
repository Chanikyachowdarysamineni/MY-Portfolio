import { motion } from 'framer-motion'
import { FaRocket, FaCode } from 'react-icons/fa'

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20"
    >
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 z-10"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <span className="px-4 py-2 bg-cosmic-purple/20 border border-cosmic-purple/50 rounded-full text-cosmic-purple text-sm font-semibold">
              👋 Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-cosmic-purple via-cosmic-blue to-cosmic-cyan bg-clip-text text-transparent">
              Chanikya!
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-gray-300 leading-relaxed">
            A <span className="text-cosmic-cyan font-semibold">Full Stack Web Developer</span> who is passionate about
            creating beautiful, functional and responsive websites.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <motion.a
              whileHover={{ 
                scale: 1.08,
                boxShadow: '0 0 40px rgba(139, 92, 246, 0.8), 0 0 80px rgba(139, 92, 246, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white rounded-full font-semibold flex items-center gap-2 overflow-hidden shadow-lg shadow-cosmic-purple/30 backdrop-blur-sm"
              style={{
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{
                  transform: 'skewX(-20deg)',
                }}
              />
              <FaRocket className="group-hover:animate-bounce relative z-10" />
              <span className="relative z-10">View My Work</span>
            </motion.a>

            <motion.a
              whileHover={{ 
                scale: 1.08,
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              href="mailto:chanikyachowdary86@gmail.com"
              className="relative px-8 py-4 border-2 border-cosmic-purple text-cosmic-purple rounded-full font-semibold backdrop-blur-sm bg-white/5 transition-all flex items-center gap-2 overflow-hidden"
            >
              {/* Animated border glow */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
                }}
              />
              <FaCode className="relative z-10" />
              <span className="relative z-10">Let's Connect</span>
            </motion.a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex gap-6 pt-6 text-gray-400"
          >
            {[
              { value: '5+', label: 'Technologies', delay: 0 },
              { value: '10+', label: 'Projects', delay: 0.1 },
              { value: '100%', label: 'Dedication', delay: 0.2 },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + stat.delay, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className={`${index > 0 ? 'border-l border-white/10 pl-6' : ''} backdrop-blur-sm bg-white/5 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group`}
              >
                <motion.div 
                  className="text-3xl font-bold text-white group-hover:text-cosmic-purple transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm group-hover:text-gray-300 transition-colors">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - Profile Image with Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative hidden md:flex justify-center items-center"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-96 h-96"
          >
            {/* Outer glow circle */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan rounded-full blur-3xl opacity-50"
            />

            {/* Profile Image Container with Glassmorphism */}
            <motion.div
              whileHover={{ 
                scale: 1.1,
                rotateZ: [0, -5, 5, 0],
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.95 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Outer rotating ring */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute w-96 h-96 rounded-full border-2 border-dashed border-cosmic-purple/30"
              />
              
              {/* Middle rotating ring */}
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute w-[360px] h-[360px] rounded-full border-2 border-dotted border-cosmic-cyan/30"
              />

              <motion.div 
                className="relative w-80 h-80 rounded-full overflow-hidden bg-white/5 backdrop-blur-xl border-4 border-white/30 shadow-2xl group cursor-pointer"
                animate={{
                  boxShadow: [
                    '0 8px 32px 0 rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                    '0 8px 48px 0 rgba(139, 92, 246, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.15)',
                    '0 8px 32px 0 rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  borderColor: 'rgba(139, 92, 246, 0.6)',
                  shadow: '0 0 50px rgba(139, 92, 246, 0.8)',
                }}
              >
                {/* Profile Image with better fit */}
                <motion.img 
                  src="/profile.jpg" 
                  alt="Chanikya Chowdary Samineni"
                  className="w-full h-full object-cover object-center scale-110"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  whileHover={{ 
                    scale: 1.15,
                    transition: { duration: 0.3 }
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                
                {/* Fallback emoji */}
                <div className="absolute inset-0 flex items-center justify-center text-9xl bg-gradient-to-br from-cosmic-purple/20 to-cosmic-cyan/20" style={{ display: 'none' }}>
                  🚀
                </div>
                
                {/* Animated gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    background: [
                      'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, transparent 50%, rgba(6, 182, 212, 0.2) 100%)',
                      'linear-gradient(225deg, rgba(6, 182, 212, 0.2) 0%, transparent 50%, rgba(139, 92, 246, 0.2) 100%)',
                      'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, transparent 50%, rgba(6, 182, 212, 0.2) 100%)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    backdropFilter: 'blur(2px)',
                  }}
                />
                
                {/* Multi-layer rotating border shine */}
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, rgba(139, 92, 246, 0.8) 90deg, transparent 180deg, rgba(6, 182, 212, 0.8) 270deg, transparent 360deg)',
                  }}
                />
                
                {/* Inner glow pulse */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1, 0.95],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-4 rounded-full border-2 border-white/20 pointer-events-none"
                />
                
                {/* Shimmer effect */}
                <motion.div
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatDelay: 1,
                  }}
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    transform: 'skewX(-20deg)',
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Orbiting elements */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10 + i * 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0"
                style={{
                  transformOrigin: 'center',
                }}
              >
                <motion.div
                  whileHover={{ scale: 2 }}
                  className={`absolute w-3 h-3 rounded-full backdrop-blur-md cursor-pointer ${
                    i === 0 ? 'bg-cosmic-purple' : i === 1 ? 'bg-cosmic-cyan' : 'bg-cosmic-blue'
                  }`}
                  style={{
                    top: `${20 + i * 15}%`,
                    left: '50%',
                    boxShadow: `0 0 30px ${
                      i === 0 ? '#8b5cf6' : i === 1 ? '#06b6d4' : '#3b82f6'
                    }, 0 0 60px ${i === 0 ? '#8b5cf6' : i === 1 ? '#06b6d4' : '#3b82f6'}`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-cosmic-purple rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-3 bg-cosmic-purple rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Home
