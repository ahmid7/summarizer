import React from 'react'
import { gsap } from "gsap"

import {  
  // NavBar,
  TeamMemberCard,
  // TeamReachOutPage
} from '../'


const TeamMembersData = [
  {
    name: 'Funbi',
    titleHeld: 'co-creator & data scientist',
    imgSrc: '/images/funbi.jpg',
    linkedInLink: '#',
    githubLink: '#'
  },

  {
    name: 'bola',
    titleHeld: 'co-creator & Designer',
    imgSrc: '/images/bola.jpg',
    linkedInLink: '#',
    githubLink: '#'
  },

  {
    name: 'odunayo',
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


  // animationg team memeber card
  React.useLayoutEffect(() => {
    // const teamMemberCard = gsap.utils.toArray('.teamMemberCard')

    
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia()

      mm.add("(max-width: 768px)", () => {
        // ! you should check the gsap forwaard ref to animate this

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
      })

    }, teamPageRef)


    return () => ctx.revert()
    
  },[])

  return (
    <article ref={ teamPageRef } className='contain md:h-screen divide-x-4 divide-black flex flex-nowrap flex-shrink-0  md:overflow-y-hidden' id='contain'>
      <section className='shit'>
        <div className='layout-grid2 md:divide-x-2 divide-black'>
          <div>
      
          </div>

          <div className='px-5 py-12 md:pl-[5.65vw] md:pr-[2.36vw] md:pt-[0.5vw]'>

            <h1 className='uppercase text-center md:text-justify tracking-[5vw]  font-six-caps text-[80px] md:text-[20.83vw] opacity-[0.12] leading-none'>
              the team 
            </h1>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-6 md:gap-x-20 md:-translate-y-36 pt-4 md:pt-0 overflow-hidden' ref={ teamMemberContainer }>
              {
                TeamMembersData.map( memberDetails => {
                  return(
                    <div className='teamMemberCard'>
                      <TeamMemberCard
                        memberDetails= { memberDetails }
                        key={ memberDetails.titleHeld }
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </section>

      {/* <section className='teamReach'>
        <TeamReachOutPage/>
      </section> */}
    </article>
  )
}

export default TeamPage