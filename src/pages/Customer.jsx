import React from "react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import CustomerList from "../components/customerComponent/CustomerList";

const Customer = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main */}
      <main className="w-full bg-red-50">
        <TopNav />
        <CustomerList />
      </main>
    </div>
  );
};

export default Customer;
