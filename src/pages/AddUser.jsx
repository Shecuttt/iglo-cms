import React from "react";
import TopNav from "../components/TopNav";
import FormAdd from "../components/FormAdd";
import Sidebar from "../components/Sidebar";

const AddUser = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            {/* Main */}
            <main className="w-full bg-red-50">
                <TopNav />
                <div className="px-10 py-4">
                    <FormAdd />
                </div>
            </main>
        </div>
    );
};

export default AddUser;
