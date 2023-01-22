import React from 'react'
import { 
  gsap,
  Observer
} from "gsap/all"

import { TeamMemberCard } from '../'

const TeamMembersData = [
  {
    name: 'Funbi',
    titleHeld: 'co-creator & data scientist',
    imgSrc: '/images/funbi.jpg',
    linkedInLink: '#',
    githubLink: '#'
  },

  {
    name: 'Bola',
    titleHeld: 'co-creator & Designer',
    imgSrc: '/images/bola.jpg',
    linkedInLink: '#',
    githubLink: '#'
  },

  {
    name: 'Odunayo',
    titleHeld: 'web developer',
    imgSrc: '/images/ibrahim.jpg',
    linkedInLink: '#',
    githubLink: '#'
  },
]

gsap.registerPlugin(Observer)

function TeamPage() {
  const teamPageRef = React.useRef(null)
  const teamMemberContainer = React.useRef(null)
  const teamMembers = gsap.utils.selector(teamMemberContainer) 

  const [text, setText] = React.useState('The Team')

  const [memberNumber, setMemberNumber] = React.useState({
    prevState: 0,
    currentState: 0
  })

  function updateText(value: string) {
    setText(value)
  }

  React.useLayoutEffect(() => {
     
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia()
      

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(teamMembers(".teamMemberCard"), {
            yPercent: 40
          }, 
          {
            scrollTrigger: {
              trigger: ".teamMemberCard",
            },
            yPercent: 0,
            stagger: 0.1,
            duration: 1.5,
            yoyo:true,
            ease: "back.out"
          }
        )

        gsap.to(".textMove", {
          scrollTrigger: {
            trigger: "#displayText",
            scrub: 1,
            start: "top 40%",
          },
          yPercent: 40,
        })
      })
    }, teamPageRef)

    return () => ctx.revert()
    
  },[])

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let matchMedia = gsap.matchMedia()

      matchMedia.add("(min-width: 768px)", () => {
        const tl = gsap.timeline()
        
        gsap.fromTo(".textMove", {
            yPercent: -25 * memberNumber.prevState
          }, 
          {
            yPercent: -25 * memberNumber.currentState,
            duration: 1.2,
            ease: "back.out"
          }
        )
      })

    }, teamPageRef)
    return () => ctx.revert()
  },[memberNumber])

  return (
    <article ref={ teamPageRef } className='teamWrapper contain md:h-screen divide-x-4 divide-black flex flex-nowrap flex-shrink-0  md:overflow-y-hidden'>
      <section>
        <div className='layout-grid2 md:divide-x-2 divide-black'>
          <div className='md:h-screen'>
      
          </div>

          <div className='px-5 py-12 md:pl-[5.65vw] md:pr-[2.36vw] md:pt-[0.5vw]'>

            <h1 className='uppercase tracking-[5vw] font-six-caps text-[80px] md:h-[21.05vw] md:text-[20.83vw] opacity-[0.4] leading-none overflow-hidden' id='displayText'>
              <div className='textMove'>
                <span className='flex items-center justify-center'>The Team</span>
                <span className='hidden md:flex items-center justify-center'>Funbi</span>
                <span className='hidden md:flex items-center justify-center'>Bola</span>
                <span className='hidden md:flex items-center justify-center'>Odunayo</span>
              </div>
            </h1>

            <div 
              className='grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-6 md:gap-x-20 md:-translate-y-36 pt-4 md:pt-0 overflow-hidden' 
              ref={ teamMemberContainer }
              onMouseLeave= { () => setMemberNumber({ prevState: memberNumber.currentState, currentState: 0 }) }
            >

              <div 
                className='teamMemberCard'
                id='teamMember1'
                onMouseEnter={ () => setMemberNumber({ prevState: memberNumber.currentState, currentState: 1 }) }
              >
                <TeamMemberCard
                  memberDetails= { TeamMembersData[0] }
                  updateText={ updateText }
                />
              </div>

              <div 
                className='teamMemberCard'
                id='teamMember2'
                onMouseEnter={ () => setMemberNumber({ prevState: memberNumber.currentState, currentState: 2 }) }
              >
                <TeamMemberCard
                  memberDetails= { TeamMembersData[1] }
                  updateText={ updateText }
                />
              </div>

              <div 
                className='teamMemberCard'
                id='teamMember3'
                onMouseEnter={ () => setMemberNumber({ prevState: memberNumber.currentState, currentState: 3 }) }
              >
                <TeamMemberCard
                  memberDetails= { TeamMembersData[2] }
                  updateText={ updateText }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export default TeamPage