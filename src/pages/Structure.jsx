import React from "react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import NotFound from "../components/NotFound";

const Structure = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            {/* Main */}
            <main className="w-full bg-red-50">
                <TopNav />
                <NotFound />
            </main>
        </div>
    );
};

export default Structure;
