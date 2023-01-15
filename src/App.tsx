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

  const main = React.useRef(null);

  const wrapper = React.useRef(null)

  const [scrollProgress, setScrollProgress] = React.useState<number>(0)

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia()

      mm.add("(min-width:768px)", () => {
        const sections = gsap.utils.toArray(".section")
        
        let scrollTween = gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: main.current,
            pin: true,
            scrub: true,
            end: () => "+=" + document.querySelector("article")?.offsetWidth,
            onUpdate: (self) => {
              setScrollProgress(self.progress)
            }
          }
        })
      })
      
    }, main)
    
    return () => ctx.revert()
    
  }, [])


  return (
    <Context.Provider value={ scrollProgress}>
      <main ref={ main }>
        <article ref= { wrapper } className="wrapper article md:h-screen md:overflow-hidden flex flex-col md:flex-row flex-nowrap divide-y-4 md:divide-y-0 md:divide-x-4 divide-coffee-text md:w-[500%]">

          <section className='hidden md:block md:fixed top-0 left-0 h-screen z-50'>
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
        </article>
      </main>
    </Context.Provider>
  )
}

export default App

// TODO: onCLick on the arrow button update the scrollProgress value and also pass the scrollprogress function into the context
// TODO: also add snap to the smooth scrolling