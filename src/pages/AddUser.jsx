import React from "react";
import TopNav from "../components/TopNav";
import { Link } from "react-router-dom";
import ProfileImage from "../assets/person-1.jpg";
import FormAdd from "../components/FormAdd";

const AddUser = () => {
    return (
        <div className="bg-red-50">
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
                            <div className="flex flex-col text-center space-y-3">
                                <Link to={"/"} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded w-full">
                                    Edit Profil
                                </Link>
                                <Link to={"/usermanage"} className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded w-full">
                                    Kembali
                                </Link>
                            </div>
                        </div>
                        {/* <!-- form --> */}
                        <div className="col-span-2 bg-white rounded-lg shadow-md p-4">
                            <div className="grid gap-6 text-sm">
                                <FormAdd />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Content end --> */}
            </main>

            {/* <!-- End: Main --> */}
        </div>
    );
};

export default AddUser;
