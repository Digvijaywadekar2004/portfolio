import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {

  const aboutRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Fade in the about text on scroll
    gsap.fromTo(
      ".about-text",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 75%",
          end: "center center",
          scrub: 1,
        },
      }
    );
  }, { scope: aboutRef });

  return (
    <>
      <div ref={aboutRef} className='bg-white rounded-tl-[60px] rounded-tr-[60px] relative z-10'>
        <div className='about-text main-container py-20 lg:py-28 flex flex-col justify-center gap-10'>

          {/* Bold headline statement */}
          <p className='font-heading text-black text-3xl md:text-4xl xl:text-[3vw] 2xl:text-5xl font-bold leading-[1.2] tracking-tight'>
            I bridge intuitive design with{' '}
            <span className='text-stroke-dark'>real-world engineering</span>{' '}
            — building web apps that are fast, functional, and built to last.
          </p>

          {/* Divider */}
          <div className='w-16 h-[2px] bg-black opacity-20 rounded-full'></div>

          {/* Detailed bio */}
          <p className='font-body text-gray-600 text-lg lg:text-xl xl:text-2xl leading-[1.75] max-w-[75ch]'>
            I'm a <strong className='text-black font-semibold'>Frontend Developer</strong> currently pursuing my{' '}
            <strong className='text-black font-semibold'>B.Tech in Computer Engineering</strong> at Punyashlok Ahilyadevi Holkar University, Solapur{' '}
            <span className='text-gray-500'>(CGPA: 8.3/10)</span>. With a strong foundation from a Diploma in Information Technology,
            I focus on building robust, performant web applications. My core toolkit includes{' '}
            <strong className='text-black font-semibold'>React.js, Vite, Tailwind CSS</strong> for the frontend, and{' '}
            <strong className='text-black font-semibold'>Node.js, Express, FastAPI, Socket.io, MongoDB</strong> &amp; PostgreSQL on the backend.
            From low-latency telemetry dashboards with live diagnostics to AI-integrated automated workflows,
            I love solving end-to-end engineering challenges with clean, maintainable code.
          </p>

        </div>
      </div>
    </>
  )
}

export default About