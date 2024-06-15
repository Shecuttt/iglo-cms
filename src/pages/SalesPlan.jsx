import React from "react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import SalesTabs from "../components/salesComponent/SalesTabs";

const SalesPlan = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full">
        <TopNav />
        <SalesTabs />
      </main>
    </div>
  );
};

export default SalesPlan;
