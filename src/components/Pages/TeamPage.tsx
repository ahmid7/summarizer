import React from 'react'
import { gsap } from "gsap"

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

function TeamPage() {
  const teamPageRef = React.useRef(null)
  const teamMemberContainer = React.useRef(null)
  const teamMembers = gsap.utils.selector(teamMemberContainer) 

  const [text, setText] = React.useState('The Team')

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
            duration: 1.2,
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

        if(text !== "The Team") {
          tl.fromTo(".textMove", {yPercent: 0}, {yPercent: -50, duration: 1.2, ease: "back.out"})
        } else {
          tl.fromTo(".textMove", {yPercent: -50, opacity: 0.2}, {yPercent: 0, opacity: 1, duration: 0.9, ease: "back.out"})
        }
      })
    }, teamPageRef)
    return () => ctx.revert()
  },[text])

  return (
    <article ref={ teamPageRef } className='contain md:h-screen divide-x-4 divide-black flex flex-nowrap flex-shrink-0  md:overflow-y-hidden'>
      <section>
        <div className='layout-grid2 md:divide-x-2 divide-black'>
          <div>
      
          </div>

          <div className='px-5 py-12 md:pl-[5.65vw] md:pr-[2.36vw] md:pt-[0.5vw]'>

            <h1 className={`uppercase tracking-[5vw] font-six-caps text-[80px] md:h-[21.05vw] md:text-[20.83vw] opacity-[0.4] leading-none md:overflow-hidden `} id='displayText'>
              <div className='textMove'>
                <span className='h-inherit w-full inline-block text-center'>
                  <span>The Team</span>
                </span>

                <span className='hidden md:flex items-center justify-center'>{ text }</span>
              </div>
            </h1>



            <div 
              className='grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-6 md:gap-x-20 md:-translate-y-36 pt-4 md:pt-0 overflow-hidden' 
              ref={ teamMemberContainer }
              onMouseLeave= { () => updateText("The Team") }
            >
              {
                TeamMembersData.map( memberDetails => {
                  return(
                    <div 
                      className='teamMemberCard'
                      onMouseEnter={ () => updateText(memberDetails.name) }
                      // onMouseLeave={ () => updateText('The Team') }
                      key={ memberDetails.titleHeld }
                    >
                      <TeamMemberCard
                        memberDetails= { memberDetails }
                        updateText={ updateText }
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export default TeamPage