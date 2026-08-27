import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const skillsData = [
  { name: 'React.js & Vite',       level: 90 },
  { name: 'Tailwind CSS',          level: 92 },
  { name: 'JavaScript (ES6+)',     level: 88 },
  { name: 'Node.js & Express',     level: 82 },
  { name: 'FastAPI & Python',      level: 78 },
  { name: 'MongoDB & PostgreSQL',  level: 80 },
]

const techStack = [
  'React.js', 'Vite', 'JavaScript', 'Tailwind CSS', 'Recharts',
  'Node.js', 'Express', 'FastAPI', 'Socket.io',
  'Go', 'gRPC', 'Docker',
  'MongoDB', 'PostgreSQL', 'Git & GitHub', 'Figma', 'REST APIs',
]

// Maps numeric level to a human-readable proficiency label
const proficiencyLabel = (level) => {
  if (level >= 85) return 'Advanced'
  if (level >= 75) return 'Proficient'
  return 'Working knowledge'
}

const Skills = () => {
  const skillsRef = useRef(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Animate section title
    gsap.from('.skills-title', {
      opacity: reduced ? 1 : 0,
      y: reduced ? 0 : 50,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.skills-title', start: 'top 85%' },
    })

    // Animate skill bars + percentage count-up
    gsap.utils.toArray('.skill-bar-fill').forEach((bar) => {
      const targetWidth   = bar.dataset.width
      const targetPercent = parseFloat(targetWidth)
      const counterEl     = bar.closest('.skill-row')?.querySelector('.skill-percent')

      if (reduced) {
        gsap.set(bar, { width: targetWidth })
        if (counterEl) counterEl.textContent = `${Math.round(targetPercent)}%`
      } else {
        const obj = { val: 0 }
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: targetWidth,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: bar, start: 'top 90%' },
          }
        )
        // Simultaneously count up the percentage number
        gsap.to(obj, {
          val: targetPercent,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: bar, start: 'top 90%' },
          onUpdate() {
            if (counterEl) counterEl.textContent = `${Math.round(obj.val)}%`
          },
        })
      }
    })

    // Animate tech badges
    gsap.from('.tech-badge', {
      opacity: reduced ? 1 : 0,
      y: reduced ? 0 : 30,
      scale: reduced ? 1 : 0.85,
      stagger: reduced ? 0 : 0.07,
      duration: 0.5,
      ease: 'back.out(1.5)',
      scrollTrigger: { trigger: '.tech-badges', start: 'top 85%' },
    })
  }, { scope: skillsRef })

  return (
    <div ref={skillsRef} className='bg-white text-black'>
      <div className='main-container py-20 lg:py-28'>

        {/* Header */}
        <div className='skills-title mb-14 lg:mb-20'>
          <h2 className="font-heading font-medium uppercase text-2xl">What I Work With</h2>
          <h3 className='text-5xl lg:text-[6vw] font-heading font-bold leading-[1] tracking-tight mt-3'>
            Skills &amp; <span className='text-stroke-dark'>Expertise</span>
          </h3>
        </div>

        <div className='grid lg:grid-cols-2 gap-14 lg:gap-20 items-start'>

          {/* Skill Bars */}
          <div className='flex flex-col gap-8'>
            {skillsData.map(({ name, level }) => (
              <div key={name} className='skill-row'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='font-heading font-semibold text-lg lg:text-xl'>{name}</span>
                  <div className='flex items-center gap-2'>
                    <span className='skill-percent stat-number text-sm font-bold text-black tabular-nums'>0%</span>
                    <span className='text-sm font-medium text-gray-400'>·</span>
                    <span className='text-sm font-medium text-gray-500'>{proficiencyLabel(level)}</span>
                  </div>
                </div>
                <div className='w-full h-2 bg-gray-100 rounded-full overflow-hidden'>
                  <div
                    className='skill-bar-fill h-full rounded-full'
                    data-width={`${level}%`}
                    style={{
                      background: 'linear-gradient(90deg,#FF4D6D 0%,#BD3EB2 25%,#7B2FF7 50%,#2F86F7 75%,#2FF7ED 100%)',
                      width: '0%',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack Badges */}
          <div>
            <p className='mb-6 text-gray-500 uppercase text-sm tracking-widest font-body font-medium'>Tech Stack</p>
            <div className='tech-badges flex flex-wrap gap-3'>
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className='tech-badge inline-block px-5 py-2.5 rounded-full border border-gray-200 font-heading font-medium text-sm lg:text-base hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 cursor-default'
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Skills
