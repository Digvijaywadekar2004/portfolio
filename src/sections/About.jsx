import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { value: 4,    suffix: '+', label: 'Projects Built' },
  { value: 8.3,  suffix: '',  label: 'CGPA / 10',     decimals: 1 },
  { value: 17,   suffix: '+', label: 'Technologies'  },
  { value: 2,    suffix: '+', label: 'Years Coding'  },
]

const About = () => {

  const aboutRef = useRef(null);

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fade in the about text on scroll
    gsap.fromTo(
      ".about-text",
      { opacity: reduced ? 1 : 0, y: reduced ? 0 : 60 },
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

    // Animate stat numbers counting up
    if (!reduced) {
      gsap.utils.toArray('.stat-count').forEach((el) => {
        const target     = parseFloat(el.dataset.target);
        const decimals   = parseInt(el.dataset.decimals || '0', 10);
        const obj        = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate() {
            el.textContent = obj.val.toFixed(decimals);
          },
        });
      });
    } else {
      // Just set final values immediately
      gsap.utils.toArray('.stat-count').forEach((el) => {
        const target   = parseFloat(el.dataset.target);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        el.textContent = target.toFixed(decimals);
      });
    }
  }, { scope: aboutRef });

  return (
    <>
      <div ref={aboutRef} className='bg-white rounded-tl-[60px] rounded-tr-[60px] relative z-10'>
        <div className='about-text main-container py-20 lg:py-28 flex flex-col justify-center gap-12'>

          {/* Bold headline statement */}
          <p className='font-heading text-black text-3xl md:text-4xl xl:text-[3vw] 2xl:text-5xl font-bold leading-[1.2] tracking-tight'>
            I bridge intuitive design with{' '}
            <span className='text-stroke-dark'>real-world engineering</span>{' '}
            — building web apps that are fast, functional, and built to last.
          </p>

          {/* Stats grid */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 py-8 border-y border-black/10'>
            {stats.map(({ value, suffix, label, decimals }) => (
              <div key={label} className='flex flex-col gap-1'>
                <div className='flex items-end gap-0.5'>
                  <span
                    className='stat-count stat-number font-heading font-bold text-4xl lg:text-5xl text-black leading-none'
                    data-target={value}
                    data-decimals={decimals ?? 0}
                  >
                    {decimals ? value.toFixed(decimals) : value}
                  </span>
                  <span className='font-heading font-bold text-3xl lg:text-4xl text-black leading-none pb-0.5'>{suffix}</span>
                </div>
                <span className='text-sm text-gray-500 font-medium uppercase tracking-wider'>{label}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className='w-16 h-[2px] bg-black opacity-20 rounded-full'></div>

          {/* Detailed bio */}
          <p className='font-body text-gray-600 text-lg lg:text-xl xl:text-2xl leading-[1.75] max-w-[75ch]'>
            I'm a <strong className='text-black font-semibold'>Full-Stack Developer</strong> currently pursuing my{' '}
            <strong className='text-black font-semibold'>B.Tech in Computer Engineering</strong> at Punyashlok Ahilyadevi Holkar University, Solapur{' '}
            <span className='text-gray-500'>(CGPA: 8.3/10)</span>. My core web toolkit includes{' '}
            <strong className='text-black font-semibold'>React.js, Vite, Tailwind CSS</strong> for the frontend and{' '}
            <strong className='text-black font-semibold'>Node.js, Express, FastAPI, Socket.io, MongoDB</strong> &amp; PostgreSQL on the backend.
            I've built projects like <strong className='text-black font-semibold'>TrackPulse</strong> — a real-time vehicle telemetry &amp; engine diagnostics dashboard with live WebSocket data streaming, interactive Recharts visualizations, and instant alert notifications.
          </p>

        </div>
      </div>
    </>
  )
}

export default About