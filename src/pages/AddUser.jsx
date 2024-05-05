import React from 'react'
import TopNav from '../components/TopNav'
import { Link } from 'react-router-dom'
import ProfileImage from '../assets/person-1.jpg'
import Swal from 'sweetalert2'
import Select from 'react-select'

import MyData from '../data/MyData'

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
                        <p className="text-lg font-semibold">Kirana</p>
                        <p className="text-sm text-red-700">Super Admin</p>
                    </div>
                    <div className='flex flex-col text-center space-y-3'>
                        <Link to={'/'} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded w-full">Edit Profil</Link>
                        <Link to={'/usermanage'} className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded w-full">Kembali</Link>
                    </div>
                </div>
                {/* <!-- Form --> */}
                <div className="col-span-2 bg-white rounded-lg shadow-md p-4">
                    <div className="grid gap-6 text-sm">
                        <div>
                            <form action="">
                                <div>
                                    <label for="name" className="font-semibold">Name</label>
                                    <input type="text" name="name" id="name" className="rounded-md bg-gray-100 focus:bg-white w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border" placeholder="Kirana" />
                                </div>
                                <div className="mt-4 text-sm">
                                    <label for="id" className="font-semibold">Employee ID</label>
                                    <input type="text" name="id" id="id" className="rounded-md bg-gray-100 focus:bg-white w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border" placeholder="Kirana001" />
                                </div>
                                <div className="mt-4 text-sm">
                                    <label for="email" className="font-semibold">Email</label>
                                    <input type="text" name="email" id="email" className="rounded-md bg-gray-100 focus:bg-white w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border" placeholder="kirana123@gmail.com" />
                                </div>
                                <div className="mt-4 text-sm">
                                    <label for="phone" className="font-semibold">Phone Number</label>
                                    <input type="text" name="phone" id="phone" className="rounded-md bg-gray-100 focus:bg-white w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border" placeholder="01234567890" />
                                </div>
                                <div className="mt-4 text-sm">
                                    <label for="position" className="block text-sm font-semibold">Position</label>
                                    <Select id='position' name='position' options={MyData.optionPosition} className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0" />
                                </div>
                                <div className="mt-4 text-sm">
                                    <label for="depart" className="block text-sm font-semibold">Department</label>
                                    <select id="depart" name="depart" className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0">
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                                <div className="mt-4 text-sm">
                                    <label for="group" className="block text-sm font-semibold">Work Group</label>
                                    <Select id='position' name='position' options={MyData} className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0" />
                                </div>
                                <div className="mt-4 text-sm">
                                    <label for="role" className="block text-sm font-semibold">Role</label>
                                    <select id="role" name="role" className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0">
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                                <div className="mt-4 text-sm">
                                    <label for="password" className="block text-sm font-semibold">Password</label>
                                    <div className="relative">
                                        <input type="password" id="password" name="password" className="rounded-md bg-red-100 w-full p-2 ps-3 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0" />
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                            <button type="button" onclick="togglePasswordVisibility()" className="text-gray-500 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hidden">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-4 text-sm">
                                    <label for="status" className="block text-sm font-semibold">Status</label>
                                    <select id="status" name="status" className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0">
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                                <div className='my-8 flex justify-end items-center'>
                                    <Link to={'/usermanage'}>
                                        <button type='submit' onClick={() => successAdd()} className='bg-green-300 text-green-800 hover:bg-green-500 hover:text-green-100 rounded-xl px-8 py-2 mr-2'>Submit</button>
                                    </Link>
                                        <button type='reset' className='bg-gray-300 text-gray-800 hover:bg-gray-500 hover:text-gray-100 rounded-xl px-8 py-2 ml-2'>Reset</button>
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