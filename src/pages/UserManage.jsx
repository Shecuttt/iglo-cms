import React, { useState } from "react";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import Management from "../components/userComponent/Management";

const UserManage = () => {
    return (
        // root
        <div className="flex">
            {/* <!-- Sidebar --> */}
            <Sidebar />
            {/* // <!-- Main start --> */}
            <main className="w-full bg-red-50">
                {/* <!-- Navbar --> */}

                <TopNav />

                {/* <!-- Content --> */}
                <div className="m-8 bg-white shadow-md rounded-lg">
                    <Management />
                </div>
            </main>
        </div>
    );
};

export default UserManage;
