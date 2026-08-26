import React from 'react'
import star from '../assets/images/star.svg'

// Each row's content is duplicated inside ONE span so the -50% keyframe
// produces a perfectly seamless loop with no blank gap.
const Row1Content = () => (
  <>
    CREATE <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
    DESIGN <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
    INSPIRE <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
    CREATE <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
    DESIGN <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
    INSPIRE <img src={star} alt="" className="marquee-star1 w-[7vw]" aria-hidden="true" />
  </>
)

const Row2Content = () => (
  <>
    BUILD <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
    DEVELOP <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
    SHIP <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
    BUILD <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
    DEVELOP <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
    SHIP <img src={star} alt="" className="marquee-star2 w-[7vw]" aria-hidden="true" />
  </>
)

const Marquee = () => {
  return (
    <>
      <div className="overflow-hidden bg-white text-black pb-28 lg:pb-44" aria-hidden="true">

        {/* Row 1 — forward */}
        <div className="whitespace-nowrap animate-marquee text-6xl lg:text-[7vw] font-heading font-semibold leading-[1] tracking-tight">
          <span className="flex gap-4 lg:gap-8 mx-8">
            <Row1Content />
          </span>
        </div>

        {/* Row 2 — reverse */}
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