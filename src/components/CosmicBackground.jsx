import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const CosmicBackground = () => {
  const canvasRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }
    resize()

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 }

    const COLORS = [
      [201, 173, 167],  // taupe
      [74, 78, 105],    // slate
      [154, 140, 152],  // mauve
      [196, 163, 160],  // warm taupe
      [242, 233, 228],  // cream
      [255, 255, 255],  // white
    ]

    // --- Particles --------------------------------------------------
    const particles = []
    const NUM_PARTICLES = 200

    class Particle {
      constructor() { this.reset(true) }

      reset(initial = false) {
        this.x = Math.random() * canvas.width
        this.y = initial ? Math.random() * canvas.height : Math.random() * canvas.height
        this.size = Math.random() * 2.2 + 0.4
        this.speedX = (Math.random() - 0.5) * 0.6
        this.speedY = (Math.random() - 0.5) * 0.6
        this.opacity = Math.random() * 0.45 + 0.2
        this.opacityDir = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.012 + 0.004)
        const c = COLORS[Math.floor(Math.random() * COLORS.length)]
        this.r = c[0]; this.g = c[1]; this.b = c[2]
        this.pulse = 0
        this.pulseSpeed = Math.random() * 0.025 + 0.008
      }

      update() {
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 160 && dist > 0) {
          const f = (160 - dist) / 160
          this.x += (dx / dist) * f * 2.5
          this.y += (dy / dist) * f * 2.5
        }
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < -5) this.x = canvas.width + 5
        if (this.x > canvas.width + 5) this.x = -5
        if (this.y < -5) this.y = canvas.height + 5
        if (this.y > canvas.height + 5) this.y = -5
        this.opacity += this.opacityDir
        if (this.opacity < 0.15 || this.opacity > 0.9) this.opacityDir *= -1
        this.pulse += this.pulseSpeed
      }

      draw() {
        const r = this.size + Math.sin(this.pulse) * 0.4
        ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2)
        ctx.fill()
        // bloom
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 4)
        g.addColorStop(0, `rgba(${this.r},${this.g},${this.b},${this.opacity * 0.35})`)
        g.addColorStop(1, `rgba(${this.r},${this.g},${this.b},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(this.x, this.y, r * 4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < NUM_PARTICLES; i++) particles.push(new Particle())

    // --- Shooting Stars ---------------------------------------------
    const shootingStars = []

    class ShootingStar {
      constructor() { this.spawn() }
      spawn() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * (canvas.height * 0.4)
        this.len = Math.random() * 120 + 60
        this.speed = Math.random() * 6 + 4
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4
        this.opacity = 0
        this.state = 'in' // in | out
        this.maxOpacity = Math.random() * 0.6 + 0.3
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed
        if (this.state === 'in') {
          this.opacity += 0.04
          if (this.opacity >= this.maxOpacity) this.state = 'out'
        } else {
          this.opacity -= 0.03
          if (this.opacity <= 0) this.spawn()
        }
      }

      draw() {
        const tailX = this.x - Math.cos(this.angle) * this.len
        const tailY = this.y - Math.sin(this.angle) * this.len
        const g = ctx.createLinearGradient(tailX, tailY, this.x, this.y)
        g.addColorStop(0, `rgba(255,255,255,0)`)
        g.addColorStop(1, `rgba(200,180,255,${this.opacity})`)
        ctx.strokeStyle = g
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(this.x, this.y)
        ctx.stroke()
      }
    }

    // Spawn 5 shooting stars at staggered times
    for (let i = 0; i < 5; i++) {
      const s = new ShootingStar()
      s.x = Math.random() * canvas.width
      s.y = Math.random() * canvas.height
      shootingStars.push(s)
    }

    // --- Aurora Waves ------------------------------------------------
    let auroraTime = 0

    const drawAurora = () => {
      auroraTime += 0.005
      const W = canvas.width
      const H = canvas.height

      const waves = [
        { color: [139, 92, 246], yBase: H * 0.08, amp: 40, freq: 0.004, phase: auroraTime },
        { color: [6, 182, 212], yBase: H * 0.12, amp: 55, freq: 0.003, phase: auroraTime + 1 },
        { color: [59, 130, 246], yBase: H * 0.07, amp: 30, freq: 0.005, phase: auroraTime + 2 },
      ]

      waves.forEach(({ color, yBase, amp, freq, phase }) => {
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(0, yBase)
        for (let x = 0; x <= W; x += 4) {
          const y = yBase + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 2.1 + phase * 1.3) * (amp * 0.4)
          ctx.lineTo(x, y)
        }
        ctx.lineTo(W, 0)
        ctx.lineTo(0, 0)
        ctx.closePath()
        const g = ctx.createLinearGradient(0, 0, 0, yBase + amp)
        g.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},0.06)`)
        g.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`)
        ctx.fillStyle = g
        ctx.fill()
        ctx.restore()
      })
    }

    // --- Connections -------------------------------------------------
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            const op = (1 - dist / 110) * 0.12
            ctx.strokeStyle = `rgba(${particles[i].r},${particles[i].g},${particles[i].b},${op})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // --- Animation Loop ----------------------------------------------
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawAurora()
      drawConnections()
      particles.forEach((p) => { p.update(); p.draw() })
      shootingStars.forEach((s) => { s.update(); s.draw() })
      animId = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY + window.scrollY
    }

    const handleResize = () => resize()

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
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
