import React from "react"
import { gsap, ScrollTrigger } from "gsap/all"

import { LongLeftArrow } from '../../assets/svgIcons' 

gsap.registerPlugin(ScrollTrigger)

function TeamReachOutPage() {

  const stayInTouchRef = React.useRef(null)

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia()

      mm.add("(max-width:768px)", () => {
        gsap.fromTo(stayInTouchRef.current, {
            marginTop: '-10rem'
          }, 
          { 
            scrollTrigger: {
              trigger: stayInTouchRef.current,
              scrub: true,

            },
            marginTop: "10rem",
          }
        )


      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className='md:h-screen md:w-[90vw] md:overflow-hidden'>
      <div className='grid-template md:h-full'>
        <div className='bg-white grid gap-y-5 md:gap-y-0 md:grid-cols-2 divide-x-2 divide-black'>
          <div className='py-2 px-5 md:px-[1.75vw]'>
            <h2 className='header-text pt-[2.08vw]' id="reachOutHeader">It’s ok to reach out</h2>

            <p className='mid-text'>This was a project executed purely out of passion and pursuit of knowlegde, any and all questions are welcome. <br/> <br/> Please reach out to any of the  Team members that you think can answer your questions.</p>

            <button className='button-style button-outline2 mt-2'>
              <LongLeftArrow/>
              Reach out now
            </button>
          </div>
            
          <div/>
        </div>

        <div className='w-full relative -z-20 uppercase py-6 bg-black text-white font-six-caps text-9xl md:text-[13.89vw] leading-none center' ref={stayInTouchRef}>
          <p>stay in touch </p>
        </div>
      </div>

    </section>
  )
}

export default TeamReachOutPage