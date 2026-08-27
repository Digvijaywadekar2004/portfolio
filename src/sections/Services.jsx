import React from 'react'

const services = [
  {
    number: '01',
    title: ['React', 'Development'],
    description:
      'Building fast, responsive, interactive interfaces with React.js, JavaScript (ES6+), Tailwind CSS, and Vite. Clean component architecture, thoughtful typography, and polished UX on every screen size.',
    bg: 'bg-black text-white',
    borderColor: '#7B2FF7',
    sticky: 'top-16 sm:top-20 lg:top-24',
    pb: 'pb-24 sm:pb-36 lg:pb-[28rem]',
    numberColor: 'text-gray-500',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.4" fill="none"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.4" fill="none" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.4" fill="none" transform="rotate(120 12 12)"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: ['Real-Time', 'Web Apps'],
    description:
      'Live dashboards and streaming pipelines with Socket.io and Recharts — real-time telemetry, instant alerts, and low-latency updates, end to end.',
    bg: 'bg-[#E9E9F0] text-black',
    borderColor: '#FF4D6D',
    sticky: 'top-24 sm:top-32 lg:top-36',
    pb: 'pb-16 sm:pb-24 lg:pb-[18rem]',
    numberColor: 'text-gray-400',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M13 3L5 13H11L11 21L19 11H13L13 3Z" stroke="#FF4D6D" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: ['Backend', '& APIs'],
    description:
      'REST APIs with Node.js, Express, MongoDB, and PostgreSQL — JWT auth, role-based access, and query optimization for reliable performance under load.',
    bg: 'bg-white text-black',
    borderColor: '#2F86F7',
    sticky: 'top-32 sm:top-44 lg:top-48',
    pb: 'py-12 sm:py-16 lg:py-20',
    numberColor: 'text-gray-400',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#2F86F7" strokeWidth="1.5"/>
        <path d="M4 6V12C4 13.657 7.582 15 12 15C16.418 15 20 13.657 20 12V6" stroke="#2F86F7" strokeWidth="1.5"/>
        <path d="M4 12V18C4 19.657 7.582 21 12 21C16.418 21 20 19.657 20 18V12" stroke="#2F86F7" strokeWidth="1.5"/>
      </svg>
    ),
  },
]

const Services = () => {
  return (
    <>
      {/* Section Header */}
      <div className="bg-white text-black">
        <div className='main-container pb-6 sm:pb-8 lg:pb-12'>
          <h2 className="font-heading font-medium uppercase text-xl sm:text-2xl">What I Build</h2>
        </div>
      </div>

      {/* Stacking Cards */}
      <div className='relative'>
        {services.map(({ number, title, description, bg, borderColor, sticky, pb, numberColor, icon }, i) => (
          <div
            key={i}
            className={`${bg} pt-12 sm:pt-16 lg:pt-20 ${pb} sticky ${sticky} shadow-lg`}
          >
            {/* Colored left border accent line */}
            <div
              className="absolute left-0 top-0 w-1 sm:w-1.5 h-full opacity-80"
              style={{ background: borderColor }}
              aria-hidden="true"
            />

            <div className="main-container grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start">

              {/* Left — Number + Icon + Title */}
              <div className='flex gap-4 sm:gap-6 lg:gap-8'>
                <span className={`${numberColor} text-base sm:text-lg lg:text-2xl font-heading tracking-wide block mb-2 sm:mb-4 shrink-0`}>
                  {number}
                </span>
                <div>
                  {/* Icon */}
                  <div className="mb-3 sm:mb-4 opacity-90">{icon}</div>
                  {/* Title */}
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[1]">
                    {title[0]} <br /> {title[1]}
                  </h3>
                </div>
              </div>

              {/* Right — Description */}
              <div className="flex items-center">
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed opacity-85">
                  {description}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Services