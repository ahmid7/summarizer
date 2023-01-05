import React from 'react'
import { gsap,Observer } from "gsap/all"
import SplitType from "split-type"
import { RiMenuFoldFill } from "react-icons/ri"


import { NavBar } from '../'

import { 
  SummarizerLogo, 
  Logo, 
  RightArrow,
  LongRightArrow,
} from '../../assets/svgIcons'

gsap.registerPlugin(Observer)

function HomePage() {
  const [ isMenuOpened, setIsMenuOpened ] = React.useState( false )

  let wrapper = React.useRef(null)

  let Linkscontainer = React.useRef(null)

  let links = gsap.utils.selector(Linkscontainer)

  let arrowsContainer = React.useRef(null)

  let arrows = gsap.utils.selector(arrowsContainer)

  function updateMenuOpen() {
    if(isMenuOpened) {
      setTimeout(() => {setIsMenuOpened(false)}, 800)
    } else {
      setIsMenuOpened(true)
    }
  } 

  React.useLayoutEffect(() => {
    if( isMenuOpened ) {
      let hamburgerTl = gsap.timeline()
      hamburgerTl.fromTo(links(".li"), {
          xPercent: 100,
        },
        { 
          xPercent: 0,
          duration: 0.6,
          stagger: 0.1,
          yoyo: true,
          ease: "bounce"
          //* decide between bounce and back!
          // ease:"bounce({ strength: 0.9, endAtStart: true  })"
        }
      )

      function handleLinksClicks(){
        hamburgerTl.reverse()
        setTimeout(() => {setIsMenuOpened(false)}, 800) 
      }

      Observer.create({
        target: "#navLink",
        type: "touch, pointer",
        onClick: handleLinksClicks
      })

      Observer.create({
        target: "#hamburger",
        type: "touch, pointer",
        onClick: () => hamburgerTl.reverse()
      })
    }

  }, [isMenuOpened])

  React.useLayoutEffect(() => {
    const mySplitText = new SplitType('#textAnimation', { types: "words" }) 

    const ctx = gsap.context(() => {
      
      let mm = gsap.matchMedia();

      let tl = gsap.timeline()

      tl.fromTo(mySplitText.words, {
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

      mm.add("(min-width: 768px)", () => {

        tl.fromTo("#fadeInAnimate", 
          {
            opacity: 0,
            yPercent: 25,
          },
          {
            opacity: 1,
            yPercent: 0,
            duration: 2,
            ease: 'back.out',
            scrollTrigger: {
              trigger: "#fadeInAnimate",
            }
          }
        )
  
        gsap.fromTo(arrows(".arrow"),
          {
            opacity: 0,
            xPercent: 0,
          },
          {
            opacity: 1,
            xPercent: 10,
            duration: 1.2,
            // duration should either 1.2 or 1
            stagger: 0.2,
            // stagger should be either 0.2 or 0.5
            yoyo: true,
            repeat: -1,
            ease: "power2.out",
            delay:0.5,
            
          }
        )
      })

      mm.add("(max-width: 767px)", () => {
        tl.fromTo("#fadeInAnimate", 
          {
            opacity: 0,
            yPercent: 25,
            zIndex: -1,
          },
          {
            opacity: 1,
            yPercent: 0,
            zIndex: 1,
            duration: 1.5,
            ease: 'back.out',
          }
        )

        gsap.fromTo('.iconsContainer', {
            opacity: 0,
          }, 
          {
            opacity: 1,
            duration: 1,
            delay: 0.5
          }
        )

        gsap.fromTo(arrows(".arrow"),
          {
            opacity: 0,
            yPercent: 10,
          },
          {
            opacity: 1,
            yPercent: 0,
            duration: 1,
            // duration should either 1.2 or 1
            stagger: 0.4,
            // stagger should be either 0.2 or 0.5
            yoyo: true,
            repeat: -1,
            ease: "power2.out",
            delay:0.5,
          }
        )

      })
      
    }, wrapper)


    return () => ctx.revert()

  },[])


  return (
    <section ref={ wrapper } className='w-screen md:h-screen overflow-y-hidden divide-coffee-text '>
      <header className={`fixed top-0 z-50 bg-white w-full outline outline-4 outline-coffee-text md:relative md:divide-y-4 divide-coffee-text`}>

        <div className='grid-layout6 divide-x-4 divide-coffee-text'>
          <div className=' center py-2'>
            <SummarizerLogo/>
          </div>

          <div id='hamburger' className='md:hidden flex items-center justify-center text-4xl' onClick={ updateMenuOpen }>
            <RiMenuFoldFill/>
          </div>
        </div>
                                                                                
        {
          isMenuOpened && 
          <div ref={ Linkscontainer  } className='md:hidden '>
             <ul id='navLink' className='h-[85vh] bg-black w-full grid grid-rows-4 text-center scroll-smooth outline outline-2 outline-black text-black [&_li]:bg-white [&_li]:border-2 [&_li]:border-black [&_li]:grid [&_li]:place-content-center [&_li]:relative [&_li]:z-10 text-xl capitalize'>
              <li id='homeLink' className='li'><a href='#home'>home</a></li>
              <li className='li'><a href='#summarizer'>summarizer</a></li>
              <li className='li'><a href='#about'>about</a></li>
              <li className='li'><a href='#team'>team</a></li>
            </ul>
          </div>
        }
      </header>

      <div className='min-h-[87vh] md:h-[73vh] relative pt-[16vh] md:pt-0 md:divide-x-4 divide-coffee-text layout-grid'>
        <div className='hidden md:block' >
          
        </div>

        <div className='px-[4.444vw] py-5 md:h-[74vh]'>
          <h2 className='header-text text-center md:text-left overflow-hidden' id="textAnimation"> Pro level Summarization <br/> at your fingertips.</h2>

          <div id='fadeInAnimate'>
            <p className='text-small mid-text md:pr-28 text-center md:text-justify min-w-4/5 mx-auto md:w-full'>This project offers a machine learning trained tool that translates long texts the same way a really smart person would do. Check it out now, summarize for the available</p>

            <button className='button-style button-outline1 mx-auto md:mx-0 group flex items-center md:block'>
              <a className='' href='#summarizer'>
                Summarize Now
                <span className='hidden md:block group-hover:animate-bounceRight'>
                  <LongRightArrow />
                </span>
              </a>
            </button>
          </div>

        </div>

        <div className='grid grid-layout5 divide-y-2 divide-coffee-text iconsContainer'>
          <div className='bg-coffee-bean-deep flex-center'>
            <p className='' id='logoAnimate'><Logo /></p>
          </div>

          <div className='flex items-center justify-center py-2 relative' ref={ arrowsContainer }>

            <div className='rotate-90 md:rotate-0 arrow md:block'>
              <RightArrow />
            </div>

            <div className='rotate-90 md:rotate-0 arrow hidden md:block'>
              <RightArrow />
            </div>

            <div className='rotate-90 md:rotate-0 arrow hidden md:block'>
              <RightArrow />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage