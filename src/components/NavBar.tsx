// @ts-nocheck

import React from 'react'
import { 
  gsap, 
  ScrollToPlugin,
  CSSPlugin
} from "gsap/all"


import { Context } from '../App'

gsap.registerPlugin(ScrollToPlugin)

function NavBar() {
  const scrollProgress = React.useContext(Context)

  React.useEffect(() => {
    const links = document.querySelectorAll(".links")

    links.forEach( link => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const id = link.querySelector("a")?.getAttribute("href")?.split("#")[1]

        gsap.to(window, {
          scrollTo: (
            document.getElementById(id)?.offsetLeft
          )
        })
      })
    })

  },[])

  return (
    <nav className=' divide-black hidden md:grid  md:w-[11.60vw] header-layout'>
      <header className={`font-poppins text-[2.65vw] pt-[1.94vw] text-center ${ scrollProgress! >= 0.24 ? "bg-white visible transition-all duration-200 outline outline-4 outline-black" : "bg-transparent invisible" }`}> 
        SumAI<span className='text-coffee-bean-brown text-[5.56vw]'>.</span>
      </header> 

      <ul className='nav-ul bg-white outline outline-4 outline-coffee-text'>
        <li className='links'><a href='#home'>home</a></li>
        <li className='links'><a href='#summarizer'>summarizer</a></li>
        <li className='links'><a href='#about'>about</a></li>
        <li className='links'><a href='#team'>team</a></li>
      </ul>
    </nav>
  )
}

export default NavBar