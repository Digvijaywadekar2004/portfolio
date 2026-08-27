import React, { useRef } from 'react'
import GradientButton from '../components/GradientButton'
import { useContact } from '../context/ContactContext'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Splits ref.current text into word spans, guards against double-run
const splitIntoWords = (el) => {
  if (!el || el.querySelector('.split-word')) return [];
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words
    .map(w => `<span class="split-word" style="display:inline-block;overflow:hidden;"><span class="split-word-inner" style="display:inline-block">${w}</span></span>`)
    .join(' ');
  return el.querySelectorAll('.split-word-inner');
};

const Hero = () => {
  const { openContact } = useContact();
  const heroRef = useRef(null);
  const h1Ref  = useRef(null);
  const h2Ref  = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Pin hero section on scroll
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: 1,
      invalidateOnRefresh: true,
    });

    // Animate h1 words via ref
    const h1Words = splitIntoWords(h1Ref.current);
    gsap.from(h1Words, {
      y: 60, opacity: 0, delay: 0.2, stagger: 0.1, duration: 0.6, ease: "power3.out",
    });

    // Animate h2 words via ref
    const h2Words = splitIntoWords(h2Ref.current);
    gsap.from(h2Words, {
      y: 60, opacity: 0, stagger: 0.12, delay: 0.5, duration: 0.6, ease: "power3.out",
    });

    // Animate button
    gsap.from(".gradient-btn", {
      opacity: 0, y: 30, duration: 0.5, ease: "power2.out", delay: 1.2,
    });

    // Animate scroll indicator
    gsap.from(".hero-scroll-indicator", {
      opacity: 0, y: -10, duration: 0.6, ease: "power2.out", delay: 1.6,
    });

    // Animate star shape
    gsap.from(".star svg", {
      scale: 0, rotate: 180, opacity: 0,
      transformOrigin: "center center",
      duration: 1.3, ease: "back.out(1.7)",
      onComplete: () => {
        gsap.to(".star svg", {
          rotate: "+=360",
          transformOrigin: "center",
          duration: 20, ease: "linear", repeat: -1,
        });
      },
    });

  }, { scope: heroRef });

  return (
    <>
      <div ref={heroRef} className='relative overflow-hidden z-0 min-h-screen flex items-center'>

        {/* Ambient glow blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
          {/* Purple blob — top right */}
          <div style={{
            position: 'absolute',
            top: '5%',
            right: '-5%',
            width: '60vw',
            height: '60vw',
            maxWidth: '600px',
            maxHeight: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(123,47,247,0.18) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }} />
          {/* Pink blob — bottom left */}
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '-10%',
            width: '45vw',
            height: '45vw',
            maxWidth: '500px',
            maxHeight: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,77,109,0.12) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }} />
          {/* Cyan accent */}
          <div style={{
            position: 'absolute',
            top: '40%',
            right: '20%',
            width: '25vw',
            height: '25vw',
            maxWidth: '300px',
            maxHeight: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(47,247,237,0.07) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }} />
        </div>

        {/* Text container */}
        <div className="main-container w-full min-h-screen flex flex-col justify-center items-start pt-24 sm:pt-28 pb-20 lg:py-12">
          <h1 ref={h1Ref} className="text-2xl sm:text-3xl lg:text-[3.2vw] uppercase font-heading font-semibold">
            Digvijay Wadekar
          </h1>
          <h2 ref={h2Ref} className="text-5xl sm:text-6xl md:text-7xl lg:text-[8vw] font-heading font-bold leading-[1.05] sm:leading-[1] tracking-tight mt-3 mb-6">
            Frontend <br /> <span className='text-stroke'>Web Developer</span>
          </h2>
          <GradientButton text="Let's Talk" onClick={openContact} className="gradient-btn" />
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 pointer-events-none" aria-hidden="true">
          <span className="text-[11px] sm:text-xs font-heading font-medium uppercase tracking-[0.2em] text-white/40">Scroll</span>
          <div className="scroll-indicator flex flex-col items-center gap-1">
            <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-white/50 to-transparent rounded-full" />
            <svg width="10" height="6" viewBox="0 0 12 8" fill="none" className="text-white/40">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Star shape */}
        <div className="star absolute -z-1 top-72 sm:top-80 lg:top-32 right-[-40%] sm:right-[-25%] lg:right-[-12%] opacity-70 sm:opacity-80 pointer-events-none">
          <svg className='h-[42vh] sm:h-[48vh] lg:h-[80vh]' width="100%" height="100%" viewBox="0 0 653 631" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M290.361 1.55611L333.686 284.91L333.88 286.179L334.595 285.114L496.712 43.7172L530.894 66.1542L354.53 298.39L353.719 299.458L355.031 299.182L644.761 238.164L651.694 276.116L359.086 321.398L357.759 321.603L358.897 322.315L605.849 476.828L581.885 510.336L344.939 341.783L343.894 341.039L344.16 342.294L403.733 622.683L363.139 630.092L319.819 346.737L319.626 345.469L318.911 346.534L156.783 587.928L122.522 565.048L298.964 333.261L299.777 332.192L298.463 332.469L8.73045 393.474L1.564 354.212L294.405 310.247L295.74 310.046L294.596 309.329L47.5646 154.375L71.6092 121.305L308.567 289.864L309.612 290.609L309.345 289.353L249.767 8.96559L290.361 1.55611Z" stroke="url(#paint0_linear_1074_2)"/>
            <defs>
            <linearGradient id="paint0_linear_1074_2" x1="4.77595" y1="374.593" x2="648.724" y2="257.056" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF4D6D"/>
            <stop offset="0.25" stopColor="#BD3EB2"/>
            <stop offset="0.5" stopColor="#7B2FF7"/>
            <stop offset="0.75" stopColor="#2F86F7"/>
            <stop offset="1" stopColor="#2FF7ED"/>
            </linearGradient>
            </defs>
          </svg>
        </div>

      </div>
    </>
  )
}

export default Hero