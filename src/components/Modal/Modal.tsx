// @ts-nocheck
import React from 'react'
import { createPortal } from 'react-dom'

function Modal({ children }) {
  const elRef = React.useRef(null)
  if(!elRef.current) {
    elRef.current = document.createElement('div')
  }

  React.useEffect(() => {
    const modalRoot = document.getElementById('modal')
    modalRoot.appendChild(elRef.current)

    return () => modalRoot.removeChild(elRef.current)
  },[])

  return createPortal(<div className='modal'>{ children }</div>, elRef.current)
}

export default Modal