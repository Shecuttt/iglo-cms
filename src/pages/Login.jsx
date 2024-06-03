import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading";

const Login = ({ value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Contoh penggunaan timeout untuk simulasi loading data
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Membersihkan timeout saat komponen dibongkar
        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="overflow-hidden">
                    <section className="bg-red-100 h-screen relative">
                        {/* <!-- Circle --> */}
                        <div className=" absolute bg-red-200 rounded-full w-80 h-80 -m-16 ml-32 -mt-48"></div>
                        <div className=" absolute bg-rose-700 rounded-full w-96 h-96 -m-16 -ml-28 opacity-85"></div>
                        {/* <!-- Circle --> */}

                        {/* <!-- Circle --> */}
                        <div className="bottom-0 right-0 absolute bg-red-200 rounded-full w-80 h-80 -mb-36 mr-24"></div>
                        <div className="bottom-0 right-0 absolute bg-rose-700 rounded-full w-96 h-96 -mb-24 -mr-24 opacity-85"></div>
                        {/* <!-- Circle --> */}

                        {/* <!-- Start Form --> */}

                        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h1 className="mb-4 text-center text-3xl font-extrabold text-gray-950">
                                    TECH <span className="text-red-900">TOLK</span>
                                </h1>
                                <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">IGLO</h2>
                            </div>

                            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-lg shadow-xl p-10">
                                <h2 className="mb-6 font-bold text-red-900 text-xl text-center">Sign in</h2>
                                <form className="space-y-4" action="index.html" method="POST">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            name="username"
                                            type="username"
                                            autocomplete="username"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring focus:ring-red-700 focus:bg-white shadow-md outline-none px-4 ps-10 bg-slate-200"
                                            placeholder="Username"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={value}
                                            onChange={onChange}
                                            autocomplete="current-password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring focus:ring-red-700 focus:bg-white shadow-md outline-none px-4 ps-10 bg-slate-200"
                                            placeholder="Password"
                                        />
                                        <div className="absolute inset-y-0 end-0 flex items-center pe-2.5 text-gray-400">
                                            <button type="button" onClick={handleShowPasswordClick} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                {showPassword ? (
                                                    <FontAwesomeIcon icon={faEye} className="w-4 h-4 text-gray-500" />
                                                ) : (
                                                    <FontAwesomeIcon icon={faEyeSlash} className="w-4 h-4 text-gray-500" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-red-800 px-3 py-2 font-semibold leading-6 text-white shadow-sm hover:bg-red-600 text-lg mt-8"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* <!-- End form --> */}
                    </section>
                </div>
            )}
        </>
    );
};

export default Login;
