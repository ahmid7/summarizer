// @ts-nocheck
import React from 'react'
import { gsap,Observer } from "gsap/all"
import SplitType from "split-type"
import { RiMenuFoldFill } from "react-icons/ri"


import { 
  SummarizerLogo, 
  Logo, 
  RightArrow,
  LongRightArrow,
  HamburgerIcon
} from '../../assets/svgIcons'

gsap.registerPlugin(Observer)

function HomePage() {

  // hamburger state
  const [ isMenuOpened, setIsMenuOpened ] = React.useState( false )

  // ref for the wrapper of the home page
  let wrapper = React.useRef(null)

  // link container for mobile
  let Linkscontainer = React.useRef(null)

  // use this in gsap to select element under the linksContainer  
  let links = gsap.utils.selector(Linkscontainer)

  // ref for the arrows
  let arrowsContainer = React.useRef(null)

  // use this in gsap to select element under the arrowsContainer
  let arrows = gsap.utils.selector(arrowsContainer)

  // update menu state
  function updateMenuOpen() {
    if(isMenuOpened) {
      setTimeout(() => {setIsMenuOpened(false)}, 800)
    } else {
      setIsMenuOpened(true)
    }
  } 


  React.useLayoutEffect(() => {
    // handle animation based on the state of the hamburger menu
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
          stagger: 0.08,
          delay: 0.1,
          ease: "back.out",
          duration: 1.3
        }
      )

      mm.add("(min-width: 768px)", () => {
 
        const links = document.querySelectorAll(".links")

        links.forEach( ( link, index ) => {
          link.addEventListener("click", (e) => {
            e.preventDefault()
            const id = link.querySelector("a")?.getAttribute("href")?.split("#")[1]

            gsap.to(window, {
              scrollTo:( 
                document.getElementById(id).offsetLeft * ( document.querySelector(".article").offsetWidth / ( document.querySelector(".article").offsetWidth - window.innerWidth ) ) 
              ),
            })
          })
        })

        tl.fromTo("#subHeader", 
          {
            opacity: 0,
            yPercent: 25,
          },
          {
            opacity: 1,
            yPercent: 0,
            duration: 2,
            delay: -0.6,
            ease: 'back.out',
            scrollTrigger: {
              trigger: "#subHeader",
            }
          }
        )

        gsap.to('#button', {
          opacity: 1,
          duration: 1.2,
          delay: 1.4,
        })
  
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

      // mobile animations
      mm.add("(max-width: 767px)", () => {
        tl.fromTo("#subHeaderWithButton", 
          {
            opacity: 0,
            yPercent: 25,
            zIndex: -1,
          },
          {
            opacity: 1,
            yPercent: 0,
            zIndex: 1,
            delay: -0.8,
            duration: 2.5,
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
    <section ref={ wrapper } className='w-screen md:h-screen overflow-y-hidden divide-coffee-text homeWrapper'>
      <header className={`fixed top-0 z-20 md:z-0 bg-white w-full outline outline-4 outline-coffee-text md:relative md:divide-y-4 divide-coffee-text`}>

        <div className='grid-layout6 divide-x-4 divide-coffee-text'>
          <div className='center py-2'>
            <SummarizerLogo/>
          </div>

          <div id='hamburger' className='md:hidden flex items-center justify-center text-4xl' onClick={ updateMenuOpen }>
            <HamburgerIcon/>
          </div>
        </div>

        {
          isMenuOpened && 
          <div ref={ Linkscontainer  } className='md:hidden '>
             <ul id='navLink' className='h-[85vh] bg-black w-full grid grid-rows-4 text-center outline outline-2 outline-black text-black [&_li]:bg-white [&_li]:border-2 [&_li]:border-black [&_li]:grid [&_li]:place-content-center [&_li]:relative [&_li]:z-10 text-xl capitalize'>
              <li id='homeLink' className='li'><a href='#home'>home</a></li>
              <li className='li'><a href='#summarizer'>summarizer</a></li>
              <li className='li'><a href='#about'>about</a></li>
              <li className='li'><a href='#team'>team</a></li>
            </ul>
          </div>
        }
      </header>

      <div className='min-h-[87vh] md:h-[73vh] relative pt-[16vh] md:pt-0 md:divide-x-4 divide-coffee-text layout-grid'>

        {/* nav link for desktop */}
        <nav className='hidden md:block' >
          <ul className='h-[73vh] nav-ul text-[#a0786e]'>
            <li className='links text-coffee-bean-brown'><a href="#home">Home</a></li>
            <li className='links '><a href="#summarizer">Summarizer</a></li>
            <li className='links'><a href="#about">About</a></li>
            <li className='links'><a href="#team">Team</a></li>
          </ul>
        </nav>


        <div className='px-[4.444vw] py-5 md:h-[74vh]'>
          {/* header */}
          <h2 className='header-text text-center md:text-left overflow-hidden' id="textAnimation"> Pro level Summarization <br/> at your fingertips.</h2>

          <div id='subHeaderWithButton'>
            {/* subHeader */}
            <p className='text-small mid-text md:pr-28 text-center md:text-justify min-w-4/5 mx-auto md:w-full' id='subHeader'>This project offers a machine learning trained tool that translates long texts the same way a really smart person would do. Check it out now, summarize for the available</p>

            {/* button */}
            <button className='button-style button-outline1 mx-auto md:mx-0 group flex items-center md:block md:opacity-0' id='button'>
              <a href='#summarizer'>
                Summarize Now
                <span className='hidden md:block group-hover:animate-bounceRight'>
                  <LongRightArrow />
                </span>
              </a>
            </button>
          </div>

        </div>

        <div className='grid grid-layout5 divide-y-2 divide-coffee-text iconsContainer'>
          <div className='bg-coffee-bean-deep flex-center '>
            <p id='logoAnimate'><Logo /></p>
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


// TODO: first generate only the sixfonts and merriweather caps from the google fonts

//TODO: second 