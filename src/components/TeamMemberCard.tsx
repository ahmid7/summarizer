import React from 'react'
import { SiNotion } from "react-icons/si"

import { 
  LinkedinIcon, 
  GithubIconLarge,
}  from '../assets/svgIcons'

type memberDetails = {
  imgSrc: string;
  name: string;
  linkedInLink: string;
  githubLink?: string;
  titleHeld: string;
  notionLink?: string
}

type TeamMemberDetails = {
  memberDetails: memberDetails;
  updateText: (value: string) => void;
}

function TeamMemberCard({ memberDetails, updateText }: TeamMemberDetails) {
  const { 
    imgSrc, 
    name, 
    titleHeld, 
    githubLink, 
    linkedInLink,
    notionLink
  } = memberDetails
  
  return (
    <div>
      <div className=''>
        <img 
          src={ imgSrc }
          alt={ name }
          className='min-h-60 w-full md:h-full'
        />
      </div>

      <div className='text-center'>
        <p className='text-4xl md:text-[4.17vw] tracking-[0.205em] font-six-caps py-3 leading-none'>{ name }</p>
        <p className='text-[#999999] text-base md:text-[1.25vw] uppercase pb-1'>{ titleHeld }</p>
        
        <div className='center py-[0.5vw]'>
          <div className='flex gap-x-2 [&_a]:hover:cursor-pointer'>
            {
              githubLink && 
              <a href={ githubLink } target="_blank">
                <GithubIconLarge/>
              </a>
            }

            {
              notionLink && 
              <a href={notionLink} target="_blank">
                <SiNotion className='dribble-icon' />
              </a>
            }

            <a href={ linkedInLink } target="_blank">
              <LinkedinIcon/>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamMemberCard