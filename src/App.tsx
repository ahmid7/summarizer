import React from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import { 
  HomePage, 
  SummarizerPage,
  AboutPage,
  TeamPage,
  TeamReachOutPage,
} from "./components" 

gsap.registerPlugin(ScrollTrigger)

function App() {

  const sectionContainer = React.useRef(null);

  
  React.useLayoutEffect(() => {
    let sections  = gsap.utils.toArray(".section")
    
    const ctx = gsap.context(() => {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionContainer.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + document.querySelector("article")?.offsetWidth,
          // pinSpacing: "margin",
        }
      })
    }, sectionContainer)

    return () => ctx.revert()

  },[])


  // ! create another scroll trigger which will trigger the team reachout page

  return (
    <div ref={ sectionContainer } className="article md:h-screen  overflow-hidden flex flex-col md:flex-row flex-nowrap divide-y-4 md:divide-y-0 md:divide-x-4 divide-coffee-text">
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
    </div>
  )
}

export default App