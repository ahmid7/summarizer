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
    // get all the links
    const links = document.querySelectorAll(".links")
   
    // map through it and add an event Listener and scroll to a particular link when clicked
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

    // TODO: we might have to figure out a better way to this
    // links.forEach( ( link, index ) => {
    //   link.addEventListener("mouseenter", (e) => {
    //     gsap.to('')
    //   })
    // })

  },[])


  React.useLayoutEffect( () => {
    console.log( scrollProgress )
    // animation that handle the active links
    if( scrollProgress >= 0.25) {
      document.querySelector(".summarizer-active")?.classList.add("active-link")
      console.log( document.querySelector(".summarizer-active")?.classList )
    }
  },[scrollProgress])

  return (
    <nav className={` h-[100vh] bg-white outline outline-4 outline-black hidden md:grid ${ scrollProgress > 0.25 ? "" : "" } `}>
      <header className={`font-poppins md:h-[27vh] xl:h-[27vh]  text-[2.65vw] text-center flex justify-center items-center pb-[3vw]  ${ scrollProgress! > 0.25 ? "" :" " }`}> 
        <span>SumAI<span className='text-coffee-bean-brown text-[5.56vw]'>.</span></span>
      </header> 

      <ul className='nav-ul outline outline-4 h-[73vh] xl:h-[73vh] outline-coffee-text text-[#a0786e]'>
        <li className='links'><a href='#home'>home</a></li>
        <li className='links summarizer-active'><a href='#summarizer'>summarizer</a></li>
        <li className='links about-active'><a href='#about'>about</a></li>
        <li className='links team-active'><a href='#team'>team</a></li>
      </ul>
    </nav>
  )
}

export default NavBar