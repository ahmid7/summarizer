import React from 'react'
import { gsap } from 'gsap'
import axios from "axios"
import { useQuery } from 'react-query'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { NavBar } from '..'
import { 
  GithubIcon, 
  PasteIcon,
  RightIndicator 
} from '../../assets/svgIcons'

function SummarizerPage() {
  // handle server side state request
  const { 
    isLoading, 
    isError, 
    data, 
    error,
    refetch,
    isFetching,
  } = useQuery(
    'summarize', 
    summarizeData,
    {
      enabled: false,
    }
  )

  const [ summarizedInfo, setSummarizedInfo ] = React.useState({
    wordLength: 0,
    sentenceLength: 0,
    summarizedText: ''
  })

  // TODO: still pending but i think i should remove the localstorage part
  // the user text input state
  const [textInput, setTextInput] = React.useState(JSON.parse(localStorage.getItem('text')) || '')

  // handle user paste 
  function handlePaste(e:React.ClipboardEvent<HTMLTextAreaElement>) {
    const textValue = textInput
    setTextInput('')
    setTextInput(textValue + e.clipboardData.getData('text'))
  }

  // handle user inputting text
  function onChange(e:React.ChangeEvent<HTMLTextAreaElement>) {
    setTextInput(e.target.value)
  } 

  // api request 
  function summarizeData() {
    return  axios.post('https://hf.space/embed/Funbi/Summarize/+/api/predict/', {
      "data": [textInput]
    })
  }

  // handle user click on the summarize button
  function handleSummarize() {
    localStorage.setItem('text', JSON.stringify(textInput))
    refetch()
  }

  // handle reset generated data on user click
  function clearResult() {
    setSummarizedInfo({
      wordLength: 0,
      sentenceLength: 0,
      summarizedText: ''
    })
  }


  // pointer arrow container ref
  const pointersArrowsContainer = React.useRef(null)

  // summerizerPage component ref
  const summarizerContainer = React.useRef(null)

  const pointerArrow = gsap.utils.selector(pointersArrowsContainer)

  // handle gsap animation
  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // arrow animation
      gsap.fromTo(pointerArrow(".arrows"), 
        {
          xPercent: 0,
          autoAlpha: 0
        },
        {
          autoAlpha: 1,
          xPercent: 20,
          stagger: 0.05,
          duration: 1.5,
          yoyo: true,
          // ease: 'bounce',
          repeat: -1,
          scrollTrigger: {
            trigger: summarizerContainer.current,
          }
        }
      )

    }, summarizerContainer)
    
    return () => ctx.revert()
  },[])

  // handle data change when the server side state manager return the data.
  React.useEffect(() => {
    if (data) {
      setSummarizedInfo({
        wordLength: data.data.data.toString().length,
        sentenceLength: data.data.data.toString().split('.').length - 1,
        summarizedText: data.data.data
      })
    }
  },[data])

  return (
    <section className='min-h-screen md:h-screen overflow-y-hidden mt-5 md:mt-0' ref={ summarizerContainer }>
      <div className='layout-grid2 md:divide-x-4 md:divide-coffee-text'>
        <div className='w-inherit'>
          <NavBar />
        </div>

        <div className=' md:pt-4 text-white grid-template2'>
          <header className='md:mx-[5.523vw] bg-coffee-text px-4 md:px-[1.74vw] flex-between py-5'>
            <div className='flex-between'>
              <h2 className='font-merriweather text-lg md:text-[1.25vw] leading-relaxed text-white'>Text Translator</h2>
              
              <div className='w-[2.78vw] border-[1px] rotate-90 bg-white hidden md:block '/>

              <p className='md:text-[1vw] hidden md:block'> Premium level tool at your disposal</p>
            </div>

            <button className='font-inter bg-white relative outline outline-2 outline-coffee-text px-2 py-3 md:p-4 text-coffee-text text-xs md:text-sm gitButtonAnimate'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <a className='flex items-center gap-x-2' href="#">
                <GithubIcon/>
                <p className=''>View on Github</p>
              </a>
            </button>
          </header>

          <div className='mx-4 my-8 md:mx-[5.523vw] md:my-2 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-y-5 md:gap-x-10'>
            <div className='outline outline-2 outline-coffee-text px-[1.74vw] pt-7 pb-4 relative'>

              <div className='min-h-[350px]'>
                <textarea className='w-full text-black outline-none border-none overflow-scroll resize-none min-h-[330px] leading-relaxed' 
                  value={textInput} 
                  onChange={ onChange } 
                  onPaste={ handlePaste }
                  placeholder='Paste / write about your topic  and then click the Summarize button .You could also use the sample text button provided below.'
                >
                  
                </textarea>
              </div>

              <div className={`absolute px-5 md:px-[20px] cursor-pointer py-4 md:py-5 text-xs md:text-[0.9vw] bg-[#CFCFCF] text-black left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ${textInput.length < 1 ? 'block' : 'hidden'}`}>
                <div className='center pb-2'>
                  <PasteIcon/>
                </div>

                <p>Paste Text</p>
              </div>

              <p className='capitalize absolute bottom-5 right-2 text-xs md:text-[0.9vw] [&_span]:cursor-pointer'>
                <span className='text-coffee-bean-brown mr-4'>try our sample text</span> 
                <span onClick={ handleSummarize } className={`px-4 py-3 ${textInput.length < 1 ? 'bg-[#CFCFCF] text-[#999999]' : 'bg-coffee-bean-brown text-white'}`}>summarize</span>
              </p>
            </div>

            <div className='outline outline-2 outline-coffee-text relative'>

              <div className='absolute bottom-2 w-full text-black '>

                <div className='min-h-[350px] px-[1.74vw] pt-7 pb-4  leading-relaxed'>
                  <SkeletonTheme baseColor='#000000' highlightColor='#fafa32'>
                    { summarizedInfo.summarizedText || <Skeleton count={ 20 } /> }
                  </SkeletonTheme>
                  {/* {
                    isFetching === true && 
                    <Skeleton count={ 6 }/>
                  }

                  {
                    data?.data.data && !isFetching &&
                    <div className='text-black'>
                      <p className='text-coffee-bean-brown'>{ data?.data.data }</p>
                    </div>
                  } */}
                </div>

                <div className='flex-between px-4 text-xs md:text-[0.9vw]'>
                  <p>{`${ summarizedInfo.sentenceLength } sentences`} &#183; {`${ summarizedInfo.wordLength } words`}</p>
                  
                  <p className='flex items-center gap-x-2'>
                    <span onClick={ clearResult }  className=' text-[#ED1818] cursor-pointer'>Clear Results</span>
                    <span className='bg-coffee-bean-brown text-white py-3 px-4 cursor-pointer'>share</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-black py-10  md:py-20 flex overflow-hidden pl-0 md:pl-[5.523vw]'>
            <div className='hidden md:flex justify-between items-center w-full' ref={ pointersArrowsContainer }>
              {
                [...Array(10)].map((_,index) => ( 
                    <div 
                      className='arrows'
                      key={ index }
                    >
                      <RightIndicator/> 
                    </div>
                  )
                )
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SummarizerPage


// DONE: split the array returned based on the dot.
// TODO: onclick share let them be able to share 
// TODO: fix the nav link for home page and make the fixed nav links 
// TODO: onClick if data fetching is taking for more than six seconds display a pop up that let the user know that the netwrok is bad
// TODO: fix the share button, though i dont know which platform i want them to be able to share to
// TODO: collect the resources from bola today


// TODO: create the nav bar at the app page and then use scrolltrigger, start event should be when the summerizer is a