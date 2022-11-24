import React from 'react'
import { gsap } from "gsap"

import { NavBar } from '../'


import { 
  SummarizerLogo, 
  Logo, 
  RightArrow,
  LongRightArrow 
} from '../../assets/svgIcons'

function HomePage() {

  const [ isMenuOpened, setIsMenuOpened ] = React.useState( false )



  let container = React.useRef(null)

  let element = gsap.utils.selector(container)

  function updateMenuOpen() {
    setIsMenuOpened(!isMenuOpened)
  }

  React.useEffect(() => {
    if( isMenuOpened ) {
      gsap.fromTo(element(".li"), {
          xPercent: 100,
        },
        { 
          xPercent: 0,
          duration: 0.4,
          stagger: 0.1,
          yoyo: true,
          ease: "bounce.Out"
        }
      )
    }
  }, [isMenuOpened])

  return (
    <section className='w-screen md:divide-y-4 divide-coffee-text'>
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
          <div ref={ container  } className='md:hidden '>
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
          <h2 className='header-text text-center md:text-left'> Pro level Sumarization <br/> at your fingertips.</h2>

          <p className='mid-text md:pr-28 text-center md:text-justify min-w-4/5 mx-auto md:w-full'>Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Etiam eu turpis molestie,  dictum est a, mattis tellus. Sed  dignissim, metus nec fringilla  accumsan, risus sem.</p>

          <button className='button-style button-outline1 mx-auto md:mx-0'>
            summarize now
            <LongRightArrow />
          </button>
        </div>

        <div className='grid grid-layout5  divide-y-2 divide-coffee-text'>
          <div className='bg-coffee-bean-deep flex-center'>
            <Logo />
          </div>

          <div className='flex-center py-2'>
            <span className='rotate-90 md:rotate-0'>
              <RightArrow />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage

// grid-cols-2 md:grid-cols-1 md:grid-rows-2