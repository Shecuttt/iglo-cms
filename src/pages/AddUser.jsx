import React, { useState } from 'react'
import TopNav from '../components/TopNav'
import { Link } from 'react-router-dom'
import ProfileImage from '../assets/person-1.jpg'
import Swal from 'sweetalert2'
import Select from 'react-select'

import {optionDepart, optionPosition, optionRole, optionStatus, workGroup} from '../data/MyData'
import PasswordInput from '../components/PasswordInput'


const AddUser = () => {
    const successAdd = () => {
        Swal.fire({
            title: "Berhasil!",
            text: "Data berhasil ditambahkan",
            icon: "success"
        })
    }
    const failedAdd = () => {
        Swal.fire({
            title: "Gagal!",
            text: "Data gagal ditambahkan :(",
            icon: "error"
        })
    }

    const [password, setPassword] = useState('')

  return (
    <div className='bg-red-50'>

      {/* Navbar */}
      <TopNav />

      {/* <!-- Start: Main --> */}

    <main>
        {/* <!-- Content start --> */}
        <div className="p-8">
            <div className="grid grid-cols-3 gap-4">
                {/* <!-- Profile --> */}
                <div className="bg-white rounded-lg shadow-md p-4 space-y-4 h-fit">
                    <h2 className="text-red-700 text-center pt-4 font-semibold text-xl">My Profile</h2>
                    <div className="flex justify-center py-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden">
                            <img src={ProfileImage} alt="User Image" />
                        </div>
                    </div>
                    <div className="text-center pb-4">
                        <p className="text-lg font-semibold">Kirana Spakbor</p>
                        <p className="text-sm text-red-700">Super Admin</p>
                    </div>
                    <div className='flex flex-col text-center space-y-3'>
                        <Link to={'/'} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded w-full">Edit Profil</Link>
                        <Link to={'/usermanage'} className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded w-full">Kembali</Link>
                    </div>
                </div>
                {/* <!-- form --> */}
                <div className="col-span-2 bg-white rounded-lg shadow-md p-4">
                    <div className="grid gap-6 text-sm">
                        <div>
                            <form action='' method=''>
                                <div className='flex items-center space-x-3'>
                                    <div className="mt-4 text-sm w-full">
                                        <label htmlFor="name" className="font-semibold">First Name</label>
                                        <input type="text" name="name" id="name" className="rounded-md bg-gray-100 focus:bg-white w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border" placeholder="Kirana" />
                                    </div>
                                    <div className="mt-4 text-sm w-full">
                                        <label htmlFor="name" className="font-semibold">Last Name</label>
                                        <input type="text" name="name" id="name" className="rounded-md bg-gray-100 focus:bg-white w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border" placeholder="Spakbor" />
                                    </div>
                                </div>
                                <div className="mt-4 text-sm">
                                    <label htmlFor="id" className="font-semibold">Employee ID</label>
                                    <input type="text" name="id" id="id" className="rounded-md bg-gray-100 focus:bg-white w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border" placeholder="Kirana001" />
                                </div>
                                <div className="mt-4 text-sm">
                                    <label htmlFor="email" className="font-semibold">Email</label>
                                    <input type="text" name="email" id="email" className="rounded-md bg-gray-100 focus:bg-white w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border" placeholder="kirana123@gmail.com" />
                                </div>
                                <div className="mt-4 text-sm">
                                    <label htmlFor="phone" className="font-semibold">Phone Number</label>
                                    <input type="text" name="phone" id="phone" className="rounded-md bg-gray-100 focus:bg-white w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border" placeholder="01234567890" />
                                </div>
                                <div className="mt-4 text-sm">
                                    <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                                    <div className="relative">
                                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="mt-4 text-sm">
                                    <label htmlFor="position" className="block text-sm font-semibold">Position</label>
                                    <Select id='position' name='position' options={optionPosition} className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0" />
                                </div>
                                <div className="mt-4 text-sm">
                                    <label htmlFor="depart" className="block text-sm font-semibold">Department</label>
                                    <Select id='depart' name='depart' options={optionDepart} className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0" />
                                </div>
                                <div className="mt-4 text-sm">
                                    <label htmlFor="group" className="block text-sm font-semibold">Work Group</label>
                                    <Select id='workgroup' name='workgroup' options={workGroup} className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0" />
                                </div>
                                <div className="mt-4 text-sm">
                                    <label htmlFor="role" className="block text-sm font-semibold">Role</label>
                                    <Select id='role' name='role' options={optionRole} className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0" />
                                </div>
                                <div className="my-4 text-sm">
                                    <label htmlFor="status" className="block text-sm font-semibold">Status</label>
                                    <Select id='status' name='status' options={optionStatus} className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0" />
                                </div>
                                <div className='my-8 flex justify-end items-center'>
                                    <Link to={'/usermanage'}>
                                        <button type='submit' onClick={() => successAdd()} className='bg-green-300 text-green-800 hover:bg-green-500 hover:text-green-100 rounded-md px-8 py-2 mr-2'>Submit</button>
                                    </Link>
                                        <button type='reset' className='bg-gray-300 text-gray-800 hover:bg-gray-500 hover:text-gray-100 rounded-md px-8 py-2 ml-2'>Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Content end --> */}
    </main>

    {/* <!-- End: Main --> */}
    </div>
  )
}

export default AddUser