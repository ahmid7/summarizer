import React from 'react'

import { NavBar } from '../'

import { 
  SummarizerLogo, 
  Logo, 
  RightArrow,
  LongRightArrow 
} from '../../assets/svgIcons'

function HomePage() {
  return (
    <section className='w-screen divide-y-4 divide-coffee-text'>
      <header className='grid-layout6 divide-x-4 divide-coffee-text'>

        <div className='center py-2'>
          <SummarizerLogo/>
        </div>

        <div className='md:hidden center text-xl'>
          <p>menu<span className='text-coffee-bean-brown text-4xl'>.</span></p>
        </div>
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