import React from 'react'
import SplitType from 'split-type'
import { gsap } from "gsap"

import { LongLeftArrow } from '../../assets/svgIcons'
import { Context } from '../../App'


function AboutPage() {
  const aboutContainer = React.useRef(null)
  const buttonRef = React.useRef(null)

  const [animationState, setAnimationState] = React.useState(false)

  const scrollProgress = React.useContext(Context)


  React.useLayoutEffect(() => {
    
    const ctx = gsap.context(() => {
      const headerText1 = new SplitType('.headerText1Gsap', { types: 'words' })  
      const headerText2 = new SplitType('.headerText2Gsap', { types: 'words' })
      const detailsText1 = new SplitType('.detailText1Gsap', { types: 'words' })
      const detailsText2 = new SplitType('#detailsText2', { types: 'words' })
      let mm = gsap.matchMedia()
      
      mm.add("(max-width:767px)", () => {

        gsap.fromTo(headerText1.words, {
            yPercent: 100,
            immediateRender: false,
          }, 
          {
            yPercent: 0,
            stagger: 0.05,
            delay: 0.1,
            fontKerning: "none",
            ease: "back.out",
            duration: 1,
          }
        )

        gsap.fromTo(detailsText1.words,{
            yPercent: 100,
            immediateRender: false
          }, 
          {
            yPercent: 0,
            stagger: 0.02,
            duration: 1,
            yoyo: true,
            ease: "power2.out",
            scrollTrigger: {
              trigger: detailsText1.words,
            }
          }
        )

        gsap.fromTo("#marquee-mobile", {
            xPercent: 0
          }, 
          { 
            xPercent: -100, 
            duration: 50, 
            ease: "none", 
            scrollTrigger: { 
              trigger: ".marqueeContainer", 
              start: "center 50%", 
              end: "+=2000px", 
              scrub: 1 
            }
          }
        )

        gsap.fromTo(headerText2.words, {
            yPercent: 100,
            immediateRender: false,
          }, 
          {
            yPercent: 0,
            stagger: 0.05,
            ease: "back.out",
            duration: 1.3,
            scrollTrigger: {
              trigger: '.headerText2Gsap',
            }
          }
       )

        gsap.fromTo(detailsText2.words,{
            yPercent: 50,
            immediateRender: false
          }, 
          {
            yPercent: 0,
            stagger: 0.02,
            delay: 0.01,
            duration: 1,
            yoyo: true,
            ease: "power2.out",
            scrollTrigger: {
              trigger: detailsText2.words,
            }
          }
        )

      })
    }, aboutContainer)


    return () => ctx.revert()
    
  },[])

  React.useLayoutEffect(() => {

    window.addEventListener(scrollX, () => {
      console.log(scrollX)
    })

    const context = gsap.context(() => {
      let matchMedia = gsap.matchMedia()

      matchMedia.add("(min-width:768px)", () => {
        // if(scrollProgress >= 0.41 && !animationState) {
          gsap.to(buttonRef.current, {
            duration: 1,
            opacity: 0,
            scrollTrigger: {
              target: buttonRef.current,
              markers:true,
              // scrub: true,
              start: '+=200vw'
            }
          })

          setTimeout(() => {
            setAnimationState(true)
          }, 2000);
        // }

        if(animationState) {
          gsap.set(buttonRef.current, {
            duration: 1,
            opacity: 0,
          })
        }
      })
    }, aboutContainer)
    // console.log(scrollProgress)

    return () => context.revert()
  }, [scrollProgress])


  return (
    <section className='md:h-screen overflow-y-hidden' ref={ aboutContainer }>
      <div className='layout-grid2 md:divide-x-4 divide-black'>
        <div className='hidden md:block h-screen'>
          
        </div>

        <div className='layout-grid3  md:h-screen divide-y-[0.2778vw] md:divide-y-0 divide-x-[0.2778vw] divide-black'>
          <div className='layout-grid4 divide-y-[0.2778vw] divide-black'>
            <div className='px-5  py-10 md:px-[3vw]  md:py-[2.08vw] textContainer overflow-hidden' id='cont'>

              <h1 className='header-text overflow-hidden headerText1Gsap'>
                It  really  is  not  rocket  scienc  how  it  works
              </h1>

              <p className='mid-text overflow-hidden' id='midText'>
                <p className='detailText1Gsap'> Trained by machine learning, text summarizer uses the concept of abstractive summarization to summarize a book, an article, or a research paper.
                <br className='hidden md:inline-block'/>
                <br className='hidden md:inline-block'/>
                It uses NLP to create acute sentences and generates a summary in which the main idea remains intact. It is a premuim level tool that uses AI to work. Therefore, the summary produced by this tool has been checked to be accurate. </p>
              </p>

              <div className='buttonContainer'>
                <button className='button-style button-outline1 group' id="button" ref={buttonRef}>
                  <div className='group-hover:animate-bounceLeft'>
                    <LongLeftArrow/>
                  </div>

                  Check it out 
                </button>
              </div>

            </div>

            <div className='flex items-center overflow-x-hidden text-[4.208vw] capitalize whitespace-nowrap marqueeContainer'>
              <div className='md:animate-textMarque' id="marquee-mobile">
                {/* take note of what you did here and check if it works for desktop */}
                
                {
                  [...Array(5)].map((_, i) => (
                    <span className=''>made for students &middot; writers &middot; teachers &middot;  journalists &middot;</span>
                  ))
                }
              </div>
            </div>
          </div>


          <div className='grid grid-rows-2 !divide-y-[0.2778vw] divide-black'>
            <div className='px-5 py-5 md:px-[1.74vw] md:pb-0 md:pt-[3.08vw] '>
              <h3 className='uppercase font-six-caps tracking-[0.125em] text-[38px] md:text-[3vw] headerText2Gsap'>How does it work though ?</h3>

              <p className='tracking-wider  py-3 text-justify leading-normal [&_span]:text-coffee-bean-brown details2TextContainer'>
                <p id='detailsText2'>
                  All you really have to do is put in your desired
                  long text and click the <span> “ Summarize ” </span> button. That is really all you have to do.
                  <br/>
                  <br/>
                  If you are just here to check the site out and
                  you do not have any text to test it with, just
                  go right ahead and <span>“ Use our sample text ”</span>
                </p>
              </p>

              <button className='mt-2 py-[1.111vw] button-style button-outline2 group'>
                <div className='group-hover:animate-bounceLeft'>
                  <LongLeftArrow />
                </div>

                Go try it out now
              </button>
            </div>

            <div className='center'>
              <img 
                src='/images/spiral2.jpg'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage