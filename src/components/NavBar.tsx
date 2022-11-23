import React from 'react'

type NavBar = {
  logo?: boolean;
  page: string;
}

export const Links = ({ page }: NavBar) => {
  return (
    <ul className='nav-ul h-[73vh] scroll-smooth'>
      <li><a href='' className={ page === 'home' ? 'active-link' : '' }>home</a></li>
      <li><a href='' className={ page === 'summarizer' ? 'active-link' : '' }>summarizer</a></li>
      <li><a href='' className={ page === 'about' ? 'active-link' : '' }>about</a></li>
      <li><a href='' className={ page === 'team' ? 'active-link' : '' }>team</a></li>
    </ul>
  )
}

function NavBar({ logo, page }: NavBar) {
  return (
    <nav className='divide-y-4 divide-black hidden md:block'>
      {
        typeof logo !== 'undefined' &&
        <header className='font-poppins text-[2.65vw] pt-[1.94vw] text-center h-[26.5vh]'> 
          SumAI<span className='text-coffee-bean-brown text-[5.56vw]'>.</span>
        </header>
      }

      {/* <ul className='nav-ul h-[73vh] scroll-smooth'>
        <li><a href='' className={ page === 'home' ? 'active-link' : '' }>home</a></li>
        <li><a href='' className={ page === 'summarizer' ? 'active-link' : '' }>summarizer</a></li>
        <li><a href='' className={ page === 'about' ? 'active-link' : '' }>about</a></li>
        <li><a href='' className={ page === 'team' ? 'active-link' : '' }>team</a></li>
      </ul> */}

      <Links page={ page } />
    </nav>
  )
}

export default NavBar

// border-b-2 border-r-2 border-coffee-text

// what i am trying to do
// on click make the color of the text go from 100 to 0%
// then make the active nav go from 100 to 0%