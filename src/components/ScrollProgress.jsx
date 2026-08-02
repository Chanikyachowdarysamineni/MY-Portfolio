import { useEffect, useState } from 'react'

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop    = window.scrollY
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight
      const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(100, pct))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #6C63FF, #00D4FF, #10B981)',
        zIndex: 9999,
        boxShadow: '0 0 10px rgba(108,99,255,0.8), 0 0 20px rgba(0,212,255,0.4)',
        transition: 'width 0.08s linear',
        borderRadius: '0 2px 2px 0',
      }}
    />
  )
}

export default ScrollProgress
