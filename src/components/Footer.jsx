import React from 'react'
import Logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom'
import { useToast } from '../context/ToastContext'
import { useContact } from '../context/ContactContext'

const Footer = () => {
  const { showToast }   = useToast()
  const { openContact } = useContact()

  const copyEmail = () => {
    navigator.clipboard.writeText('digvijaywadekar350@gmail.com')
    showToast('Copied email to clipboard!')
  }

  return (
    <>
      {/* ── Big CTA Heading ── */}
      <div className="bg-black overflow-hidden">
        <div className="main-container pt-20 lg:pt-28 pb-12 lg:pb-16 flex flex-col gap-6 items-start">

          {/* Availability badge */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/5 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            <span className="text-sm font-heading font-medium text-white/70 uppercase tracking-widest">
              Available for Opportunities
            </span>
          </div>

          {/* Big "Let's Talk" heading */}
          <h2
            className="font-heading font-bold leading-[0.9] tracking-tight text-white cursor-pointer group select-none"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}
            onClick={openContact}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openContact()}
            aria-label="Open contact form"
          >
            <span className="group-hover:opacity-80 transition-opacity">Let's</span>{' '}
            <span
              className="text-stroke group-hover:opacity-80 transition-opacity"
              style={{ WebkitTextStroke: '2px white' }}
            >
              Talk.
            </span>
          </h2>

          <p className="text-white/40 text-base lg:text-lg font-body max-w-md">
            Have a project in mind, want to collaborate, or just want to say hi? My inbox is always open.
          </p>

          <button
            onClick={openContact}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-heading font-medium text-sm uppercase tracking-widest group"
          >
            <span>digvijaywadekar350@gmail.com</span>
            <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Animated gradient divider */}
        <div
          className="w-full h-[2px] opacity-50"
          style={{
            background: 'linear-gradient(90deg, #FF4D6D 0%, #BD3EB2 25%, #7B2FF7 50%, #2F86F7 75%, #2FF7ED 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Footer Grid ── */}
      <div className='max-w-[1500px] m-auto h-[1px] bg-white opacity-10' />

      <footer className="main-container grid md:grid-cols-2 lg:grid-cols-4 gap-10 py-20 bg-black">

        {/* Logo + Tagline */}
        <div className='flex flex-col gap-4'>
          <Link to='/'>
            <img src={Logo} alt="Digvijay Wadekar Logo" className='h-10 w-auto' />
          </Link>
          <p className='text-sm text-white/50 leading-relaxed max-w-[180px]'>
            Full-stack & systems developer building fast, real-world applications.
          </p>
        </div>

        {/* What I Build */}
        <div>
          <h5 className='font-medium mb-5'>What I Build</h5>
          <ul className='flex flex-col gap-2 text-base lg:text-lg text-white/70'>
            <li>React Development</li>
            <li>Container Orchestration</li>
            <li>Real-Time Web Apps</li>
            <li>REST APIs &amp; Backend</li>
          </ul>
        </div>

        {/* Navigate */}
        <div>
          <h5 className='font-medium mb-5'>Navigate</h5>
          <ul className='flex flex-col gap-2 text-base lg:text-lg'>
            <li><Link to='/' className='text-white/70 hover:text-white transition-colors'>Home</Link></li>
            <li><Link to='/projects' className='text-white/70 hover:text-white transition-colors'>Projects</Link></li>
            <li><button onClick={openContact} className='text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-0 text-base lg:text-lg font-body p-0'>Contact</button></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className='font-medium mb-5'>Contact</h5>
          <ul className='flex flex-col gap-2 text-base lg:text-lg text-white/70'>
            <li className="flex items-center gap-2">
              <a href='mailto:digvijaywadekar350@gmail.com' className='hover:text-white transition-colors break-all'>
                digvijaywadekar350@gmail.com
              </a>
              <button
                onClick={copyEmail}
                title="Copy email"
                className="p-1 rounded bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors text-xs cursor-pointer shrink-0"
              >
                📋
              </button>
            </li>
            <li>Solapur, Maharashtra, India</li>
            <li className='text-sm text-white/40'>B.Tech — Computer Engineering</li>
          </ul>
        </div>

      </footer>

      {/* Divider */}
      <div className='max-w-[1500px] m-auto h-[1px] bg-white opacity-10' />

      {/* Footer Bottom */}
      <div className='main-container grid md:grid-cols-2 gap-3 py-6 lg:py-8 max-md:text-center bg-black'>
        <div className='text-base text-white/50'>© {new Date().getFullYear()} Digvijay Wadekar — All rights reserved</div>

        {/* Social Links */}
        <div className='flex gap-4 justify-center md:justify-end items-center'>

          {/* GitHub */}
          <a href="https://github.com/Digvijaywadekar2004" target="_blank" rel="noopener noreferrer" className='text-white/50 hover:text-white transition-colors'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.167 8.839 21.489C9.339 21.581 9.5 21.27 9.5 21.004V19.18C6.727 19.779 6.139 17.836 6.139 17.836C5.685 16.681 5.029 16.37 5.029 16.37C4.121 15.755 5.098 15.768 5.098 15.768C6.101 15.836 6.629 16.797 6.629 16.797C7.521 18.311 8.97 17.869 9.539 17.617C9.631 16.98 9.889 16.539 10.175 16.289C7.954 16.033 5.62 15.168 5.62 11.388C5.62 10.292 6.01 9.394 6.649 8.689C6.546 8.436 6.203 7.41 6.747 6.033C6.747 6.033 7.587 5.765 9.497 7.059C10.31 6.836 11.17 6.724 12.03 6.72C12.89 6.724 13.75 6.836 14.563 7.059C16.471 5.765 17.31 6.033 17.31 6.033C17.854 7.41 17.511 8.436 17.409 8.689C18.049 9.394 18.437 10.292 18.437 11.388C18.437 15.178 16.1 16.031 13.872 16.279C14.228 16.588 14.55 17.194 14.55 18.118V21.004C14.55 21.272 14.708 21.585 15.216 21.488C19.187 20.164 22 16.417 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="https://linkedin.com/in/digvijaywadekar" target="_blank" rel="noopener noreferrer" className='p-2 text-white/50 hover:text-white transition-colors'>
            <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.67481 6.25003C8.67447 6.91307 8.41076 7.54882 7.94169 8.01743C7.47261 8.48604 6.8366 8.74911 6.17356 8.74878C5.51051 8.74845 4.87476 8.48474 4.40615 8.01566C3.93755 7.54659 3.67447 6.91057 3.67481 6.24753C3.67514 5.58449 3.93885 4.94874 4.40792 4.48013C4.877 4.01152 5.51301 3.74845 6.17605 3.74878C6.8391 3.74911 7.47485 4.01282 7.94346 4.4819C8.41206 4.95097 8.67514 5.58699 8.67481 6.25003ZM8.74981 10.6H3.7498V26.25H8.74981V10.6ZM16.6498 10.6H11.6748V26.25H16.5998V18.0375C16.5998 13.4625 22.5623 13.0375 22.5623 18.0375V26.25H27.4998V16.3375C27.4998 8.62503 18.6748 8.91253 16.5998 12.7L16.6498 10.6Z" fill="currentColor"/>
            </svg>
          </a>

          {/* Gmail */}
          <a href="mailto:digvijaywadekar350@gmail.com" className='text-white/50 hover:text-white transition-colors'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
            </svg>
          </a>

        </div>
      </div>
    </>
  )
}

export default Footer