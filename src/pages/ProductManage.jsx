import React from "react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import ProdMan from "../components/productComponent/ProdMan";

const ProductManage = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="w-full bg-red-50">
                <TopNav />
                <ProdMan />
            </main>
        </div>
    );
};

export default ProductManage;
