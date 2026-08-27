import React, { useEffect, useRef, useState } from 'react'
import Logo from '../assets/images/logo.svg'
import { useContact } from '../context/ContactContext'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const { openContact } = useContact();
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const navbarRef = useRef(null);

  // Scroll detection for blur effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // GSAP entrance animation
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.from(navbarRef.current, { opacity: 0, y: -100, duration: 0.6 });
  });

  return (
    <>
      <nav
        ref={navbarRef}
        className={`fixed top-0 z-30 w-full transition-all duration-400 ${
          scrolled && !menuOpen
            ? 'bg-black/75 backdrop-blur-md border-b border-white/10'
            : 'mix-blend-difference'
        }`}
      >
        <div className='main-container py-4 sm:py-6 flex justify-between items-center'>

          {/* Logo */}
          <Link to='/' className="shrink-0" aria-label="Digvijay Wadekar Home">
            <img src={Logo} alt="Digvijay Wadekar" className='h-8 sm:h-10 w-auto' />
          </Link>

          {/* Right side: social icons (desktop) + resume + hamburger */}
          <div className='flex items-center gap-1.5 sm:gap-2'>

            {/* Social Icons — shown on md+ screens to prevent mobile top-bar crowding */}
            <div className="hidden md:flex items-center gap-1">
              {/* GitHub */}
              <a
                href="https://github.com/Digvijaywadekar2004"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className='p-2 text-white hover:opacity-70 transition-opacity'
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.167 8.839 21.489C9.339 21.581 9.5 21.27 9.5 21.004V19.18C6.727 19.779 6.139 17.836 6.139 17.836C5.685 16.681 5.029 16.37 5.029 16.37C4.121 15.755 5.098 15.768 5.098 15.768C6.101 15.836 6.629 16.797 6.629 16.797C7.521 18.311 8.97 17.869 9.539 17.617C9.631 16.98 9.889 16.539 10.175 16.289C7.954 16.033 5.62 15.168 5.62 11.388C5.62 10.292 6.01 9.394 6.649 8.689C6.546 8.436 6.203 7.41 6.747 6.033C6.747 6.033 7.587 5.765 9.497 7.059C10.31 6.836 11.17 6.724 12.03 6.72C12.89 6.724 13.75 6.836 14.563 7.059C16.471 5.765 17.31 6.033 17.31 6.033C17.854 7.41 17.511 8.436 17.409 8.689C18.049 9.394 18.437 10.292 18.437 11.388C18.437 15.178 16.1 16.031 13.872 16.279C14.228 16.588 14.55 17.194 14.55 18.118V21.004C14.55 21.272 14.708 21.585 15.216 21.488C19.187 20.164 22 16.417 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/digvijaywadekar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className='p-2 text-white hover:opacity-70 transition-opacity'
              >
                <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.67481 6.25003C8.67447 6.91307 8.41076 7.54882 7.94169 8.01743C7.47261 8.48604 6.8366 8.74911 6.17356 8.74878C5.51051 8.74845 4.87476 8.48474 4.40615 8.01566C3.93755 7.54659 3.67447 6.91057 3.67481 6.24753C3.67514 5.58449 3.93885 4.94874 4.40792 4.48013C4.877 4.01152 5.51301 3.74845 6.17605 3.74878C6.8391 3.74911 7.47485 4.01282 7.94346 4.4819C8.41206 4.95097 8.67514 5.58699 8.67481 6.25003ZM8.74981 10.6H3.7498V26.25H8.74981V10.6ZM16.6498 10.6H11.6748V26.25H16.5998V18.0375C16.5998 13.4625 22.5623 13.0375 22.5623 18.0375V26.25H27.4998V16.3375C27.4998 8.62503 18.6748 8.91253 16.5998 12.7L16.6498 10.6Z" fill="currentColor"/>
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:digvijaywadekar350@gmail.com"
                aria-label="Send email to Digvijay"
                className="p-2 text-white hover:opacity-70 transition-opacity"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                </svg>
              </a>
            </div>

            {/* Resume button — styled neatly across mobile and desktop */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase font-heading text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-1.5 rounded-full border border-white text-white hover:bg-white hover:text-black transition-all duration-300 shrink-0"
            >
              Resume
            </a>

            {/* Hamburger button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="menubar flex flex-col gap-1.5 cursor-pointer p-2 bg-transparent border-0 shrink-0"
            >
              <span className={`inline-block w-7 sm:w-8 lg:w-10 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[4px]" : ""}`}></span>
              <span className={`inline-block w-7 sm:w-8 lg:w-10 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`}></span>
            </button>

          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile / Desktop Menu Overlay */}
      <div
        className={`fixed z-20 inset-0 bg-black/95 text-white flex flex-col items-center justify-center gap-6 sm:gap-8 px-6 transition-transform duration-500 overflow-y-auto ${
          menuOpen ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        {/* Menu links */}
        <Link to="/" className='menu-link text-center' onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/projects" className='menu-link text-center' onClick={() => setMenuOpen(false)}>Projects</Link>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className='menu-link text-center' onClick={() => setMenuOpen(false)}>Resume</a>
        <button
          onClick={() => {
            setMenuOpen(false);
            openContact();
          }}
          className='menu-link bg-transparent border-0 cursor-pointer text-white text-center'
        >
          Contact
        </button>

        {/* Social Links inside Fullscreen Menu for mobile users */}
        <div className="flex items-center gap-6 pt-6 border-t border-white/10 mt-4" onClick={(e) => e.stopPropagation()}>
          <a
            href="https://github.com/Digvijaywadekar2004"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.167 8.839 21.489C9.339 21.581 9.5 21.27 9.5 21.004V19.18C6.727 19.779 6.139 17.836 6.139 17.836C5.685 16.681 5.029 16.37 5.029 16.37C4.121 15.755 5.098 15.768 5.098 15.768C6.101 15.836 6.629 16.797 6.629 16.797C7.521 18.311 8.97 17.869 9.539 17.617C9.631 16.98 9.889 16.539 10.175 16.289C7.954 16.033 5.62 15.168 5.62 11.388C5.62 10.292 6.01 9.394 6.649 8.689C6.546 8.436 6.203 7.41 6.747 6.033C6.747 6.033 7.587 5.765 9.497 7.059C10.31 6.836 11.17 6.724 12.03 6.72C12.89 6.724 13.75 6.836 14.563 7.059C16.471 5.765 17.31 6.033 17.31 6.033C17.854 7.41 17.511 8.436 17.409 8.689C18.049 9.394 18.437 10.292 18.437 11.388C18.437 15.178 16.1 16.031 13.872 16.279C14.228 16.588 14.55 17.194 14.55 18.118V21.004C14.55 21.272 14.708 21.585 15.216 21.488C19.187 20.164 22 16.417 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/digvijaywadekar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.67481 6.25003C8.67447 6.91307 8.41076 7.54882 7.94169 8.01743C7.47261 8.48604 6.8366 8.74911 6.17356 8.74878C5.51051 8.74845 4.87476 8.48474 4.40615 8.01566C3.93755 7.54659 3.67447 6.91057 3.67481 6.24753C3.67514 5.58449 3.93885 4.94874 4.40792 4.48013C4.877 4.01152 5.51301 3.74845 6.17605 3.74878C6.8391 3.74911 7.47485 4.01282 7.94346 4.4819C8.41206 4.95097 8.67514 5.58699 8.67481 6.25003ZM8.74981 10.6H3.7498V26.25H8.74981V10.6ZM16.6498 10.6H11.6748V26.25H16.5998V18.0375C16.5998 13.4625 22.5623 13.0375 22.5623 18.0375V26.25H27.4998V16.3375C27.4998 8.62503 18.6748 8.91253 16.5998 12.7L16.6498 10.6Z" fill="currentColor"/>
            </svg>
          </a>
          <a
            href="mailto:digvijaywadekar350@gmail.com"
            aria-label="Email"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar