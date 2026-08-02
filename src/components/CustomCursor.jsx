import { useEffect, useState } from 'react'

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let ringX = -100, ringY = -100
    let animId = null

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    const lerp = (start, end, factor) => start + (end - start) * factor

    const animateRing = (dotX, dotY) => {
      ringX = lerp(ringX, dotX, 0.12)
      ringY = lerp(ringY, dotY, 0.12)
      setRingPos({ x: ringX, y: ringY })
      animId = requestAnimationFrame(() => animateRing(dotX, dotY))
    }

    let cursorX = -100, cursorY = -100
    const trackMove = (e) => {
      cursorX = e.clientX
      cursorY = e.clientY
      setPos({ x: cursorX, y: cursorY })
      cancelAnimationFrame(animId)
      animateRing(cursorX, cursorY)
    }

    const onEnterInteractive = () => setHovering(true)
    const onLeaveInteractive = () => setHovering(false)
    const onMouseDown = () => setClicking(true)
    const onMouseUp   = () => setClicking(false)
    const onMouseLeave = () => setHidden(true)
    const onMouseEnter = () => setHidden(false)

    window.addEventListener('mousemove', trackMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    const addHoverListeners = () => {
      const els = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label, .cursor-pointer')
      els.forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
    }

    addHoverListeners()
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', trackMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [])

  const dotScale = clicking ? 0.5 : hovering ? 1.5 : 1
  const ringScale = clicking ? 0.7 : hovering ? 1.5 : 1

  return (
    <>
      {/* Dot */}
      <div
        className="cursor-dot"
        style={{
          left: pos.x,
          top:  pos.y,
          opacity: hidden ? 0 : 1,
          transform: `translate(-50%, -50%) scale(${dotScale})`,
          background: hovering ? 'var(--color-cyan)' : 'var(--color-primary)',
          boxShadow: hovering
            ? '0 0 12px rgba(0,212,255,0.8)'
            : '0 0 8px rgba(108,99,255,0.8)',
          transition: 'transform 0.15s ease, background 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
          zIndex: 99999,
          position: 'fixed',
          width: 8,
          height: 8,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      {/* Ring */}
      <div
        className="cursor-ring"
        style={{
          left: ringPos.x,
          top:  ringPos.y,
          opacity: hidden ? 0 : 0.6,
          transform: `translate(-50%, -50%) scale(${ringScale})`,
          borderColor: hovering ? 'rgba(0,212,255,0.7)' : 'rgba(108,99,255,0.5)',
          width: 36,
          height: 36,
          transition: 'transform 0.3s ease, border-color 0.2s ease, opacity 0.2s ease',
          zIndex: 99998,
          position: 'fixed',
          borderRadius: '50%',
          border: '1px solid',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}

export default CustomCursor
