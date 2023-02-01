import React from 'react'
import { ImCancelCircle,ImWhatsapp } from "react-icons/im"
import { 
    GrFacebookOption, 
    GrTwitter, 
    GrLinkedin, 
    GrReddit, 
    GrMail,
} from "react-icons/gr"
import { AiOutlineCopy } from 'react-icons/ai'
import toast from 'react-hot-toast'

function ShareModal({ updateModal }: { updateModal: () => void }) { 

  function handleCopyText() {
    navigator.clipboard.writeText('https://summarizer-ajkfjmsxw-ahmid7.vercel.app/')
    toast.success('Copied to clipboard')
  }

  let postUrl = encodeURI(window.location.href);
  let postMessage = encodeURIComponent("Hi everyone, I just found this awesome website that summarizes any text for you. ")
  let postImg = 'https://i.imgur.com/X2y72kx.jpeg'
  const title = encodeURIComponent(document.querySelector('title')?.textContent || 'Summarizer')

    const shareMedia = [
        {
            name: 'facebook',
            icon: <GrFacebookOption />,
            color: 'blue',
            href:  `https://www.facebook.com/sharer.php?u=${ postUrl }`
        },
        {
            name: 'twitter',
            icon: <GrTwitter />,
            color: 'black',
            href:  `https://twitter.com/share?url=${ postUrl }&text=${ postMessage }`
        },
        {
            name: 'linkedin',
            icon: <GrLinkedin />,
            color: 'blue',
            href:  `https://www.linkedin.com/shareArticle?url=${ postUrl }&title=${ postMessage }`
        },
        {
            name: 'reddit',
            icon: <GrReddit />,
            color: 'red',
            href:  `https://pinterest.com/pin/create/bookmarklet/?media=${ postImg }&url=${postUrl}&description=${ postMessage }
            `
        },
        {
            name: 'whatsapp',
            icon: <ImWhatsapp />,
            color: 'green',
            href:  `https://api.whatsapp.com/send?text=${ postMessage } ${ postUrl }        `
        },
    ]

  return (
    <div className='modal-wrapper divide-y-2 divide-gray-200'>
        <div className='flex justify-between items-center capitalize  font-merriweather py-2'>
            <h4 className='text-base md:text-[1.25vw]'>share modal</h4>

            <div 
                onClick={ updateModal }
                className='text-lg md:text-[1.67vw] cursor-pointer hover:text-coffee-bean-brown focus:text-coffee-bean-brown'
            >
                <ImCancelCircle />
            </div>
        </div>

        <div className='pt-4 text-xs md:text-[1vw]'>
            <p>share this link via: </p>

            <div className='flex justify-between items-center py-3 iconContainer'>
                {
                    shareMedia.map((media, index) => {
                        return (
                            <div className='' key={ media.name }>
                                <a 
                                    href={ media.href }
                                    target='_blank'
                                    style={{ color: `${ media.color }` }} 
                                    className='border-2 mediaIcon cursor-pointer border-gray-300 rounded-full h-10 w-10 md:h-[3.9vw] md:w-[3.9vw] text-lg md:text-[1.39vw] flex items-center justify-center hover:border-[#bd6049] focus:border-[#bd6049]'
                                >
                                    { media.icon }
                                </a>

                                <p className='text-center py-2 cursor-pointer'>{ media.name }</p>
                            </div>
                        )
                    })
                }
            </div>

            <p className='capitalize text-xs py-2 md:text-[0.9vw] md:py-[0.83vw]'>or copy link</p>

            <div className=' relative z-20 overflow-hidden rounded-lg border-2 border-gray-400 '>
                <input 
                    type='text' 
                    readOnly 
                    className='w-full py-2 px-3  outline-none rounded-sm opacity-70' value={ 'https://summarizer-ajkfjmsxw-ahmid7.vercel.app/' }
                />
                
                <div 
                    className='absolute top-0 right-0 text-xl px-1 md:px-0  md:text-[2.08vw] overflow-hidden cursor-pointer bg-white z-50 border-2 h-full flex items-center hover:text-coffee-bean-brown focus:text-coffee-bean-brown'
                    onClick={ handleCopyText }
                >
                    <AiOutlineCopy />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShareModal