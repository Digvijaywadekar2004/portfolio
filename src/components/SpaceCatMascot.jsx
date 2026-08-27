import React, { useEffect, useRef } from 'react'

// ── Physics constants ─────────────────────────────────────────────────────────
const STIFFNESS    = 0.038  // spring pull strength — lower = more floaty/lagging
const DAMPING      = 0.91   // velocity retention — higher = more drift & overshoot
const TILT_FACTOR  = 0.40   // horizontal velocity → rotation degrees multiplier
const IDLE_AMP     = 7      // degrees of idle sinusoidal tilt
const IDLE_BOB     = 4      // px of idle vertical bob
const IDLE_SPEED   = 1.4    // rad/s of idle oscillation
const TRAIL_MAX    = 28     // max number of trail particles alive at once
const TRAIL_EVERY  = 2      // add a trail particle every N animation frames

// ── Cat SVG ──────────────────────────────────────────────────────────────────
// A clean minimal space-cat silhouette with cyan eyes and glowing outline
const CatSVG = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Body */}
    <ellipse cx="28" cy="36" rx="16" ry="13" fill="#1a1a2e" stroke="#00f5ff" strokeWidth="1.2" opacity="0.95"/>
    {/* Head */}
    <circle cx="28" cy="20" r="12" fill="#1a1a2e" stroke="#00f5ff" strokeWidth="1.2"/>
    {/* Ears */}
    <polygon points="17,12 13,4 21,10" fill="#1a1a2e" stroke="#00f5ff" strokeWidth="1.2" strokeLinejoin="round"/>
    <polygon points="39,12 43,4 35,10" fill="#1a1a2e" stroke="#00f5ff" strokeWidth="1.2" strokeLinejoin="round"/>
    {/* Inner ear pink */}
    <polygon points="17.5,11 15,6 20,10" fill="#ff6eb4" opacity="0.7"/>
    <polygon points="38.5,11 41,6 36,10" fill="#ff6eb4" opacity="0.7"/>
    {/* Eyes — glowing cyan */}
    <ellipse cx="23" cy="20" rx="3" ry="3.5" fill="#00f5ff" opacity="0.95"/>
    <ellipse cx="33" cy="20" rx="3" ry="3.5" fill="#00f5ff" opacity="0.95"/>
    {/* Pupil slits */}
    <ellipse cx="23" cy="20" rx="1" ry="2.5" fill="#000"/>
    <ellipse cx="33" cy="20" rx="1" ry="2.5" fill="#000"/>
    {/* Eye inner glow */}
    <ellipse cx="22" cy="18.5" rx="0.8" ry="0.6" fill="white" opacity="0.8"/>
    <ellipse cx="32" cy="18.5" rx="0.8" ry="0.6" fill="white" opacity="0.8"/>
    {/* Nose */}
    <polygon points="28,24 26.5,26 29.5,26" fill="#ff6eb4"/>
    {/* Mouth */}
    <path d="M26.5 26 Q28 28 29.5 26" stroke="#ff6eb4" strokeWidth="0.8" fill="none"/>
    {/* Whiskers left */}
    <line x1="16" y1="24" x2="25" y2="25" stroke="#00f5ff" strokeWidth="0.7" opacity="0.6"/>
    <line x1="15" y1="27" x2="25" y2="26.5" stroke="#00f5ff" strokeWidth="0.7" opacity="0.6"/>
    {/* Whiskers right */}
    <line x1="40" y1="24" x2="31" y2="25" stroke="#00f5ff" strokeWidth="0.7" opacity="0.6"/>
    <line x1="41" y1="27" x2="31" y2="26.5" stroke="#00f5ff" strokeWidth="0.7" opacity="0.6"/>
    {/* Tail curled around */}
    <path
      d="M44 36 Q52 30 50 42 Q48 50 40 48"
      stroke="#00f5ff" strokeWidth="1.4" fill="none" strokeLinecap="round"
    />
    {/* Belly stripe — subtle */}
    <ellipse cx="28" cy="38" rx="7" ry="5" fill="#0d0d1e" opacity="0.5"/>
    {/* Space helmet visor reflection (subtle arc on head) */}
    <path d="M20 14 Q28 10 36 14" stroke="white" strokeWidth="0.6" opacity="0.15" fill="none" strokeLinecap="round"/>
  </svg>
)

// ── Component ─────────────────────────────────────────────────────────────────
const SpaceCatMascot = () => {
  const catRef    = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    // Only run on fine-pointer (desktop) devices that don't prefer reduced motion
    const hasFinePointer       = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!hasFinePointer || prefersReducedMotion) return

    // ── Mutable state (refs avoid re-renders) ──────────────────────────────
    const pos   = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 }
    const vel   = { x: 0, y: 0 }
    const mouse = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 }
    let trail   = []   // [{ x, y, life, size, hue, vx, vy }]
    let frame   = 0
    let time    = 0
    let raf     = null
    let hasMouseMoved = false

    // ── Track mouse ──────────────────────────────────────────────────────
    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      hasMouseMoved = true
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // ── Canvas setup ──────────────────────────────────────────────────────
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    const resizeCanvas = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, { passive: true })

    // ── Place cat at initial position ─────────────────────────────────────
    if (catRef.current) {
      catRef.current.style.transform =
        `translate(calc(${pos.x}px - 28px), calc(${pos.y}px - 28px))`
    }

    // ── Main animation loop ───────────────────────────────────────────────
    const animate = () => {
      time  += 0.025
      frame += 1

      // ── Spring physics toward mouse ──────────────────────────────────
      const fx = (mouse.x - pos.x) * STIFFNESS
      const fy = (mouse.y - pos.y) * STIFFNESS

      vel.x = (vel.x + fx) * DAMPING
      vel.y = (vel.y + fy) * DAMPING

      pos.x += vel.x
      pos.y += vel.y

      // ── Idle sinusoidal oscillation ───────────────────────────────────
      // Tilt: velocity-based + idle sine wave
      const speed       = Math.sqrt(vel.x * vel.x + vel.y * vel.y)
      const velTilt     = vel.x * TILT_FACTOR            // speed-based lean
      const idleTilt    = Math.sin(time * IDLE_SPEED) * IDLE_AMP  // sinusoidal sway
      const totalTilt   = velTilt + idleTilt

      // Bob: gentle vertical oscillation when nearly still
      const stillness   = Math.max(0, 1 - speed * 0.04)
      const bobY        = Math.sin(time * IDLE_SPEED * 0.8) * IDLE_BOB * stillness

      // Subtle scale breathe
      const breathe     = 1 + Math.sin(time * 0.9) * 0.025

      // Dynamic glow intensity scales with speed
      const glowBase    = 8
      const glowSpeed   = Math.min(speed * 1.2, 18)
      const glowCyan    = glowBase + glowSpeed
      const glowPurple  = (glowBase * 0.6) + glowSpeed * 0.7

      // ── Update cat DOM ────────────────────────────────────────────────
      if (catRef.current) {
        catRef.current.style.transform = [
          `translate(calc(${pos.x}px - 28px), calc(${pos.y + bobY}px - 28px))`,
          `rotate(${totalTilt}deg)`,
          `scale(${breathe})`,
        ].join(' ')

        catRef.current.style.filter = [
          `drop-shadow(0 0 ${glowCyan}px rgba(0,245,255,0.90))`,
          `drop-shadow(0 0 ${glowPurple + 4}px rgba(155,50,255,0.70))`,
          `drop-shadow(0 0 ${glowCyan * 0.4}px rgba(0,245,255,0.30))`,
        ].join(' ')
      }

      // ── Trail particles ───────────────────────────────────────────────
      if (frame % TRAIL_EVERY === 0 && hasMouseMoved) {
        // Offset spawn behind the cat based on velocity
        const spawnX = pos.x - vel.x * 1.2
        const spawnY = pos.y + bobY - vel.y * 1.2

        // Alternate cyan and purple hues with slight random variance
        const hue  = frame % 4 < 2 ? 180 + Math.random() * 20 : 270 + Math.random() * 20
        const size = 2.5 + Math.random() * 3.5

        trail.push({
          x:    spawnX + (Math.random() - 0.5) * 6,
          y:    spawnY + (Math.random() - 0.5) * 6,
          life: 1.0,
          size,
          hue,
          // Each particle drifts slightly
          vx:   (Math.random() - 0.5) * 0.6,
          vy:   (Math.random() - 0.5) * 0.6 - 0.3, // slight upward drift
        })

        // Occasionally add a tiny star sparkle ✦
        if (Math.random() < 0.2) {
          trail.push({
            x:    spawnX + (Math.random() - 0.5) * 14,
            y:    spawnY + (Math.random() - 0.5) * 14,
            life: 0.8,
            size: 1.2,
            hue:  60,  // gold/white sparkle
            vx:   (Math.random() - 0.5) * 1.2,
            vy:   -0.5 - Math.random(),
            star: true,
          })
        }

        // Cap total particles
        if (trail.length > TRAIL_MAX) trail = trail.slice(trail.length - TRAIL_MAX)
      }

      // ── Decay & drift particles ───────────────────────────────────────
      trail.forEach((p) => {
        p.life -= 0.038
        p.x    += p.vx
        p.y    += p.vy
        p.vy   -= 0.01  // subtle upward float
      })
      trail = trail.filter((p) => p.life > 0)

      // ── Draw trail on canvas ──────────────────────────────────────────
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      trail.forEach((p) => {
        const alpha  = Math.max(0, p.life)
        const radius = p.size * Math.max(0, p.life)

        ctx.save()
        ctx.globalAlpha = alpha

        if (p.star) {
          // Tiny cross/sparkle shape for star particles
          ctx.strokeStyle = `hsl(${p.hue}, 100%, 90%)`
          ctx.shadowBlur  = 6
          ctx.shadowColor = `hsl(${p.hue}, 100%, 80%)`
          ctx.lineWidth   = 0.8
          ctx.beginPath()
          ctx.moveTo(p.x - radius, p.y)
          ctx.lineTo(p.x + radius, p.y)
          ctx.moveTo(p.x, p.y - radius)
          ctx.lineTo(p.x, p.y + radius)
          ctx.stroke()
        } else {
          // Glowing dot
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 2)
          grad.addColorStop(0,   `hsla(${p.hue}, 100%, 80%, ${alpha})`)
          grad.addColorStop(0.5, `hsla(${p.hue}, 100%, 65%, ${alpha * 0.6})`)
          grad.addColorStop(1,   `hsla(${p.hue}, 100%, 50%, 0)`)

          ctx.shadowBlur  = 10
          ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, ${alpha * 0.8})`
          ctx.fillStyle   = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, radius * 1.8, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      })

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Trail canvas — screen blend mode makes glow additive on dark backgrounds */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 59, mixBlendMode: 'screen' }}
        aria-hidden="true"
      />

      {/* Cat mascot */}
      <div
        ref={catRef}
        className="fixed top-0 left-0 pointer-events-none select-none"
        style={{
          zIndex: 60,
          willChange: 'transform, filter',
          transformOrigin: 'center center',
        }}
        aria-hidden="true"
      >
        <CatSVG />
      </div>
    </>
  )
}

export default SpaceCatMascot
