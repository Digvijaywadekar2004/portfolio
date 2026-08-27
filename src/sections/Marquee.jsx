import React from 'react'
import star from '../assets/images/star.svg'

// Technical / dev-focused words replacing the generic CREATE DESIGN INSPIRE / BUILD DEVELOP SHIP
const Row1Content = () => (
  <>
    ARCHITECT <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
    DEPLOY <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
    CONTAINERIZE <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
    SCALE <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
    SHIP <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
    ARCHITECT <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
    DEPLOY <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
    CONTAINERIZE <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
    SCALE <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
    SHIP <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
  </>
)

const Row2Content = () => (
  <>
    DESIGN <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
    ENGINEER <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
    OPTIMIZE <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
    ITERATE <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
    LAUNCH <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
    DESIGN <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
    ENGINEER <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
    OPTIMIZE <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
    ITERATE <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
    LAUNCH <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
  </>
)

const Marquee = () => {
  return (
    <>
      {/* Row 1 — forward @ 15s */}
      <div className="overflow-hidden bg-white text-black pb-28 lg:pb-44" aria-hidden="true">

        <div className="whitespace-nowrap animate-marquee text-6xl lg:text-[7vw] font-heading font-semibold leading-[1] tracking-tight">
          <span className="flex gap-4 lg:gap-8 mx-8">
            <Row1Content />
          </span>
        </div>

        {/* Row 2 — reverse @ 18s (slightly slower = more organic) */}
        <div className="whitespace-nowrap animate-marquee-reverse text-6xl lg:text-[7vw] font-heading font-semibold leading-[1] tracking-tight">
          <span className="flex gap-4 lg:gap-8 mx-8">
            <Row2Content />
          </span>
        </div>

      </div>
    </>
  )
}

export default Marquee