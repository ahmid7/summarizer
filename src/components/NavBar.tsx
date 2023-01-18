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

    links.forEach( ( link, index ) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const id = link.querySelector("a")?.getAttribute("href")?.split("#")[1]

        gsap.to(window, {
          scrollTo:( 
            document.getElementById(id).offsetLeft * ( document.querySelector(".article").offsetWidth / ( document.querySelector(".article").offsetWidth - window.innerWidth ) ) 
          ),
        })
      })
    })

  },[])

  return (
    <nav className={` h-[100vh] bg-white outline outline-4 outline-black hidden md:grid ${ scrollProgress > 0.25 ? "" : "" } `}>
      <header className={`font-poppins md:h-[27vh] xl:h-[27vh]  text-[2.65vw] text-center flex justify-center items-center pb-[3vw]  ${ scrollProgress! > 0.25 ? "" :" " }`}> 
        <span>SumAI<span className='text-coffee-bean-brown text-[5.56vw]'>.</span></span>
      </header> 

      <ul className='nav-ul outline outline-4 h-[73vh] xl:h-[73vh] outline-coffee-text'>
        <li className='links'><a href='#home'>home</a></li>
        <li className='links'><a href='#summarizer'>summarizer</a></li>
        <li className='links'><a href='#about'>about</a></li>
        <li className='links'><a href='#team'>team</a></li>
      </ul>
    </nav>
  )
}

export default NavBar