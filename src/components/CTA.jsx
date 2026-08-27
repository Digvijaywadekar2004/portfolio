import React, { useRef } from 'react'
import GradientButton from './GradientButton'
import { useContact } from '../context/ContactContext'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Split a string into individual character spans
const splitIntoChars = (el) => {
  if (!el || el.querySelector('.split-char')) return [];
  const text = el.textContent;
  el.innerHTML = text
    .split('')
    .map(ch =>
      ch === ' '
        ? '<span class="split-char" style="display:inline-block">&nbsp;</span>'
        : `<span class="split-char" style="display:inline-block">${ch}</span>`
    )
    .join('');
  return el.querySelectorAll('.split-char');
};

const CTA = () => {
  const { openContact } = useContact();
  const ctaRef     = useRef(null);
  const headingRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Background color transition white → black on scroll
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

    // Character stagger entrance animation on headline
    // toggleActions: "play none none reset"
    //   onEnter       → play   (scroll into view)
    //   onLeave       → none   (scroll past, do nothing)
    //   onEnterBack   → none   (scroll back to end, do nothing)
    //   onLeaveBack   → reset  (scroll back above start → reset chars to invisible)
    //                          so the animation replays fresh every time the user scrolls in
    const chars = splitIntoChars(headingRef.current);
    if (chars.length) {
      gsap.from(chars, {
        opacity: 0,
        y: 30,
        rotateX: -40,
        stagger: 0.018,
        duration: 0.5,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reset',
        },
      });
    }
  }, { scope: ctaRef });

  return (
    <>
      <div ref={ctaRef} className="transition-colors duration-300">
        <div className="main-container py-20 lg:py-28 h-full flex flex-col gap-8 justify-center items-center">
          <h2
            ref={headingRef}
            className='max-w-6xl text-2xl md:text-3xl xl:text-[40px] 2xl:text-5xl text-center leading-[1.25] perspective-[600px]'
          >
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