import React from 'react'
import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/all'
import SplitType from "split-type"

import { NavBar } from '../'

import { 
  SummarizerLogo, 
  Logo, 
  RightArrow,
  LongRightArrow 
} from '../../assets/svgIcons'


gsap.registerPlugin(ScrollTrigger)



function HomePage() {

  const [ isMenuOpened, setIsMenuOpened ] = React.useState( false )

  let wrapper = React.useRef(null)

  let Linkscontainer = React.useRef(null)

  let links = gsap.utils.selector(Linkscontainer)

  let arrowsContainer = React.useRef(null)

  let arrows = gsap.utils.selector(arrowsContainer)



  function updateMenuOpen() {
    setIsMenuOpened(!isMenuOpened)
  }

  React.useLayoutEffect(() => {
  }, []) 

  React.useLayoutEffect(() => {
    if( isMenuOpened ) {
      gsap.fromTo(links(".li"), {
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
    }
  }, [isMenuOpened])

  React.useLayoutEffect(() => {
    const mySplitText = new SplitType('#textAnimation', { types: "words" }) 

    let tl = gsap.timeline()

    tl.fromTo(".word", 
      {
        yPercent: 100,
      },
      {
        // border: "2px solid red",
        yPercent: 0,
        stagger: 0.05,
        delay: 0.1,
        ease: "back.out",
        duration: 1
      }
    )

    tl.fromTo("#fadeInAnimate", 
      {
        // autoAlpha: 0,
        opacity: 0,
        yPercent: 25,
      },
      {
        // autoAlpha: 1,
        opacity: 1,
        yPercent: 0,
        duration: 2,
        ease: 'back.out',
      }
    )

    tl.fromTo(arrows(".arrow"),
      {
        opacity: 0,
        xPercent: 0,
        display: "inline-block",
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
        ease: "power2.out"
      }
    )

  
  },[])

  return (
    <section ref={ wrapper } className='value w-screen  md:h-screen overflow-y-hidden md:divide-y-4 divide-coffee-text '>
      <header className={`fixed top-0 z-50 bg-white w-full outline outline-4 outline-coffee-text md:relative md:divide-y-4 divide-coffee-text`}>

        <div className='grid-layout6 divide-x-4 divide-coffee-text'>
          <div className=' center py-2'>
            <SummarizerLogo/>
          </div>

          <div className='md:hidden center text-xl' onClick={ updateMenuOpen }>
            <p>menu<span className='text-coffee-bean-brown text-4xl'>.</span></p>
          </div>
        </div>
                                                                                
        {
          isMenuOpened && 
          <div ref={ Linkscontainer  } className='md:hidden '>
             <ul className='h-[85vh] bg-black w-full grid grid-rows-4 text-center scroll-smooth outline outline-2 outline-black text-black [&_li]:bg-white [&_li]:border-2 [&_li]:border-black [&_li]:grid [&_li]:place-content-center text-xl capitalize'>
              <li className='li'><a href='#home'>home</a></li>
              <li className='li'><a href='#summarizer'>summarizer</a></li>
              <li className='li'><a href='#about'>about</a></li>
              <li className='li'><a href='#team'>team</a></li>
            </ul>
          </div>
        }
      </header>

      <div className='min-h-[87vh] md:h-[73vh] relative pt-[16vh] md:pt-0 md:divide-x-4 divide-coffee-text layout-grid'>
        <div className='hidden md:block'>
          <NavBar
            page='home'
          />
        </div>

        <div className='px-[4.444vw] py-5'>
          <h2 className='header-text text-center md:text-left overflow-hidden' id="textAnimation"> Pro level Sumarization <br/> at your fingertips.</h2>

          <div id='fadeInAnimate'>
            <p className='text-small mid-text md:pr-28 text-center md:text-justify min-w-4/5 mx-auto md:w-full'>Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Etiam eu turpis molestie,  dictum est a, mattis tellus. Sed  dignissim, metus nec fringilla  accumsan, risus sem.</p>

            <button className='button-style button-outline1 mx-auto md:mx-0 group'>
              summarize now
              <div className='group-hover:animate-bounceRight'>
                <LongRightArrow />
              </div>
            </button>
          </div>

        </div>

        <div className='grid grid-layout5  divide-y-2 divide-coffee-text'>
          <div className='bg-coffee-bean-deep flex-center'>
            <p className='' id='logoAnimate'><Logo /></p>
          </div>

          <div className='flex items-center justify-center py-2 relative' ref={ arrowsContainer }>

            <div className='rotate-90 md:rotate-0 arrow opacity-0'>
              <RightArrow />
            </div>

            {/* you could also add arrow as a class here to aniamte all the entire hero all at once. */}
            <div className='rotate-90 md:rotate-0 opacity-100'>
              <RightArrow />
            </div>

            <div className='rotate-90 md:rotate-0 arrow opacity-0'>
              <RightArrow />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage