import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function BackButton() {
  const history = useNavigate()

  const handleBackClick = () => {
    history(-1)
  }

  // error: doesn't go back to prev. page

  return (
    <div className='m-8'>
      <Link onClick={handleBackClick} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-red-700">
        <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3 me-2.5" />
        Kembali 
      </Link>   
    </div>
  )
}

export default BackButton