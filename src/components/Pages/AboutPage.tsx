import React from 'react'
import SplitType from 'split-type'
import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/all'

import { 
  LongRightArrow, 
  LongLeftArrow,
  MeantForMarquee 
} from '../../assets/svgIcons'


gsap.registerPlugin(ScrollTrigger)

function AboutPage() {
  const aboutContainer = React.useRef(null)

  const howItWorksHeader = React.useRef(null)
  
  
  React.useEffect(() => {
    const myText = new SplitType('#textAnimate', { types: 'words' })  
    const headerText2 = new SplitType('#headerText2', { types: 'words' })
    const detailsText = new SplitType('#details', { types: 'words, lines' })
    const detailsText2 = new SplitType('#detailsText2', { types: 'words, lines' })
    
    // ! right here, find a way to create the animation as a component and use it here instead of rewriting it everytime

    // ! might be the useRef affecting your component check it 

    const ctx = gsap.context(() => {

      let mm = gsap.matchMedia()
  
      mm.add("(max-width:768px)", () => {
        gsap.fromTo(myText.words, {
            yPercent: 100,
          }, 
          {
            yPercent: 0,
            stagger: 0.05,
            delay: 0.1,
            ease: "back.out",
            duration: 1,
            scrollTrigger: {
              trigger: '#textAnimate',
            }
          }
        )
  
        gsap.fromTo(headerText2.words, {
          yPercent: 100,
        }, 
        {
          yPercent: 0,
          stagger: 0.05,
          delay: 0.1,
          ease: "back.out",
          duration: 1,
          scrollTrigger: {
            trigger: '#headerText2',
          }
        }
      )
  
        gsap.set(detailsText.lines, {
          overflow: 'hidden',
        })
  
        gsap.set(detailsText2.lines, {
          overflow: 'hidden',
        })
  
  
        gsap.fromTo(detailsText.words,{
            yPercent: 110,
          }, 
          {
            yPercent: 0,
            stagger: 0.02,
            duration: 0.8,
            yoyo: true,
            ease: "power2.out",
            scrollTrigger: {
              trigger: '#midText',
            }
          }
        )
  
        gsap.fromTo(detailsText2.words,{
          yPercent: 100,
        }, 
        {
          yPercent: 0,
          stagger: 0.02,
          duration: 0.8,
          yoyo: true,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '#detailsTextContainer',
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
              trigger: "#button", 
              start: "top 50%", 
              end: "+=2000px", 
              scrub: 1 
            }
          }
        )
      })

    }, aboutContainer)


    return () => ctx.revert()
    
  },[])
  
  return (
    <section className='md:h-screen overflow-y-hidden' ref={ aboutContainer }>
      <div className='layout-grid2 md:divide-x-4 divide-black'>
        <div className='hidden md:block h-screen'>
          
        </div>

        <div className='layout-grid3  md:h-screen divide-y-[0.2778vw] md:divide-y-0 divide-x-[0.2778vw] divide-black'>
          <div className='layout-grid4 divide-y-[0.2778vw] divide-black'>
            <div className='px-5  py-10 md:px-[3vw]  md:py-[2.08vw] textContainer overflow-hidden'>

              <h1 className='header-text overflow-hidden ' id='textAnimate'>
                It really is not rocket science how it works 
              </h1>

              <p className='mid-text' id='midText'>
                <p id='details'> Trained by machine learning, text summarizer uses the concept of abstractive summarization to summarize a book, an article, or a research paper.<br/> <br/>It uses NLP to create acute sentences and generates a summary in which the main idea remains intact. It is a premuim level tool that uses AI to work. Therefore, the summary produced by this tool has been checked to be accurate. </p>
              </p>

              <button className='button-style button-outline1 group' id="button">
                <div className='group-hover:animate-bounceLeft'>
                  <LongLeftArrow/>
                </div>

                Check it out 
              </button>

            </div>

            <div className='flex items-center overflow-x-hidden text-[4.208vw] capitalize whitespace-nowrap'>
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
              <h3 className='uppercase font-six-caps tracking-[0.125em] text-[38px] md:text-[3vw] ' id='headerText2'>How does it work though ?</h3>

              <p className='tracking-wider  py-3 text-justify leading-normal [&_span]:text-coffee-bean-brown' id='detailsTextContainer'>
                <p id='detailsText2'>
                  All you really have to do is put in your desired
                  long text and click the <span> “ Summarize ”  </span> button. That is really all you have to do.
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