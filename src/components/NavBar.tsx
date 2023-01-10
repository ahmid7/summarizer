import React from 'react'
import { Context } from '../App'

type NavBar = {
  logo?: boolean;
  page?: string;
}

function NavBar({ logo, page }: NavBar) {
  const scrollProgress = React.useContext(Context)
  console.log(scrollProgress)

  return (
    <nav className=' divide-black hidden md:grid  md:w-[11.60vw] header-layout'>
      <header className={`font-poppins text-[2.65vw] pt-[1.94vw] text-center ${ scrollProgress! >= 0.24 ? "bg-white visible transition-all duration-200 outline outline-4 outline-black" : "bg-transparent invisible" }`}> 
        SumAI<span className='text-coffee-bean-brown text-[5.56vw]'>.</span>
      </header> 

      <ul className='nav-ul bg-white outline outline-4 outline-coffee-text'>
        <li><a href='#home' className={ page === 'home' ? 'active-link' : '' }>home</a></li>
        <li><a href='#summarizer' className={ page === 'summarizer' ? 'active-link' : '' }>summarizer</a></li>
        <li><a href='#about' className={ page === 'about' ? 'active-link' : '' }>about</a></li>
        <li><a href='#team' className={ page === 'team' ? 'active-link' : '' }>team</a></li>
      </ul>
    </nav>
  )
}

export default NavBar