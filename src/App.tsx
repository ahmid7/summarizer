import React from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import { 
  HomePage, 
  SummarizerPage,
  AboutPage,
  TeamPage,
  TeamReachOutPage
} from "./components" 

gsap.registerPlugin(ScrollTrigger)

function App() {

  const wrapper = React.useRef(null)

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(wrapper.current,  {
        x: "-390vw",
        duration: 20,
        scrollTrigger: {
          trigger: wrapper.current,
          start: "top top",
          pin: true,
          scrub: true,
        }
      })
    }, wrapper)

    return () => ctx.revert()
  },[])


  return (
    <div ref={ wrapper } className="md:max-h-screen w-screen flex flex-nowrap divide-x-4 divide-coffee-text">
      <section id='home'>
        <HomePage />
      </section>

      <section id="summarizer">
        <SummarizerPage/>
      </section>  

      <section id="about">
        <AboutPage /> 
      </section>

      <section id="team">
        <TeamPage/>
      </section>

      <section>
        <TeamReachOutPage/>
      </section>
    </div>
  )
}

export default App