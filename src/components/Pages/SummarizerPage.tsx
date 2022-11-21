import React from 'react'

import { NavBar } from '..'
import { 
  GithubIcon, 
  PasteIcon,
  RightIndicator 
} from '../../assets/svgIcons'

function SummarizerPage() {
  return (
    <section className='min-h-screen md:h-screen mt-5 md:mt-0'>
      <div className='layout-grid2 md:divide-x-2 md:divide-coffee-text'>
        <NavBar 
          logo={ true } 
          page='summarizer'
        />
        {/* md:px-[5.523vw] */}
        <div className=' md:pt-4 text-white grid-template2'>
          <header className='md:mx-[5.523vw] bg-coffee-text px-4 md:px-[1.74vw] flex-between py-5'>
            <div className='flex-between'>
              <h2 className='font-merriweather text-lg md:text-[1.25vw] leading-relaxed text-white'>Text Translator</h2>
              
              <div className='w-[2.78vw] border-[1px] rotate-90 bg-white hidden md:block '/>

              <p className='md:text-[1vw] hidden md:block'> Premium level tool at your disposal</p>
            </div>

            <div className='font-inter bg-white px-2 py-3 md:p-4 text-coffee-text text-xs md:text-sm flex items-center gap-x-2'>
              <GithubIcon/>
              <p>View on Github</p>
            </div>
          </header>

          <div className='mx-4 my-8 md:mx-[5.523vw] md:my-2 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-y-5 md:gap-x-10'>
            <div className='outline outline-2 outline-coffee-text px-[1.74vw] pt-7 pb-4 relative'>

              <div className='min-h-[350px]'>
                <textarea className='resize-none w-full text-black border-none outline-none' placeholder='Paste / write about your topic  and then click the Summarize button .You could also use the sample text button provided below.'>
                  
                </textarea>
              </div>

              <div className='absolute px-5 md:px-[20px] cursor-pointer py-4 md:py-5 text-xs md:text-[0.9vw] bg-[#CFCFCF] text-black left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'>
                <div className='center pb-2'>
                  <PasteIcon/>
                </div>

                <p>Paste Text</p>
              </div>

              <p className='capitalize absolute bottom-5 right-2 text-xs md:text-[0.9vw] [&_span]:cursor-pointer'><span className='text-coffee-bean-brown mr-4'>try our sample text</span> <span className='bg-[#CFCFCF] text-[#999999] px-4 py-3'>summarize</span></p>
            </div>

            <div className='outline outline-2 outline-coffee-text text-xs md:text-[0.9vw] relative'>
              <div className='absolute bottom-5 w-full text-black'>

                <div className='flex-between px-4'>
                  <p>0 sentences &#183; 0 words</p>

                  <p className='flex items-center gap-x-2'>
                    <span className=' text-[#ED1818] cursor-pointer'>Clear Results</span>
                    <span className='bg-coffee-bean-brown text-white py-3 px-4 cursor-pointer'>share </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-black py-10  md:py-0 flex overflow-hidden pl-0 md:pl-[5.523vw]'>
            <div className='hidden md:flex justify-between items-center w-full'>
              {
                [...Array(6)].map((index) => ( <RightIndicator key={index} /> ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SummarizerPage