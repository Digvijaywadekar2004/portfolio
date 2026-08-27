import React, { useRef } from 'react'
import GradientButton from '../components/GradientButton'
import projects from '../components/projectsData'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP,ScrollTrigger);

const Work = () => {

  const workRef     = useRef(null);
  const projectsRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Horizontal scroll
    const projectsWidth  = projectsRef.current.scrollWidth;
    const scrollDistance = projectsWidth - window.innerWidth;

    gsap.to(projectsRef.current, {
      x: -scrollDistance,
      ease: "linear",
      scrollTrigger: {
        trigger: workRef.current,
        start: "center center",
        end: () => `+=${projectsWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // Update the progress bar fill width as user scrolls
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
      <div ref={workRef} className="min-h-screen bg-white text-black py-24 lg:py-40 overflow-hidden">
        
        {/* Title Wrapper */}
        <div className='main-container pb-8 lg:pb-12 flex max-md:flex-col gap-6 justify-between items-start md:items-end'>
          <div className='max-w-xl'>
            <h2 className='font-heading font-medium uppercase text-2xl mb-3'>Selected Work</h2>
            <p className='text-lg lg:text-xl'>A showcase of my selected projects—designed to inspire, engage, and deliver real results.</p>
          </div>
          <div className='flex flex-col items-end gap-4'>
            <GradientButton text="Explore All" link="/projects" className="btn-light" />
            {/* Scroll progress bar */}
            <div className="hidden lg:block w-40">
              <div className="progress-bar-track">
                <div ref={progressRef} className="progress-bar-fill" />
              </div>
              <p className='text-xs text-gray-400 mt-1 font-heading'>Scroll to explore</p>
            </div>
          </div>
        </div>

        <div ref={projectsRef}>
          {/* Projects */}
          <div className='flex gap-4 lg:gap-8 ms-4 lg:ms-[30%] mt-6'>
            {projects.map(({ id, name, tagline, stack, image, link }) => (
              <a
                key={id}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card relative rounded-2xl w-full min-w-[280px] lg:min-w-[380px] h-56 lg:h-72 block overflow-hidden group shrink-0"
              >
                {/* Project Image */}
                <img
                  src={image}
                  alt={name}
                  width={380}
                  height={288}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 flex flex-col gap-2">
                  {/* Project Name */}
                  <span className="text-white text-xl lg:text-2xl font-heading font-bold uppercase leading-tight">
                    {name}
                  </span>
                  {/* Tagline */}
                  <p className="text-white/75 text-sm lg:text-base leading-snug line-clamp-2">
                    {tagline}
                  </p>
                  {/* Stack badges */}
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-heading font-medium px-2.5 py-1 rounded-full bg-white/15 text-white backdrop-blur-sm border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top-right arrow icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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