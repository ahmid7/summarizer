import React from 'react'
import { 
  QueryClient,
  QueryClientProvider
} from 'react-query'

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

const queryClient = new QueryClient()

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

        const nav = document.querySelector(".sticky-nav")

        gsap.to("#fixed-nav", {
          display:'block',
          scrollTrigger: {
            trigger: "#summarizer",
            containerAnimation: scrollTween,
            start: "left left",
            markers: true,
            toggleActions: "play none none reset",
          }
        })


        // handle scrollTo a section when button is clicked
        const buttonLinks = document.querySelectorAll('.button-style')

        buttonLinks.forEach(buttonLink => {
          buttonLink.addEventListener("click", (e) => {
            e.preventDefault()

            const id = buttonLink.querySelector("a")?.getAttribute("href")?.split("#")[1]

            gsap.to(window, {
              scrollTo: (
                /* 
                // @ts-ignore */
                document.getElementById(id).offsetLeft * ( document.querySelector(".article").offsetWidth / ( document.querySelector(".article").offsetWidth - window.innerWidth ) ) 
              )
            })
          })
        })
      })
      
    }, main)
    
    return () => ctx.revert()
    
  }, [])


  return (
    <QueryClientProvider client={ queryClient }>
      <Context.Provider value={ scrollProgress}>
        <main ref={ main }>
          <article ref= { wrapper } className="wrapper article md:h-screen md:overflow-hidden flex flex-col md:flex-row flex-nowrap divide-y-4 md:divide-y-0 md:divide-x-4 divide-coffee-text md:w-[500%]">

            <section className='section' id='home' >
              <HomePage /> 
            </section>

            <div className='fixed z-50 hidden w-[11.25vw]' id='fixed-nav'>
              <NavBar />
            </div>

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
    </QueryClientProvider>
  )
}

export default App


// TODO: so pin it using scrollTrigger let the trigger element be the summarizer page 
// TODO: all i need to do to the width is fix the width 