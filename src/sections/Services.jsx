import React from 'react'

const services = [
  {
    number: '01',
    title: ['React', 'Development'],
    description:
      'Building fast, responsive, interactive interfaces with React.js, JavaScript (ES6+), Tailwind CSS, and Vite. Clean component architecture, thoughtful typography, and polished UX on every screen size.',
    bg: 'bg-black text-white',
    borderColor: '#7B2FF7',
    sticky: 'top-4',
    pb: 'pb-[28rem] md:pb-[32rem] lg:pb-[40rem]',
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
    sticky: 'top-1/3',
    pb: 'pb-[16rem] md:pb-[20rem] lg:pb-[23rem]',
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
    sticky: 'top-2/3',
    pb: 'py-16 lg:py-20',
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
        <div className='main-container pb-8 lg:pb-12'>
          <h2 className="font-heading font-medium uppercase text-2xl">What I Build</h2>
        </div>
      </div>

      {/* Stacking Cards */}
      <div className='relative'>
        {services.map(({ number, title, description, bg, borderColor, sticky, pb, numberColor, icon }, i) => (
          <div
            key={i}
            className={`${bg} pt-16 lg:pt-20 ${pb} sticky ${sticky}`}
          >
            {/* Colored left border accent line */}
            <div
              className="absolute left-0 top-0 w-1 h-full opacity-80"
              style={{ background: borderColor }}
              aria-hidden="true"
            />

            <div className="main-container grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start">

              {/* Left — Number + Icon + Title */}
              <div className='flex gap-6 lg:gap-8'>
                <span className={`${numberColor} text-lg lg:text-2xl font-heading tracking-wide block mb-4 shrink-0`}>
                  {number}
                </span>
                <div>
                  {/* Icon */}
                  <div className="mb-4 opacity-90">{icon}</div>
                  {/* h3 */}
                  <h3 className="text-[8vw] md:text-6xl font-heading font-bold leading-[1]">
                    {title[0]} <br /> {title[1]}
                  </h3>
                </div>
              </div>

              {/* Right — Description */}
              <div className="flex items-center">
                <p className="text-lg lg:text-xl leading-relaxed opacity-80">
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