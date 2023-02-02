import React from 'react'
import { gsap,Observer } from 'gsap/all'
import axios from "axios"
import { useQuery } from 'react-query'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import toast from "react-hot-toast"
import { MdContentCopy } from "react-icons/md"

import 'react-loading-skeleton/dist/skeleton.css'

import { NavBar } from '..'
import { 
  GithubIcon, 
  PasteIcon,
  RightIndicator 
} from '../../assets/svgIcons'
import { Context } from '../../App'

gsap.registerPlugin( Observer )

function SummarizerPage({ updateModal } : { updateModal: () => void }) {
  
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

  // summarized information include the summarized text, numbers of words and sentences length
  const [ summarizedInfo, setSummarizedInfo ] = React.useState({
    wordLength: 0,
    sentenceLength: 0,
    summarizedText: ''
  })

  // the user text input state
  /* 
                // @ts-ignore */
  const [textInput, setTextInput] = React.useState('')

  // handle paste when user clicks on the paste button
  function handlePasteButton(e:any) {
    navigator.clipboard.readText()
      .then( ( clipText ) =>  {  
        setTextInput( clipText )
      })
  }

  let textInputWords = textInput.length < 1 ? 0 : textInput.toString().match(/(\w+)/g)?.length! - 1
  let textInputSentences = textInput.split(/[\.!\?]+\s/g).filter(Boolean).length;

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

  // error message to display when the user is offline
  const notify = () => toast.error('no network connection')

  // handle user click on the summarize button
  function handleSummarize() {
    // check if the user is online or not, if not, display a notification telling them no network connection
    if(window.navigator.onLine) {
    
    }else {
      if(textInput !== '') {
        notify()
      } 
      return null
    }
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

  // message to display if the user hasn't summarized context and they click copy text
  const notifyCopyError = () => toast.error('no summarized text to copy')
  
  // message to display when the copy text is successful
  const notifyCopySuccess = () => toast.success('text copied successfully')

  // handle copy text based on if they have summarized content a data or not
  function handleCopyText() {
    if(summarizedInfo.summarizedText !== '') {
      navigator.clipboard.writeText(summarizedInfo.summarizedText)
      notifyCopySuccess()
    }else {
      notifyCopyError()
    }
  }

  // sample text for summarizer
  let sampleText = "Once upon a time, there lived a small, but brave, fox named Fennel. Fennel had dreamed of exploring the world outside her small forest home for as long as she could remember, but she was scared of what she might find. One day, she worked up the courage to take the plunge and set off on a journey of self-discovery. \n\n Fennel traveled far and wide, taking in the sights and sounds of the world around her. She encountered breathtaking nature, bustling cities, and friendly creatures along the way. Everywhere she went, she was reminded of the infinite possibilities that lay ahead of her. \n\n As she journeyed, Fennel began to realize the importance of her personal growth. She found that within every experience, she was learning something new. She was gaining knowledge, insight, and courage. She was becoming stronger and wiser, and she was determined to make the most of her journey.\n\nSoon, Fennel had visited a variety of places and made many friends in the process. She had also gained valuable lessons and a newfound appreciation for the world and her place in it. Most of all, she was proud of how far she had come and the courage she had to take this journey in the first place.\n\nNow, Fennel knows that no matter what challenges she may face, she will always be able to rely on the strength she has gained from her journey. She is no longer scared of the unknown, and she is excited to continue exploring and growing.\n\nThe moral of this story is that, no matter where you are in life, there is always something new to learn and explore. Sometimes, the most rewarding experiences come from taking risks and venturing out of our comfort zones. The possibilities are endless and the potential is yours to discover."

  //set input text to sample Text
  function handleSampleText() {
    setTextInput(sampleText)
  }
  // pointer arrow container ref
  const pointersArrowsContainer = React.useRef(null)

  // summerizerPage component ref
  const summarizerContainer = React.useRef(null)

  const pointerArrow = gsap.utils.selector(pointersArrowsContainer)

  // handle gsap animation
  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let buttonTimeline1 = gsap.timeline()
      let buttonTimeline2 = gsap.timeline()

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
        wordLength: data.data.data[0].toString().match(/(\w+)/g).length,
        sentenceLength: data.data.data[0].toString().split(/[\.!\?]+\s/g).filter(Boolean).length,
        summarizedText: data.data.data[0]
      })
    } else {
      setSummarizedInfo({
        wordLength: 0,
        sentenceLength: 0,
        summarizedText: ''
      })
    }
  },[data])

  return (
    <section className='min-h-screen md:h-screen w-screen overflow-y-hidden md:overflow-x-hidden mt-5 md:mt-0 summarizerWrapper' ref={ summarizerContainer }>
      <div className='layout-grid2 md:divide-x-4 md:divide-coffee-text'>
        {/* navbar  */}
        <div className='w-inherit'>
          <NavBar />
        </div>
    
        <div className='md:h-screen md:pt-4 text-white grid-template2'>
          {/* header */}
          <header className='md:mx-[5.523vw] bg-coffee-text px-4 md:px-[1.74vw] flex-between py-5'>
            <div className='flex-between'>
              <h2 className='font-merriweather text-lg md:text-[1.25vw] leading-relaxed text-white'>Text Summarizer</h2>
              
              <div className='w-[2.78vw] border-[1px] rotate-90 bg-white hidden md:block '/>

              <p className='md:text-[1vw] hidden md:block'> Premium level tool at your disposal</p>
            </div>

            {/* github button  */}
            <button className='font-inter bg-white relative outline outline-2 outline-coffee-text px-2 py-3 md:p-4 text-coffee-text text-xs md:text-sm gitButtonAnimate'>
              {/* each span is for button hover animation */}
              <span className='button-line-top'></span>
              <span className='button-line-right'></span>
              <span className='button-line-button'></span>
              <span className='button-line-left'></span>
              <a className='flex items-center gap-x-2' href="https://github.com/Phunbie" target="_blank">
                <GithubIcon/>
                <p className=''>View on Github</p>
              </a>
            </button>
          </header>

          <div className=' mx-4 my-8 md:mx-[5.523vw] md:my-2 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-y-5 md:gap-x-10'>

            {/* text area container */}
            <div className='outline outline-2 outline-coffee-text py-4 md:pt-7 md:pb-4 relative min-h-[400px] md:h-full'>

              <div className='calc-height'>
                {/* text area */}
                <textarea className='px-[1.74vw] w-full h-full text-black border-2 outline-none border-none overflow-y-scroll resize-none leading-relaxed text-summarized' 
                  value={textInput} 
                  onChange={ onChange } 
                  placeholder='Paste / write about your topic  and then click the Summarize button .You could also use the sample text button provided below.'
                >
                  
                </textarea>
              </div>

              {/* paste button container */}
              <div className={`absolute px-5 md:px-[20px] cursor-pointer py-4 md:py-5 text-xs md:text-[0.9vw] bg-[#CFCFCF] text-black left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ${textInput.length < 1 ? 'block' : 'hidden'}`}>
                <div className='center pb-2' onClick={ handlePasteButton }>
                  <PasteIcon/>
                </div>

                <p>Paste Text</p>
              </div>

              
              <div className='px-[1.74vw] absolute bottom-2 text-xs md:text-[0.9vw] flex justify-between items-center w-full'>
                <p className='flex  text-black'>
                  <span className='flex gap-x-[2px] '>{`${ textInputWords } words`} <span className='text-[2.5vw]'>&#183;</span> {`${ textInputSentences } sentences`}</span>
                </p>

                <div className='flex gap-x-2 items-center capitalize [&_span]:cursor-pointer'>
                  <span 
                    className='text-coffee-bean-brown'
                    onClick={ handleSampleText }
                  >
                    try our sample text
                  </span>
                  
                  <button 
                    onClick={ handleSummarize } 
                    className={`px-4 py-3 ${textInput.length < 1 ? 'bg-[#CFCFCF] text-[#999999]' : 'bg-coffee-bean-brown text-white'}`}
                  >
                    summarize
                  </button>
                </div>
              </div>
            </div>

            {/* summarized text container */}
            <div className='outline outline-2 outline-coffee-text py-4 md:pt-7 md:pb-4 relative min-h-[400px] md:h-full summarizedText'> 

              <div className='calc-height'>
                <>
                  {
                    !isFetching && data &&
                    <textarea 
                      value= { summarizedInfo.summarizedText }
                      className='px-[1.74vw] w-full h-full text-black outline-none border-none overflow-y-scroll resize-none leading-relaxed'
                      disabled
                    >
                      { summarizedInfo.summarizedText }
                    </textarea>
                  }


                  {
                    !data && !isFetching &&
                    <div className='px-[1.74vw]'>
                      <Skeleton count={ 10.5 }/>
                    </div>
                  }

                  {
                    isFetching &&
                    <div className='px-[1.74vw]'>
                      <SkeletonTheme baseColor='#CFCFCF' highlightColor='#9B4C38'>
                        <Skeleton count={ 10.5 }/>
                      </SkeletonTheme>
                    </div>
                  }
                </>
              </div>


              <div className='absolute bottom-2 left-0 w-full text-black'>
                <div className='flex-between px-4 text-xs md:text-[0.9vw]'>
                  <p className='flex gap-x-[2px]'>{`${ summarizedInfo.wordLength } words`} <span className='text-[2.5vw]'>&#183;</span> {`${ summarizedInfo.sentenceLength } sentences`}</p>
                  
                  <p className='flex items-center gap-x-4 md:gap-x-3'>
                    {/* <span 
                      onClick={ handleCopyText }
                      className='text-xl md:text-[1.7vw] cursor-pointer hover:text-coffee-bean-brown focus:text-coffee-bean-brown transition-all'>
                      <MdContentCopy />
                    </span> */}

                    <span 
                      onClick={ clearResult }  
                      className={` cursor-pointer text-coffee-bean-brown hover:text-[#BD6049] focus:text-[#BD6049] transition-all ${ summarizedInfo.summarizedText ? '' : '' }`}
                    >
                      Clear Results
                    </span>

                    <span
                      className='text-white py-3 px-5 cursor-pointer bg-coffee-bean-brown hover:bg-[#BD6049] focus:bg-[#BD6049] hover:text-white focus:text-white transition-all'
                      onClick={ handleCopyText }
                    >
                      Copy
                    </span>

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