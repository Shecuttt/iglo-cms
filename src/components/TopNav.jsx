import { faEnvelope, faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import CRM from '../assets/logo-ecrm.png'

const TopNav = () => {
  return (
    <nav className="bg-red-800 text-gray-50 flex px-4 py-2 top-0 right-0">
        <div className="w-full flex items-center justify-between mx-auto px-8 py-4">
            <a href="" className="flex items-start space-x-4">
            <img src={CRM} alt="CRM" className="h-16 -my-8" />
            </a>
            <div className="">
                <ul className="flex items-center ml-auto space-x-8">
                    <li className="py-0.5 rounded-full hover:bg-white hover:text-red-800">
                        <a href="" className="p-2">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                    </li>
                    <li className="py-0.5 rounded-full hover:bg-white hover:text-red-800">
                        <a href="" className="p-2">
                            <FontAwesomeIcon icon={faBell} />
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center justify-end">
                            <img src="https://images.unsplash.com/photo-1570158268183-d296b2892211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBvcnRyYWl0fGVufDB8fDB8fHww" alt="Profile Image" className="w-8 h-8 rounded-full mr-2 overflow-hidden" />
                            <div className="flex flex-col">
                                <span className="text-sm">Kirana</span>
                                <span className="text-xs font-light">Super Admin</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default TopNav