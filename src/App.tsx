import React from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'

import { 
  HomePage, 
  SummarizerPage,
  AboutPage,
  TeamPage,
  TeamReachOutPage,
} from "./components" 


function App() {
  
  const sectionContainerRef = React.useRef(null);

  gsap.registerPlugin(ScrollTrigger)

  // const options = {
  //   smooth: true
  // }

  
  // React.useLayoutEffect(() => {
  //   let sections  = gsap.utils.toArray(".section")
    
  //   const ctx = gsap.context(() => {
  //     gsap.to(sections, {
  //       xPercent: -100 * (sections.length - 1),
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: sectionContainerRef.current,
  //         pin: true,
  //         scrub: 1,
  //         snap: 1 / (sections.length - 1),
          
  //         onUpdate: ({ progress }) => { console.log(progress)}
  //         // base vertical scrolling on how wide the container is so it feels more natural.
  //         // horizontal: true,
  //         // end: () => "+=" + document.querySelector("article")?.offsetWidth,
  //         // markers: true,
  //       }
  //     })
  //   }, sectionContainerRef)

  //   return () => ctx.revert()

  // },[])

  // 

  return (
    // <LocomotiveScrollProvider
    //   options= { options }
    //   containerRef={ sectionContainerRef }
    // >

    // md:h-screen overflow-hidden flex flex-col md:flex-row flex-nowrap divide-y-4 md:divide-y-0 md:divide-x-4 divide-coffee-text
      <main ref={ sectionContainerRef }  className="md:h-screen overflow-hidden flex flex-col md:flex-row flex-nowrap divide-y-4 md:divide-y-0 md:divide-x-4 divide-coffee-text">
        <section className='section' id='home'>
          <HomePage /> 
        </section>

        <section className='section' id="summarizer">
          <SummarizerPage/>
        </section>  

        <section className='section' id="about">
          <AboutPage /> 
        </section>  

        <section className='section' id="team">
          {/* <div className=' '> */}
            <TeamPage/> 
          {/* </div>    */}

          {/* <div className='-translate-x-full relative secTeamSec'>
            <TeamReachOutPage/>
          </div> */}
        </section>


      </main>
    // </LocomotiveScrollProvider>
  )
}

export default App