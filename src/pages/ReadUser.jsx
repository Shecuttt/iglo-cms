import React from "react";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import FormRead from "../components/FormRead";
import BackButton from "../components/BackButton";

const ReadUser = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            {/* Main */}
            <main className="w-full bg-red-50">
                <TopNav />
                <BackButton />
                <div className="px-10 py-4">
                    <FormRead />
                </div>
            </main>
        </div>
    );
};

export default ReadUser;
