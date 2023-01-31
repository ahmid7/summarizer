import React from "react"
import { gsap } from "gsap/all"
import SplitType from "split-type"

import { Context } from "../../App"
import { LongLeftArrow } from '../../assets/svgIcons' 

function TeamReachOutPage({ updateModal }: { updateModal: () => void }) {
  // progress of the scroll
  const scrollProgress = React.useContext(Context)
  // stay in touch text ref
  const stayInTouchRef = React.useRef(null)
  // page container
  const reachOutPage = React.useRef(null)
  // detail text container
  const teamReachOutTextRef = React.useRef(null)
  // animation state
  const [animationState, setAnimationState] = React.useState(false)

  // handle mobile animations
  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia()

      mm.add("(max-width:767px)", () => {
        const headerSplitword = new SplitType("#reachOutHeader", { types: 'words' })
        const teamReachOutText = gsap.utils.selector(teamReachOutTextRef)
        const secondHeaderTextWords = new SplitType('#secondHeaderText', { types: "words" })
        const secondDetailsWordMobile = gsap.utils.selector(".secondDetailsTextMobile")
        const tl = gsap.timeline()
        
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
            duration: 0.4,
            stagger: 0.2,
            ease:"power2.out"
          }
        )
        
        tl.fromTo(secondHeaderTextWords.words, 

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
        
        

        tl.to(secondDetailsWordMobile(".span"),{
          y: "0%",
          stagger: 0.2,
          duration: 0.5,
          delay: 1,
          ease: "power2.easeOut",
            
        })

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
            marginTop: "9rem",
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  // change the animation state at a particular scroll progress and if the animationState is false
  React.useEffect(() => {
    if(scrollProgress! >= 0.85 && !animationState ) {
      setAnimationState(true)
    }
  }, [scrollProgress])

  // handle gsap animation for desktop devices using scrollProgress as a dependency
  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      const secondHeaderTextWords = new SplitType('#secondHeaderText', { types: "words" })

      let mm = gsap.matchMedia()
      

      mm.add("(min-width: 768px)", () => {
        const headerWordGsap = new SplitType("#reachOutHeader", { types:"words" })
        const detailWordGsap = gsap.utils.selector(".detailWordGsap")
        const secondDetailsWord = gsap.utils.selector(".secondDetailsTextDesktop")


        // animate the texts when the user scroll to a particular point 
        if(animationState) {
          gsap.fromTo(headerWordGsap.words, {
            yPercent: 100,
            immediateRender: false,
          },
          {
            yPercent: -100,
            stagger: 0.05,
            delay: 0.1,
            fontKerning: "none",
            ease: "back.out",
            duration: 2,
          }) 

          gsap.fromTo(secondHeaderTextWords.words, {
            yPercent: 100,
            immediateRender: false,
          },  
          {
            yPercent: -200,
            stagger: 0.05,
            delay: 0.1,
            fontKerning: "none",
            ease: "back.out",
            duration: 2,
          })

          gsap.fromTo(detailWordGsap(".span"), {
            yPercent: 50,
            opacity: 0
          }, 
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.3,
            delay: 0.8
          })

          gsap.to(secondDetailsWord(".span"), {
            y: "0%",
            stagger: 0.2,
            duration: 0.6,
            delay: 1,
            ease: "power2.easeOut",
          })
        }
      })
    }, reachOutPage)

    return () => ctx.revert()
  }, [animationState])
  


  return (
    <section className='md:h-screen md:w-screen md:overflow-hidden' ref={ reachOutPage }>
      <div className="layout-grid2 md:divide-x-4 md:h-screen md:divide-coffee-text">
        <div className="hidden md:block">
          {/* nav bar space */}
        </div>

        <div className='grid-template md:h-full'>
          <div className='bg-white grid gap-y-5 md:gap-y-0 md:grid-cols-2 divide-y-2 divide-black md:divide-x-2 md:divide-y-0'>
            <div className='py-2 px-5 md:px-[1.75vw]'>
              {/* header text */}
              <h2 className='header-text md:pt-[1vw] overflow-hidden' id="reachOutHeader"><span className="md:translate-y-full">It’s ok to reach out</span></h2>

              {/* desktop version */}
              <div className="mid-text hidden md:block [&_span]:inline-block detailWordGsap md:[&_span]:opacity-0 ">
                <span className="span">This was a project executed purely out of passion</span>
                <span className="span">and pursuit of knowledge, any and all questions</span>
                <span className="span">are welcome.</span>
                <br/>
                <br/>
                <span className="span">Please reach out to any of the  Team members</span>
                <span className="span">that you think can answer your questions.</span>
              </div>

              {/* mobile version */}
              <div className="mid-text block md:hidden [&_span]:inline-block" ref={ teamReachOutTextRef }>
                <span className="span">This was a project executed purely</span>
                <span className="span">out of passion and pursuit of</span>
                <span className="span">knowledge, any and all questions</span>
                <span className="span">are welcome.</span>

                <br/>
                <br/>

                <span className="span">Please reach out to any of the </span>
                <span className="span">Team members that you think can</span>
                <span className="span">can answer your questions.</span>
              </div>

              {/* reach out button */}
              <button className='button-style button-outline2 group mt-2'>
                <a href="#team">
                  <span className="hidden md:block group-hover:animate-bounceLeft">
                    <LongLeftArrow/>
                  </span>
                  Reach out now
                </a>
              </button>
            </div>
              
            <div className="py-2 px-5 md:px-[1.75vw]">
              <h2 className="header-text overflow-hidden pt-[1vw]" id="secondHeaderText">
                <span className="md:translate-y-full">Be a Reading Hero: <br/> share this now</span>
              </h2>

              {/* desktop version */}
              <div className="mid-text hidden md:block [&_span]:inline-block [&_div]:overflow-hidden [&_span]:translate-y-full secondDetailsTextDesktop">

                <div>
                  <span className="span">
                    Want to be the hero of your friend group?
                  </span>
                </div>

                <div>
                  <span className="span">
                    Share the good news our text summarizer 
                  </span>
                </div>

                <div>
                  <span className="span">
                    website and save them hours of reading
                  </span>
                </div>

                <div>
                  <span className="span">
                  time! 
                  </span>
                </div>
              </div>

              {/* mobile version */}
              <div className="mid-text block md:hidden [&_span]:inline-block [&_div]:overflow-hidden [&_span]:translate-y-full secondDetailsTextMobile">
                <div>
                  <span className="span">Want to be the hero of your friend</span>
                </div>

                <div>
                  <span className="span">group? Share the good news our  </span>
                </div>

                <div>
                  <span className="span">text website and save them hours </span>
                </div>

                <div>
                  <span className="span">of reading time!</span>
                </div>

              </div>
              
              <button className="button-style button-outline1" onClick={ updateModal }>
                share link now
              </button>
            </div>

          </div>

          {/* stay in touch text */}
          <div className='w-full relative -z-20 uppercase bg-black text-white font-six-caps text-9xl md:text-[13.89vw] leading-none center overflow-hidden ' ref={stayInTouchRef}>
            <div className="py-6 ">
              <p>stay in touch </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default TeamReachOutPage
