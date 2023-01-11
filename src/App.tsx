import React from 'react'

import {
  gsap,
  ScrollTrigger, 
  CSSRulePlugin,
  Observer,
  ScrollToPlugin
} from 'gsap/all'

import { 
  HomePage, 
  SummarizerPage,
  AboutPage,
  TeamPage,
  TeamReachOutPage,
  NavBar
} from "./components" 

gsap.registerPlugin(
  ScrollTrigger,
  Observer, 
  CSSRulePlugin,
  ScrollToPlugin
)

export const Context = React.createContext<null | number>(null)

function App() {

  const sectionContainerRef = React.useRef(null);

  const [scrollProgress, setScrollProgress] = React.useState<number>(0)

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia()


      mm.add("(min-width:768px)", () => {
        const sections = gsap.utils.toArray(".section")
        
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionContainerRef.current,
            preventOverlaps: true,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            scrub: true,
            snap: 1/ (sections.length - 1),
            end: () => "+=" + document.querySelector("main")?.offsetWidth,
            onUpdate: (self) => {
              setScrollProgress(self.progress)
            }
          }
        })
      })
      
    }, sectionContainerRef)
    
    return () => ctx.revert()
    
  }, [])

  return (
    <Context.Provider value={ scrollProgress}>
      <main ref={ sectionContainerRef }  className="wrapper md:h-screen md:overflow-hidden flex flex-col md:flex-row flex-nowrap divide-y-4 md:divide-y-0 md:divide-x-4 divide-coffee-text w-[600%]" id='app'>
        <section className='fixed top-0 left-0 h-screen z-50'>
          <NavBar />
        </section>

        <section className='section' id='home' >
          <HomePage /> 
        </section>

        <section className='section' id="summarizer">
          <SummarizerPage />
        </section>  

        <section className='section' id="about">
          <AboutPage /> 
        </section>  

        <section className='section' id="team">
          <TeamPage/> 
        </section>

        <section className='section'>
          <TeamReachOutPage/>
        </section>

      </main>
    </Context.Provider>
  )
}

export default App

// TODO: onCLick on the arrow button update the scrollProgress value and also pass the scrollprogress function into the context
// TODO: also add snap to the smooth scrolling