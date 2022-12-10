import React from 'react'
import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/all'

import {  
  NavBar,
  TeamMemberCard,
  TeamReachOutPage
} from '../'


gsap.registerPlugin(ScrollTrigger)


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

  // React.useLayoutEffect(() => {
  // //  const ctx = gsap.context(() => {
  // //     gsap.to(".shit", {
  // //       background:'black',
  // //       scrollTrigger: {
  // //         trigger: ".contain",
  // //         markers: true,
  // //         horizontal: true,
  // //         start: "bottom right",
  // //         end: "top left",
  // //         // pin: true
          
  // //       }

  // //     })
  // //  }, teamPageRef)

  // //  return () => ctx.revert()

  //   gsap.to('.shit', {
  //     background: "white",
  //     ease: 'none',
  //     scrollTrigger: {
  //       trigger: '#contain',
  //       // markers: true,
  //       horizontal: true,
  //       start: 'top left',
  //       end: "bottom right",
  //       pin: true,
  //       markers: {
  //         startColor: "green",
  //         endColor: "yellow",
  //       }
  //     } 
  //   })
  // },[])

  return (
    <article ref={ teamPageRef } className='contain md:h-screen divide-x-4 divide-black flex flex-nowrap flex-shrink-0  md:overflow-y-hidden' id='contain'>
      <section className='shit'>
        <div className='layout-grid2 md:divide-x-2 divide-black'>
          <NavBar
            page='team'
            logo = { true }
          />

          <div className='px-5 py-12 md:pl-[5.65vw] md:pr-[2.36vw] md:pt-[0.5vw]'>

            <h1 className='uppercase text-center md:text-justify tracking-[5vw]  font-six-caps text-[80px] md:text-[20.83vw] opacity-[0.12] leading-none'>
              the team 
            </h1>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-6 md:gap-x-20 md:-translate-y-36 pt-4 md:pt-0'>
              {
                TeamMembersData.map( memberDetails => {
                  return(
                    <TeamMemberCard
                      memberDetails= { memberDetails }
                      key={ memberDetails.titleHeld }
                    />
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