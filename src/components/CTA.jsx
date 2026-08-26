import React, { useRef } from 'react'
import GradientButton from './GradientButton'
import { useContact } from '../context/ContactContext'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CTA = () => {
  const { openContact } = useContact();
  const ctaRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // fromTo with explicit end colour so tween doesn't go to transparent
    gsap.fromTo(
      ctaRef.current,
      { backgroundColor: "#ffffff" },
      {
        backgroundColor: "#000000",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "center bottom",
          end: "60% bottom",
          scrub: true,
        },
      }
    );
  });

  return (
    <>
      <div ref={ctaRef} className="transition-colors duration-300">
        <div className="main-container py-20 lg:py-28 h-full flex flex-col gap-8 justify-center items-center">
          <h2 className='max-w-6xl text-2xl md:text-3xl xl:text-[40px] 2xl:text-5xl text-center leading-[1.25]'>
            Open to internships, real-world projects &amp; open-source collabs —{' '}
            <span style={{ fontStyle: 'italic', opacity: 0.75 }}>let's build something that matters.</span>
          </h2>
          <GradientButton text="Say Hello →" onClick={openContact} />
        </div>
      </div>
    </>
  )
}

export default CTA