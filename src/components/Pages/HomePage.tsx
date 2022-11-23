import React from 'react'

import { NavBar } from '../'

import { 
  SummarizerLogo, 
  Logo, 
  RightArrow,
  LongRightArrow 
} from '../../assets/svgIcons'

function HomePage() {

  const [scrollY, setScrollY] = React.useState(0)
 
  React.useEffect( () => {
    const handleScroll = (e: Event) => {
      setScrollY( window.scrollY )
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const [ isMenuOpened, setIsMenuOpened ] = React.useState( false )

  function updateMenuOpen() {
    setIsMenuOpened(!isMenuOpened)
  }

  return (
    <section className='w-screen divide-y-4 divide-coffee-text'>
      <header className={` divide-y-4 divide-coffee-text ${ scrollY <= 0 ? '' : 'fixed top-0 w-full outline outline-4 outline-coffee-text bg-white z-50' }`}>

        <div className='grid-layout6 divide-x-4 divide-coffee-text'>
          <div className='center py-2'>
            <SummarizerLogo/>
          </div>

          <div className='md:hidden center text-xl' onClick={ updateMenuOpen }>
            <p>menu<span className='text-coffee-bean-brown text-4xl'>.</span></p>
          </div>
        </div>
                                                                                
        {
          isMenuOpened && 
          <div className='md:hidden '>
             <ul className='h-[86vh] w-full grid grid-rows-4 text-center scroll-smooth text-black [&_li]:grid [&_li]:place-content-center text-lg capitalize'>
              <li><a href='#home'>home</a></li>
              <li><a href='#summarizer'>summarizer</a></li>
              <li><a href=''>about</a></li>
              <li><a href=''>team</a></li>
            </ul>
          </div>
        }
      </header>

      <div className='min-h-[87vh] md:h-[73vh] md:divide-x-4 divide-coffee-text layout-grid'>
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