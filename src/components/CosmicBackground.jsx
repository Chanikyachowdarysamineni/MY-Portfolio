import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const CosmicBackground = () => {
  const canvasRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = document.documentElement.scrollHeight

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 }

    // Advanced particle system
    const particles = []
    const numParticles = 150
    const connections = []

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2.5 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.8
        this.speedY = (Math.random() - 0.5) * 0.8
        this.opacity = Math.random() * 0.5 + 0.3
        this.opacityChange = Math.random() * 0.015 + 0.005
        this.color = this.getColor()
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulseSize = 0
      }

      getColor() {
        const colors = [
          'rgba(139, 92, 246, ',   // purple
          'rgba(59, 130, 246, ',   // blue
          'rgba(6, 182, 212, ',    // cyan
          'rgba(255, 255, 255, '   // white
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        // Mouse interaction - particles move away from cursor
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          this.x += (dx / distance) * force * 3
          this.y += (dy / distance) * force * 3
        }

        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0

        this.opacity += this.opacityChange
        if (this.opacity <= 0.2 || this.opacity >= 0.9) {
          this.opacityChange *= -1
        }

        this.pulseSize += this.pulseSpeed
      }

      draw() {
        // Main particle
        ctx.fillStyle = this.color + this.opacity + ')'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size + Math.sin(this.pulseSize) * 0.5, 0, Math.PI * 2)
        ctx.fill()

        // Glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
        gradient.addColorStop(0, this.color + (this.opacity * 0.5) + ')')
        gradient.addColorStop(1, this.color + '0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle())
    }

    // Draw connections between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.15
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawConnections()

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY + window.scrollY
    }

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Track mouse position for gradient effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Canvas for animated particles */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.7 }}
      />

      {/* Dynamic gradient overlays that follow mouse */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Animated radial gradient following mouse */}
        <motion.div
          animate={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
          className="absolute inset-0"
        />

        {/* Top gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-cosmic-purple/30 via-cosmic-blue/10 to-transparent"
        />

        {/* Bottom gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cosmic-cyan/20 via-transparent to-transparent"
        />

        {/* Floating orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-purple/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cosmic-cyan/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cosmic-blue/10 rounded-full blur-3xl"
        />
      </div>

      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Noise texture overlay for depth */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 mix-blend-overlay" 
           style={{
             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
           }}
      />
    </>
  )
}

export default CosmicBackground
