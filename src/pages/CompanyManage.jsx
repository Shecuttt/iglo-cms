import React from "react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import CompanyData from "../components/companyComponent/CompanyData";

const CompanyManage = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="w-full bg-red-50">
                <TopNav />
                <CompanyData />
            </main>
        </div>
    );
};

export default CompanyManage;
