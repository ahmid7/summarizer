import React from 'react'

type NavBar = {
  logo?: boolean;
  page: string;
}

function NavBar({ logo, page }: NavBar) {
  return (
    <nav className='divide-y-4 divide-black hidden md:grid  md:w-[11.25vw] header-layout'>
      <header className='font-poppins text-[2.65vw] pt-[1.94vw] text-center relative -z-0'> 
        SumAI<span className='text-coffee-bean-brown text-[5.56vw]'>.</span>
      </header> 

      <ul className='nav-ul'>
        <li><a href='#home' className={ page === 'home' ? 'active-link' : '' }>home</a></li>
        <li><a href='#summarizer' className={ page === 'summarizer' ? 'active-link' : '' }>summarizer</a></li>
        <li><a href='#about' className={ page === 'about' ? 'active-link' : '' }>about</a></li>
        <li><a href='#team' className={ page === 'team' ? 'active-link' : '' }>team</a></li>
      </ul>
    </nav>
  )
}

export default NavBar