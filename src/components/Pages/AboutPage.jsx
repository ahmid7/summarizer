import React from 'react'
import SplitType from 'split-type'
import { gsap } from "gsap/all"
import { Observer,ScrollToPlugin } from 'gsap/all'

import { LongLeftArrow } from '../../assets/svgIcons'
import { Context } from '../../App'

gsap.registerPlugin(Observer, ScrollToPlugin)

function AboutPage() {
  const aboutContainer = React.useRef(null)
  const detailsText1Ref = React.useRef(null)
  const detailsText2Ref = React.useRef(null)
  const detailText1Mobile = React.useRef(null)
  const buttonToSummarizer1 = React.useRef(null)
  const buttonToSummarizer2 = React.useRef(null)


  const [animationState, setAnimationState] = React.useState({
    headerText1: false,
    headerText2: false,
  })

  let detailsText = gsap.utils.selector(detailsText1Ref)
  let detailsText2 = gsap.utils.selector(detailsText2Ref)

  const scrollProgress = React.useContext(Context)

  function scrollTO(offsetY) {
    gsap.to(window, { duration: 1.2, scrollTo: { y: '#summarizer', offsetY:offsetY, autoKill:false } })
  }

  React.useLayoutEffect(() => {
    
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia()
      
      mm.add("(max-width:767px)", () => {
        const headerText1 = new SplitType('.headerText1Gsap', { types: 'words' })  
        const headerText2 = new SplitType('.headerText2Gsap', { types: 'words' })
        const detailsText2 = new SplitType('#detailsText2', { types: 'words' })

        const detailsTextMobile = gsap.utils.selector(detailText1Mobile)

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
            scrollTrigger: {
              trigger: '.headerText1Gsap',
              scrub: true,
            }
          }
        )

        const button1 = buttonToSummarizer1.current
        const button2 = buttonToSummarizer2.current

        gsap.fromTo(detailsTextMobile(".span"), {
            yPercent: 100,
          }, 
          {
            scrollTrigger: {
              trigger: detailText1Mobile.current,
              scrub: true,
            },
            yPercent: 0,
            duration: 0.3,
          }
        )

        button1.addEventListener("click", () => {
          scrollTO(60)
        })

        button2.addEventListener("click", () => {
          scrollTO(65)
        })

        

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
  
  React.useEffect(() => {

    if(scrollProgress >= 0.41 && animationState.headerText1 === false) {
      setAnimationState({ ...animationState, headerText1: true })
    }

    if(scrollProgress >= 0.45 && animationState.headerText2 === false) {
      setAnimationState({ ...animationState, headerText2: true })
    }

  }, [scrollProgress])

  React.useLayoutEffect(() => {
   const ctx  = gsap.context(() => {
    let matchMedia = gsap.matchMedia()

    matchMedia.add("(min-width:768px)", () => {
      const headerText1 = new SplitType('.headerText1Gsap', { types: 'words' })  
      const tl = gsap.timeline()

      if(animationState.headerText1 === true) {
        tl.fromTo(headerText1.words, {
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

        gsap.to(detailsText(".span"),{
          y: "0%",
          stagger: 0.2,
          duration: 0.5,
          delay: 1,
          ease: "power2.easeOut",
        })
      }

    })
   }, aboutContainer)

   return () => ctx.revert()
  }, [animationState.headerText1])
  

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let matchMedia = gsap.matchMedia()

      matchMedia.add("(min-width: 768px)", () => {
        const headerText2 = new SplitType('.headerText2Gsap', { types: 'words' })

        const tl = gsap.timeline()

        if(animationState.headerText2 === true) {
          tl.fromTo(headerText2.words, {
            yPercent: 100,
            immediateRender: false,
          }, 
          {
            yPercent: 0,
            stagger: 0.05,
            ease: "back.out",
            duration: 1.3,
          })

          gsap.to(detailsText2(".span"),{
            y: "0%",
            stagger: 0.2,
            duration: 0.5,
            delay: 1,
            ease: "power2.easeOut",
          })
        }
      })
    }, aboutContainer)

    return () => ctx.revert()
  }, [animationState.headerText2])


  return (
    <section className='md:h-screen overflow-y-hidden' ref={ aboutContainer }>
      <div className='layout-grid2 md:divide-x-4 divide-black'>
        <div className='hidden md:block h-screen'>
          
        </div>

        <div className='layout-grid3  md:h-screen divide-y-[0.2778vw] md:divide-y-0 divide-x-[0.2778vw] divide-black'>
          <div className='layout-grid4 divide-y-[0.2778vw] divide-black'>
            <div className='px-5  py-10 md:px-[3vw]  md:py-[1vw] textContainer overflow-hidden' id='cont'>

              <h1 className='header-text overflow-hidden headerText1Gsap'>
                <span className='md:translate-y-full'>It  really  is  not  rocket  science  how  it  works</span>
              </h1>

              {/* mobile  */}
              <div className='mid-text block md:hidden [&_span]:block [&_div]:overflow-hidden text-justify' ref={ detailText1Mobile }>
                <div>
                  <span className='span'>Trained by machine learning, text</span>
                </div>

                <div>
                  <span className='span'>summarizer uses the concept of</span>
                </div>

                <div>
                  <span className='span'>abstractive summarization to</span> 
                </div>

                <div>
                  <span className='span'>summarize a book, an article, or a</span> 
                </div>

                <div>
                  <span className='span'>research paper</span> 
                </div>

                <br/>

                <div>
                  <span className='span'>It uses NLP to create acute</span> 
                </div>

                <div>
                  <span className='span'>sentences and generates a </span> 
                </div>

                <div>
                  <span className='span'>summary in which the main idea</span> 
                </div>

                <div>
                  <span className='span'>remains intact. It is a premium</span> 
                </div>

                <div>
                  <span className='span'>level tool that uses AI to work.</span> 
                </div>

                <div>
                  <span className='span'>Therefore, the summary produced</span> 
                </div>

                <div>
                  <span className='span'>by this tool has been checked to</span> 
                </div>

                <div>
                  <span className='span'>be accurate.</span> 
                </div>
              </div>


              {/* desktop */}
              <div className='hidden md:block [&_div]:overflow-hidden [&_span]:inline-block mid-text [&_span]:translate-y-full' ref={ detailsText1Ref }>
                <div>
                  <span className='span'>Trained by machine learning, text summarizer uses the</span>
                </div>

                <div>
                  <span className='span'>concept of abstractive summarization to summarize a</span>
                </div>

                <div>
                  <span className='span'>book, an article, or a research paper.</span>
                </div>

                <br/>

                <div>
                  <span className='span'>It uses NLP to create acute sentences and generates a</span>
                </div>

                <div>
                  <span className='span'>summary in which the main idea remains intact. It is a</span>
                </div>

                <div>
                  <span className='span'>premium level tool that uses AI to work. Therefore, the</span>
                </div>

                <div>
                  <span className='span'>summary produced by this tool has been checked to be</span>
                </div>

                <div>
                  <span className='span'>accurate.</span>
                </div>
              </div>
              

              <div className='mt-4 md:mt-0'>
                {/* TODO: fix the link to either using scrollto or progress */}
                <button className='button-style button-outline1 group' id='aboutButton1' ref={ buttonToSummarizer1 }>
                  {/* <a href='#summarizer'> */}
                    <span className='hidden md:block group-hover:animate-bounceLeft'>
                      <LongLeftArrow/>
                    </span>

                    Check it out 
                  {/* </a> */}
                </button>
              </div>

            </div>

            <div className='flex items-center overflow-x-hidden text-[4.208vw] capitalize whitespace-nowrap marqueeContainer'>
              <div className='md:animate-textMarque' id="marquee-mobile">
                {/* take note of what you did here and check if it works for desktop */}
                
                {
                  [...Array(5)].map((_, i) => (
                    <span key={i}>made for students &middot; writers &middot; teachers &middot;  journalists &middot;</span>
                  ))
                }
              </div>
            </div>
          </div>


          <div className='grid grid-rows-2 !divide-y-[0.2778vw] divide-black'>
            <div className='px-5 py-5 md:px-[1.74vw] md:pb-0 md:pt-[2.08vw] '>
              <h3 className='uppercase font-six-caps tracking-[0.125em] text-[38px] md:text-[3vw] headerText2Gsap'>How does it work though ?</h3>

              <div className='tracking-wider py-3 text-justify leading-normal md:hidden [&_span]:text-coffee-bean-brown details2TextContainer'>
                <p id='detailsText2'>
                  All you really have to do is put in your desired
                  long text and click the <span> “ Summarize ” </span> button. That is really all you have to do.
                  <br/>
                  <br/>
                  If you are just here to check the site out and
                  you do not have any text to test it with, just
                  go right ahead and <span>“ Use our sample text ”</span>
                </p>
              </div>

              <div className='tracking-wider leading-normal py-3 text-justify hidden md:block [&_em]:text-coffee-bean-brown [&_span]:inline-block [&_span]:translate-y-full [&_div]:overflow-hidden md:leading-relaxed' ref={ detailsText2Ref }>
                <div>
                  <span className='span'>All you really have to do is put in your desired long text</span>
                </div>

                <div>
                  <span className='span'>and click the <em className='text-coffee-bean-brown'>“ Summarize ”</em> button. That is really all </span>
                </div>

                <div>
                  <span className='span'>you have to do.</span>
                </div>

                <br/>

                <div>
                  <span className='span'>If you are just here to check the site out and you do not </span>
                </div>

                <div>
                  <span className='span'>have any text to test it with, just go right ahead and</span>
                </div>

                <div>
                  <span className='span'><em className='text-coffee-brown'>“ Use our sample text ”</em></span>
                </div>
              </div>

              <button className='mt-2 py-[1.111vw] button-style button-outline2 group' ref={ buttonToSummarizer2 }>
                {/* <a href='#summarizer'> */}
                  <span className='hidden md:block group-hover:animate-bounceLeft'>
                    <LongLeftArrow />
                  </span>

                  Go try it out now
                {/* </a> */}

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