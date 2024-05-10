import React from "react";
import TopNav from "../components/TopNav";
import FormEdit from "../components/FormEdit";
import Sidebar from "../components/Sidebar";
import BackButton from "../components/BackButton";

const EditUser = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            {/* Main */}
            <main className="w-full bg-red-50">
                <TopNav />
                <BackButton />
                <div className="px-10 py-4">
                    <FormEdit />
                </div>
            </main>
        </div>
    );
};

export default EditUser;
