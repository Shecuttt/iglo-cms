import React from 'react'
import TopNav from '../components/TopNav'
import Sidebar from '../components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import BackButton from '../components/BackButton'

const UserLog = () => {
  return (

    // root
    <div className='flex'>
      {/* <!-- Sidebar --> */}
      <Sidebar />
      {/* // <!-- Main start --> */}
      <main className="w-full bg-red-50">

      {/* <!-- Navbar --> */}
      
      <TopNav />

      {/* <!-- Breadcrumb --> */}
      <BackButton />

      {/* <!-- Content --> */}
      <div className="m-8">
          
          {/* <!-- Title content --> */}
          <div className="ml-6 mb-4">
              <h1 className="text-red-800 font-bold text-3xl">Detail Activity User</h1>
          </div>

          {/* <!-- Main content --> */}
          <div className="w-full bg-white rounded-xl p-6 px-40">
              <div className="flex items-center pb-6">
                   <div className="flex items-center">
                      <a href="#" className="text-sm bg-gray-400 hover:bg-gray-600 text-white rounded-md px-4 py-2">
                        <FontAwesomeIcon icon={faFilter} className='mr-1' />
                          <span>Sort by</span>
                      </a>
                  </div>
                  <div className="flex items-center ml-4">
                      <label for="table-search" className="sr-only">Search</label>
                      <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                          </div>
                          <input type="text" id="table-search-users" className="py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-red-700 outline-none focus:shadow-lg" placeholder="Search for users" />
                      </div>
                  </div>
              </div>
              <div className='rounded-lg overflow-hidden border shadow-md'>
                <table className="w-full text-sm mx-auto ">

                    {/* <!-- Table header --> */}
                    <thead className="text-white bg-red-800 text-left">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Activity
                            </th>
                        </tr>
                    </thead>

                    {/* <!-- Table content --> */}
                    <tbody>
                        <tr className="odd:bg-white even:bg-red-50 border-b">
                            <td className="px-6 py-4">
                                1
                            </td>
                            <td className="px-6 py-4">
                                01-02-2024 | 15:00:00
                            </td>
                            <td className="px-6 py-4">
                                Hayo habis ngapain wkwk
                            </td>
                        </tr>
                        <tr className="odd:bg-white even:bg-red-50 border-b">
                            <td className="px-6 py-4">
                                2
                            </td>
                            <td className="px-6 py-4">
                                01-02-2024 | 15:00:00
                            </td>
                            <td className="px-6 py-4">
                                Hayo habis ngapain wkwk
                            </td>
                        </tr>
                        <tr className="odd:bg-white even:bg-red-50 border-b">
                            <td className="px-6 py-4">
                                3
                            </td>
                            <td className="px-6 py-4">
                                01-02-2024 | 15:00:00
                            </td>
                            <td className="px-6 py-4">
                                Hayo habis ngapain wkwk
                            </td>
                        </tr>
                        <tr className="odd:bg-white even:bg-red-50 border-b">
                            <td className="px-6 py-4">
                                4
                            </td>
                            <td className="px-6 py-4">
                                01-02-2024 | 15:00:00
                            </td>
                            <td className="px-6 py-4">
                                Hayo habis ngapain wkwk
                            </td>
                        </tr>
                    </tbody>
                </table>
              </div>
          </div>
      </div>
      </main>
    </div>

  )
}

export default UserLog