import React from 'react'
import { 
  gsap, 
  ScrollToPlugin,
  CSSPlugin
} from "gsap/all"



import { Context } from '../App'

gsap.registerPlugin(ScrollToPlugin, CSSPlugin)



function NavBar() {
  const scrollProgress = React.useContext(Context)

  const homeRef = React.useRef(null)
  const summarizerRef = React.useRef(null)
  const aboutRef = React.useRef(null)
  const teamRef = React.useRef(null)

  const handleScrollTo = (id:string) => {
    const targetElement = document.getElementById(id)
    const container = document.getElementById("#app")
    const elementRect = targetElement?.getBoundingClientRect()
    const absoluteElementPosition = elementRect?.left! + container?.scrollLeft!;

    gsap.to(container, {
      scrollLeft:absoluteElementPosition,
      duration: 1,
      ease: 'power3.inOut'
    })
  }
  React.useEffect(() => {
  },[])

  return (
    <nav className=' divide-black hidden md:grid  md:w-[11.60vw] header-layout'>
      <header className={`font-poppins text-[2.65vw] pt-[1.94vw] text-center ${ scrollProgress! >= 0.24 ? "bg-white visible transition-all duration-200 outline outline-4 outline-black" : "bg-transparent invisible" }`}> 
        SumAI<span className='text-coffee-bean-brown text-[5.56vw]'>.</span>
      </header> 

      <ul className='nav-ul bg-white outline outline-4 outline-coffee-text'>
        <li ref={ homeRef } onClick={ () => { handleScrollTo("#summarizer") } }>home</li>
        <li ref= { summarizerRef }><a href='#summarizer' className=''>summarizer</a></li>
        <li ref= { aboutRef }><a href='#about' className=''>about</a></li>
        <li ref= { teamRef }><a href='#team' className=''>team</a></li>
      </ul>
    </nav>
  )
}

export default NavBar