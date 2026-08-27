import React, { useRef } from 'react'
import GradientButton from '../components/GradientButton'
import projects from '../components/projectsData'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Work = () => {
  const workRef     = useRef(null);
  const projectsRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Horizontal scroll calculation
    const getScrollDistance = () => {
      if (!projectsRef.current) return 0;
      return projectsRef.current.scrollWidth - window.innerWidth + 40;
    };

    gsap.to(projectsRef.current, {
      x: () => -getScrollDistance(),
      ease: "linear",
      scrollTrigger: {
        trigger: workRef.current,
        start: "top top",
        end: () => `+=${projectsRef.current?.scrollWidth || 1000}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });
  }, { scope: workRef });

  return (
    <>
      <div ref={workRef} className="min-h-screen bg-white text-black py-16 sm:py-24 lg:py-36 overflow-hidden flex flex-col justify-center">
        
        {/* Title Wrapper */}
        <div className='main-container pb-6 sm:pb-8 lg:pb-12 flex max-md:flex-col gap-6 justify-between items-start md:items-end'>
          <div className='max-w-xl'>
            <h2 className='font-heading font-medium uppercase text-xl sm:text-2xl mb-2 sm:mb-3'>Selected Work</h2>
            <p className='text-base sm:text-lg lg:text-xl'>A showcase of my selected projects—designed to inspire, engage, and deliver real results.</p>
          </div>
          <div className='flex flex-col items-start md:items-end gap-3 sm:gap-4'>
            <GradientButton text="Explore All" link="/projects" className="btn-light" />
            {/* Scroll progress bar */}
            <div className="w-32 sm:w-40">
              <div className="progress-bar-track">
                <div ref={progressRef} className="progress-bar-fill" />
              </div>
              <p className='text-xs text-gray-400 mt-1 font-heading'>Scroll to explore</p>
            </div>
          </div>
        </div>

        <div ref={projectsRef} className="w-full">
          {/* Projects Reel */}
          <div className='flex gap-4 sm:gap-6 lg:gap-8 ms-4 sm:ms-8 lg:ms-[25%] mt-4 sm:mt-6 w-max'>
            {projects.map(({ id, name, tagline, stack, image, link }) => (
              <a
                key={id}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card relative rounded-2xl sm:rounded-3xl w-[290px] sm:w-[340px] lg:w-[400px] h-64 sm:h-72 lg:h-80 block overflow-hidden group shrink-0 shadow-lg"
              >
                {/* Project Image */}
                <img
                  src={image}
                  alt={name}
                  width={400}
                  height={320}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col gap-1.5 sm:gap-2">
                  {/* Project Name */}
                  <span className="text-white text-lg sm:text-xl lg:text-2xl font-heading font-bold uppercase leading-tight">
                    {name}
                  </span>
                  {/* Tagline */}
                  <p className="text-white/80 text-xs sm:text-sm lg:text-base leading-snug line-clamp-2">
                    {tagline}
                  </p>
                  {/* Stack badges */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] sm:text-xs font-heading font-medium px-2.5 py-0.5 sm:py-1 rounded-full bg-white/15 text-white backdrop-blur-sm border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top-right arrow icon */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

              </a>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

export default Work