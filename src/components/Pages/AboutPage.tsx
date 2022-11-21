import React from 'react'

import { NavBar } from '../'
import { LongRightArrow, LongLeftArrow,MarqueeIcon } from '../../assets/svgIcons'

function AboutPage() {
  return (
    <section className='md:h-screen'>
      <div className='layout-grid2 divide-x-2 divide-black'>
        <NavBar
          logo = { true }
          page= 'about'
        />

        <div className='layout-grid3  divide-y-2 md:divide-x-2 divide-black'>
          <div className='divide-y-2 divide-black'>
            <div className='px-5  py-10 md:px-[3vw]  md:py-[2.08vw]'>

              <h1 className='header-text'>
                It really is not rocket science how it works 
              </h1>

              <p className='mid-text'>
                Trained by machine learning, text summarizer uses the concept of abstractive summarization to summarize a book, an article, or a research paper.<br/> <br/>It uses NLP to create acute sentences and generates a summary in which the main idea remains intact. It is a premuim level tool that uses AI to work. Therefore, the summary produced by this tool has been checked to be accurate.
              </p>

              <button className='button-style button-outline1'>
                <LongLeftArrow/>
                Check it out 
              </button>

            </div>

            <div className='text-center hidden md:block'>
              a marquee text will be added here later 
            </div>
          </div>


          <div className='grid grid-rows-2  divide-y-2 divide-black'>
            <div className='px-5 py-5 md:px-[1.74vw] md:pb-0 md:pt-[3.08vw]'>
              <h3 className='uppercase font-six-caps tracking-[0.125em] text-[38px] md:text-[3vw]'>How does it work though ?</h3>

              <p className='tracking-wider  py-3 text-justify leading-normal [&_span]:text-coffee-bean-brown'>
                All you really have to do is put in your desired
                long text and click the <span> “ Summarize ”  </span> button. That is really all you have to do.
                <br/>
                <br/>
                If you are just here to check the site out and
                you do not have any text to test it with, just
                go right ahead and <span>“ Use our sample text ”</span>
              </p>

              <button className='mt-2 py-[1.111vw] button-style button-outline2'>
                <LongLeftArrow />
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