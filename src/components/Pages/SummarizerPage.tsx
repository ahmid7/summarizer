import React from 'react'
import { gsap } from 'gsap'
import axios from "axios"
import { useQuery } from 'react-query'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import toast from "react-hot-toast"
import 'react-loading-skeleton/dist/skeleton.css'

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

  let textInputWords = textInput.length
  let textInputSentences = textInput.split(". ").length - 1
  // data.data.data[0].toString().split('.').length - 1,

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
    // check if the user is online or not, if no display a notification telling them no network connection
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
        wordLength: data.data.data[0].toString().replaceAll('.','').split(' ').length,
        sentenceLength: data.data.data[0].toString().split('.').length - 1,
        summarizedText: data.data.data[0]
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
              <h2 className='font-merriweather text-lg md:text-[1.25vw] leading-relaxed text-white'>Text Translator</h2>
              
              <div className='w-[2.78vw] border-[1px] rotate-90 bg-white hidden md:block '/>

              <p className='md:text-[1vw] hidden md:block'> Premium level tool at your disposal</p>
            </div>

            {/* github button  */}
            <button className='font-inter bg-white relative outline outline-2 outline-coffee-text px-2 py-3 md:p-4 text-coffee-text text-xs md:text-sm gitButtonAnimate'>
              {/* each span is for button hover animation */}
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

              
              <div className='px-[1.74vw] capitalize absolute bottom-2 text-xs md:text-[0.9vw] [&_span]:cursor-pointer flex justify-between items-center w-full'>
                <p className='flex text-black'>
                  <span>{`${ textInputWords } words`} &#183; {`${ textInputSentences } sentences`}</span>
                </p>

                <div className='flex gap-x-2 items-center '>
                  <span className='text-coffee-bean-brown'>try our sample text</span>
                  
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
                    !data && 
                    <div className='px-[1.74vw]'>
                      <Skeleton count={ 10.5 }/>
                    </div>
                  }
                </>
              </div>


              <div className='absolute bottom-2 left-0 w-full text-black'>
                <div className='flex-between px-4 text-xs md:text-[0.9vw]'>
                  <p>{`${ summarizedInfo.wordLength } words`} &#183; {`${ summarizedInfo.sentenceLength } sentences`}</p>
                  
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


// TODO: share button