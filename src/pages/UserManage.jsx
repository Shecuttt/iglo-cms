import React, { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import axios from "axios";
// import Api from "../api/API";

const UserManage = () => {
    // const [users, setUsers] = useState([]);

    // // Fetch data

    // const fetchData = async () => {
    //     // PERHATIKAN DISINI!!!
    //     await Api.get("/api/data").then((response) => {
    //         setData(response.data.data.data);
    //     });
    // };
    // useEffect(() => {
    //     fetchData();
    // }, []);

    // // Loader

    // if (!data.length) {
    //     return (
    //         <div className="flex items-center justify-center h-screen">
    //             <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 animate-ping"></div>
    //         </div>
    //     );
    // }

    const confirmDel = () => {
        Swal.fire({
            icon: "question",
            title: "Hapus data?",
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Berhasil dihapus", "", "success");
            }
        });
    };
    return (
        // root
        <div className="flex">
            {/* <!-- Sidebar --> */}
            <Sidebar />
            {/* // <!-- Main start --> */}
            <main className="w-full bg-red-50">
                {/* <!-- Navbar --> */}

                <TopNav />

                {/* <!-- Breadcrumb --> */}
                <nav className="m-8 flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-2">
                        <li className="inline-flex items-center">
                            <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-red-700">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Dashboard
                            </a>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="ms-2 text-sm font-medium text-gray-500">User Management</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* <!-- Content --> */}
                <div className="m-8">
                    {/* <!-- Title content --> */}
                    <div className="ml-6 mb-4">
                        <h1 className="text-red-800 font-bold text-3xl">User Management</h1>
                    </div>

                    {/* <!-- Main content --> */}
                    <div className="w-full bg-white rounded-xl p-6">
                        <div className="flex items-center pb-6">
                            <div className="flex items-center">
                                <a href="#" className="text-sm bg-gray-400 hover:bg-gray-600 text-white rounded-md px-4 py-2">
                                    <FontAwesomeIcon icon={faFilter} className="mr-1" />
                                    <span>Sort by</span>
                                </a>
                            </div>
                            <div className="flex items-center ml-4">
                                <label htmlFor="table-search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="table-search-users"
                                        className="py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-red-700 outline-none focus:shadow-lg"
                                        placeholder="Search for users"
                                    />
                                </div>
                            </div>
                            <div className="flex ml-auto">
                                <Link to={"/adduser"} className="text-sm bg-red-800 hover:bg-red-600 active:bg-white active:text-red-800 text-white rounded-md px-4 py-2">
                                    Tambah
                                </Link>
                            </div>
                        </div>
                        <table className="w-full text-sm px-6">
                            {/* <!-- Table header --> */}
                            <thead className="text-white bg-red-800 text-left">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nama
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            {/* <!-- Table content --> */}
                            <tbody>
                                {/* {data.map((item, index) => (
                                    <tr key={item.id} className="odd:bg-white even:bg-red-50 border-b">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">{item.nama}</td>
                                        <td className="px-6 py-4">{item.email}</td>
                                        <td className="px-6 py-4">{item.status}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-green-200 hover:bg-green-400 text-green-800 rounded-full py-2 px-4">Active</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <Link to={"/readonly"} className="rounded-full text-white bg-blue-600 hover:bg-blue-800 active:text-blue-600 active:bg-white flex items-center">
                                                    <FontAwesomeIcon icon={faEye} className="p-2 items-center" />
                                                </Link>
                                                <Link to={"/edit"} className="rounded-full text-white bg-green-600 hover:bg-green-800 active:text-green-600 active:bg-white flex items-center">
                                                    <FontAwesomeIcon icon={faPenToSquare} className="p-2" />
                                                </Link>
                                                <button onClick={confirmDel} className="rounded-full text-white bg-red-600 hover:bg-red-800 active:text-red-600 active:bg-white flex items-center">
                                                    <FontAwesomeIcon icon={faTrash} className="p-2" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))} */}
                                <tr className="odd:bg-white even:bg-red-50 border-b">
                                    <td className="px-6 py-4">2</td>
                                    <td className="px-6 py-4">Fitri Anisa</td>
                                    <td className="px-6 py-4">fitrianissa@gmail.com</td>
                                    <td className="px-6 py-4">Admin</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-red-200 hover:bg-red-400 text-red-800 rounded-full py-2 px-4">Inactive</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <a href="" className="rounded-full text-white bg-blue-600 hover:bg-blue-800 active:text-blue-600 active:bg-white flex items-center">
                                                <FontAwesomeIcon icon={faEye} className="p-2 items-center" />
                                            </a>
                                            <a href="" className="rounded-full text-white bg-green-600 hover:bg-green-800 active:text-green-600 active:bg-white flex items-center">
                                                <FontAwesomeIcon icon={faPenToSquare} className="p-2" />
                                            </a>
                                            <a href="" className="rounded-full text-white bg-red-600 hover:bg-red-800 active:text-red-600 active:bg-white flex items-center">
                                                <FontAwesomeIcon icon={faTrash} className="p-2" />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="odd:bg-white even:bg-red-50 border-b">
                                    <td className="px-6 py-4">3</td>
                                    <td className="px-6 py-4">Juan Saputra</td>
                                    <td className="px-6 py-4">juan75@gmail.com</td>
                                    <td className="px-6 py-4">Admin</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-green-200 hover:bg-green-400 text-green-800 rounded-full py-2 px-4">Active</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <a href="" className="rounded-full text-white bg-blue-600 hover:bg-blue-800 active:text-blue-600 active:bg-white flex items-center">
                                                <FontAwesomeIcon icon={faEye} className="p-2 items-center" />
                                            </a>
                                            <a href="" className="rounded-full text-white bg-green-600 hover:bg-green-800 active:text-green-600 active:bg-white flex items-center">
                                                <FontAwesomeIcon icon={faPenToSquare} className="p-2" />
                                            </a>
                                            <a href="" className="rounded-full text-white bg-red-600 hover:bg-red-800 active:text-red-600 active:bg-white flex items-center">
                                                <FontAwesomeIcon icon={faTrash} className="p-2" />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="odd:bg-white even:bg-red-50 border-b">
                                    <td className="px-6 py-4">4</td>
                                    <td className="px-6 py-4">Yosua</td>
                                    <td className="px-6 py-4">yosuaalx@gmail.com</td>
                                    <td className="px-6 py-4">Admin</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-green-200 hover:bg-green-400 text-green-800 rounded-full py-2 px-4">Active</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <a href="" className="rounded-full text-white bg-blue-600 hover:bg-blue-800 active:text-blue-600 active:bg-white flex items-center">
                                                <FontAwesomeIcon icon={faEye} className="p-2 items-center" />
                                            </a>
                                            <a href="" className="rounded-full text-white bg-green-600 hover:bg-green-800 active:text-green-600 active:bg-white flex items-center">
                                                <FontAwesomeIcon icon={faPenToSquare} className="p-2" />
                                            </a>
                                            <a href="" className="rounded-full text-white bg-red-600 hover:bg-red-800 active:text-red-600 active:bg-white flex items-center">
                                                <FontAwesomeIcon icon={faTrash} className="p-2" />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="odd:bg-white even:bg-red-50 border-b">
                                    <td className="px-6 py-4">5</td>
                                    <td className="px-6 py-4">Wilian</td>
                                    <td className="px-6 py-4">wili37@gmail.com</td>
                                    <td className="px-6 py-4">Admin</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-red-200 hover:bg-red-400 text-red-800 rounded-full py-2 px-4">Inactive</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <a href="" className="rounded-full text-white bg-blue-600 hover:bg-blue-800 active:text-blue-600 active:bg-white flex items-center">
                                                <FontAwesomeIcon icon={faEye} className="p-2 items-center" />
                                            </a>
                                            <a href="" className="rounded-full text-white bg-green-600 hover:bg-green-800 active:text-green-600 active:bg-white flex items-center">
                                                <FontAwesomeIcon icon={faPenToSquare} className="p-2" />
                                            </a>
                                            <a href="" className="rounded-full text-white bg-red-600 hover:bg-red-800 active:text-red-600 active:bg-white flex items-center">
                                                <FontAwesomeIcon icon={faTrash} className="p-2" />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex items-center justify-end bg-red-800 text-white">
                            <div className="p-2 text-sm">
                                <nav className="flex items-center space-x-1">
                                    <button
                                        type="button"
                                        className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        <span aria-hidden="true">«</span>
                                        <span className="sr-only">Previous</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="min-w-10 flex justify-center items-center text-white hover:bg-white/10 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
                                        aria-current="page"
                                    >
                                        1
                                    </button>
                                    <button
                                        type="button"
                                        className="min-w-10 flex justify-center items-center text-white hover:bg-white/10 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        2
                                    </button>
                                    <button
                                        type="button"
                                        className="min-w-10 flex justify-center items-center text-white hover:bg-white/10 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        3
                                    </button>
                                    <button
                                        type="button"
                                        className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        <span className="sr-only">Next</span>
                                        <span aria-hidden="true">»</span>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserManage;
