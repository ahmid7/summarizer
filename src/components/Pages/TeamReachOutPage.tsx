import React from "react"
import { gsap } from "gsap/all"
import SplitType from "split-type"

import { Context } from "../../App"
import { LongLeftArrow } from '../../assets/svgIcons' 

function TeamReachOutPage() {

  const scrollProgress:any = React.useContext(Context)

  const stayInTouchRef = React.useRef(null)
  const reachOutPage = React.useRef(null)
  const teamReachOutTextRef = React.useRef(null)

  const [animationState, setAnimationState] = React.useState(false)

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia()

      mm.add("(max-width:767px)", () => {
        const headerSplitword = new SplitType("#reachOutHeader", { types: 'words' })
        const teamReachOutText = gsap.utils.selector(teamReachOutTextRef)

        gsap.fromTo(teamReachOutText(".span"), {
            yPercent: 50,
            opacity: 0
          }, 
          {
            scrollTrigger: {
              trigger: teamReachOutTextRef.current,
            },
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.3,
          }
        )

        gsap.fromTo(headerSplitword.words, 
          {
            yPercent: 50
          }, 
          {
            scrollTrigger: {
              trigger: "#reachOutHeader",
            },
            yPercent: 0,
            duration: 1.3,
            stagger: 0.05,
            delay: 0.1,
            ease: "back.out"
          }
        )
        
        

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

  React.useEffect(() => {
    if(scrollProgress >= 0.85 && !animationState ) {
      setAnimationState(true)
    }
  }, [scrollProgress])

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia()

      mm.add("(min-width: 768px)", () => {
        const headerText = new SplitType('#reachOutHeader', { types: "words" })
        if(animationState) {
          gsap.fromTo(headerText.words, {
              yPercent: 100,
            },
            {
              yPercent: 0,
              stagger: 0.05,
              delay: 0.1,
              ease: "back.out",
              duration: 1.3
            }
          )
        }
      })
    }, reachOutPage)

    return () => ctx.revert()
  }, [animationState])
  


  return (
    <section className='md:h-screen md:w-screen md:overflow-hidden' ref={ reachOutPage }>
      <div className="layout-grid2 md:divide-x-4 md:h-screen md:divide-coffee-text">
        <div className="hidden md:block">

        </div>

        <div className='grid-template md:h-full'>
          <div className='bg-white grid gap-y-5 md:gap-y-0 md:grid-cols-2 divide-x-2 divide-black'>
            <div className='py-2 px-5 md:px-[1.75vw]'>
              <h2 className='header-text pt-[2.08vw] overflow-hidden' id="reachOutHeader">It’s ok to reach out</h2>

              <p className='mid-text md:block hidden' id='detailSplit'>This was a project executed purely out of passion and pursuit of knowlegde, any and all questions are welcome. <br/> <br/> Please reach out to any of the  Team members that you think can answer your questions.</p>

              <div className="mid-text block md:hidden [&_span]:inline-block" ref={ teamReachOutTextRef }>
                <span className="span">This was a project executed purely</span>
                <span className="span">out of passion and pursuit of</span>
                <span className="span">knowlegde, any and all questions</span>
                <span className="span">are welcome.</span>

                <br/>
                <br/>

                <span className="span">Please reach out to any of the </span>
                <span className="span">Team members that you think can</span>
                <span className="span">can answer your questions.</span>
              </div>

              <button className='button-style button-outline2 group mt-2'>
                <a href="#team">
                  <span className="hidden md:block group-hover:animate-bounceLeft">
                    <LongLeftArrow/>
                  </span>
                  Reach out now
                </a>
              </button>
            </div>
              
            <div/>
          </div>

          <div className='w-full relative -z-20 uppercase py-6 bg-black text-white font-six-caps text-9xl md:text-[13.89vw] leading-none center' ref={stayInTouchRef}>
            <p>stay in touch </p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default TeamReachOutPage