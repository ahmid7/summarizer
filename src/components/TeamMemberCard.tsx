import React from 'react'

import { 
  LinkedinIcon, 
  GithubIconLarge
}  from '../assets/svgIcons'

type memberDetails = {
  imgSrc: string;
  name: string;
  linkedInLink: string;
  githubLink: string;
  titleHeld: string;
}

function TeamMemberCard({ memberDetails }: { memberDetails: memberDetails }) {
  const { imgSrc, name, titleHeld, githubLink, linkedInLink } = memberDetails
  return (
    <div className=''>
      <div>
        <img 
          src={ imgSrc }
          alt={ name }
          className='min-h-60 w-full md:h-full'
        />
      </div>

      <div className='text-center'>
        <p className='text-4xl md:text-[4.17vw] tracking-[0.205em] font-six-caps py-3'>{ name }</p>
        <p className='text-[#999999] text-base md:text-[1.25vw] uppercase pb-1'>{ titleHeld }</p>
        
        <div className='center py-[0.5vw]'>
          <div className='flex gap-x-2'>
            <a href={ githubLink }>
              <GithubIconLarge/>
            </a>

            <a href={ linkedInLink }>
              <LinkedinIcon/>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamMemberCard