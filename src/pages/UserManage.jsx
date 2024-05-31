import React, { useState } from "react";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import UserTable from "../components/UserTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { userlist } from "../data/db.json";

const UserManage = () => {
    const [userData, setUserData] = useState(userlist);
    const [searchUser, setSearchUser] = useState("");

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
                            <form onSubmit={(e) => e.preventDefault()} className="flex items-center ml-4">
                                <span htmlFor="table-search-users" className="sr-only">
                                    Search
                                </span>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="table-search-users"
                                        role="searchbox"
                                        className="py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-red-700 outline-none focus:shadow-lg"
                                        placeholder="Search for users"
                                        value={searchUser}
                                        onChange={(e) => setSearchUser(e.target.value)}
                                    />
                                </div>
                            </form>
                            <div className="flex ml-auto">
                                <Link to={"/adduser"} className="text-sm bg-red-800 hover:bg-red-600 active:bg-white active:text-red-800 text-white rounded-md px-4 py-2">
                                    Tambah
                                </Link>
                            </div>
                        </div>
                        {/* the table here */}
                        <UserTable
                            userData={userData.filter((data) => {
                                if (data.data) {
                                    return data.data.toLowerCase().includes(searchUser.toLowerCase());
                                } else {
                                    return false;
                                }
                            })}
                            setUserData={setUserData}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserManage;
