import React, { useEffect, useState, useRef } from 'react'

const CustomCursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only run on desktop/fine pointer devices without reduced motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!hasFinePointer || prefersReducedMotion) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    // Smooth animation loop for trailing ring
    let animationFrameId
    const render = () => {
      // Lerp ring towards mouse position
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }

      animationFrameId = requestAnimationFrame(render)
    }

    // Attach hover listener for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.cursor-pointer') ||
        target.closest('.group')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isVisible])

  return (
    <>
      {/* Small Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-white pointer-events-none z-50 transition-opacity duration-300 mix-blend-difference ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Trailing Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-4 -mt-4 rounded-full pointer-events-none z-50 border border-white/60 transition-all duration-200 mix-blend-difference ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovered ? 'w-14 h-14 -ml-7 -mt-7 bg-white/20 border-white scale-110' : 'w-8 h-8'}`}
        style={{ willChange: 'transform' }}
      />
    </>
  )
}

export default CustomCursor
