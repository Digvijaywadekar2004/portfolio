import React from 'react'

const services = [
  {
    number: '01',
    title: ['React', 'Development'],
    description:
      'Building fast, responsive, interactive interfaces with React.js, JavaScript (ES6+), Tailwind CSS, and Vite. Clean component architecture, thoughtful typography, and polished UX on every screen size.',
    bg: 'bg-black text-white',
    sticky: 'top-4',
    pb: 'pb-[28rem] md:pb-[32rem] lg:pb-[40rem]',
    numberColor: 'text-gray-500',
  },
  {
    number: '02',
    title: ['Real-Time', 'Web Apps'],
    description:
      'Live dashboards and streaming pipelines with Socket.io and Recharts — real-time telemetry, instant alerts, and low-latency updates, end to end.',
    bg: 'bg-[#E9E9F0] text-black',
    sticky: 'top-1/3',
    pb: 'pb-[16rem] md:pb-[20rem] lg:pb-[23rem]',
    numberColor: 'text-gray-400',
  },
  {
    number: '03',
    title: ['Backend', '& APIs'],
    description:
      'REST APIs with Node.js, Express, MongoDB, and PostgreSQL — JWT auth, role-based access, and query optimization for reliable performance under load.',
    bg: 'bg-white text-black',
    sticky: 'top-2/3',
    pb: 'py-16 lg:py-20',
    numberColor: 'text-gray-400',
  },
]

const Services = () => {
  return (
    <>
      {/* Section Header — h2 (correct hierarchy under page h1) */}
      <div className="bg-white text-black">
        <div className='main-container pb-8 lg:pb-12'>
          <h2 className="font-heading font-medium uppercase text-2xl">What I Build</h2>
        </div>
      </div>

      {/* Stacking Cards */}
      <div className='relative'>
        {services.map(({ number, title, description, bg, sticky, pb, numberColor }, i) => (
          <div
            key={i}
            className={`${bg} pt-16 lg:pt-20 ${pb} sticky ${sticky}`}
          >
            <div className="main-container grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start">

              {/* Left — Number + Title */}
              <div className='flex gap-6 lg:gap-8'>
                <span className={`${numberColor} text-lg lg:text-2xl font-heading tracking-wide block mb-4 shrink-0`}>
                  {number}
                </span>
                {/* h3 — under section h2 */}
                <h3 className="text-[8vw] md:text-6xl font-heading font-bold leading-[1]">
                  {title[0]} <br /> {title[1]}
                </h3>
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