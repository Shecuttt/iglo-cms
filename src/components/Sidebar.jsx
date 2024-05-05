import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faHouse, faUser, faBorderAll, faSignIn, faUsers, faUserGroup, faUserGear } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


function Sidebar() {
  return (

    <aside className="h-svh sticky flex flex-col justify-between text-sm left-0 top-0 w-64 bg-white p-4">
        <a href="#" className="h-16 flex items-center pb-4 border-b-2 border-b-red-800">
            <h1 className="text-red-800 font-bold mx-auto text-2xl">TECHTOLK</h1>
        </a>
        <ul className="space-y-3 text-red-800 font-semibold py-4 sidebar-menu">
            <li className="group active">
                <Link to={'/'} className="flex items-center hover:bg-red-100 rounded-lg p-4 sidebar-dropdown-toggle">
                    <FontAwesomeIcon icon={faHouse} />
                    <span className="mx-4">Dashboard</span>
                    <FontAwesomeIcon icon={faCaretDown} className='ml-auto'/>
                </Link>
                <ul className="space-y-4 px-4 hidden">
                    <li>
                        <Link to={'/'} className="p-2 hover:bg-red-100 rounded-md flex items-center">
                            <FontAwesomeIcon icon={faUser} />
                            <span href="" className="ml-4">Page 1</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/'} className="p-2 hover:bg-red-100 rounded-md flex items-center">
                            <FontAwesomeIcon icon={faUser} />
                            <span href="" className="ml-4">Page 2</span>
                        </Link>
                    </li>
                </ul>
            </li>
            <li className="group p-4">
                <h5>User Management</h5>
                <ul className="space-y-4 pt-4">
                    <li>
                        <Link to={'/usermanage'} className="p-2 hover:bg-red-100 rounded-md flex items-center">
                            <FontAwesomeIcon icon={faUserGear} />
                            <span href="" className="ml-4">Admin</span>
                        </Link>
                        
                    </li>
                    <li>
                        <a href="" className="p-2 hover:bg-red-100 rounded-md flex items-center">
                            <FontAwesomeIcon icon={faUserGroup} />
                            <span href="" className="ml-4">Lead</span>
                        </a>
                    </li>
                    <li>
                        <a href="" className="p-2 hover:bg-red-100 rounded-md flex items-center sidebar-dropdown-toggle">
                            <FontAwesomeIcon icon={faUsers} />
                            <span href="" className="mx-4">Customer</span>
                            <i className="fa-solid fa-caret-down ml-auto"></i>
                        </a>
                    </li>
                    <li>
                        <a href="" className="p-2 hover:bg-red-100 rounded-md flex items-center sidebar-dropdown-toggle">
                            <FontAwesomeIcon icon={faUsers} />
                            <span href="" className="mx-4">Sales Plan</span>
                            <i className="fa-solid fa-caret-down ml-auto"></i>
                        </a>
                    </li>
                </ul>
            </li>
            <li className="group p-4">
                <h5>Campaign</h5>
                <ul className="pt-4">
                    <li className="">
                        <a href="" className="p-2 hover:bg-red-100 rounded-md flex items-center">
                            <FontAwesomeIcon icon={faBorderAll} />
                            <span href="" className="ml-4">Campaign</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
        <div className="flex pt-4 border-t-2 border-t-red-800">
            <Link to={'/login'} className=" w-full text-center py-2 px-4 bg-red-800 text-white hover:bg-red-900 rounded">
            <FontAwesomeIcon icon={faSignIn} className="mr-2" />
            Sign In
            </Link>
        </div>
    </aside>

  )
}

export default Sidebar