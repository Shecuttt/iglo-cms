import React, { useState } from "react";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import Management from "../components/userComponent/Management";
import Layout from "../components/Layout";

const UserManage = () => {
  return (
    <Layout>
      <div className="m-8 bg-white shadow-md rounded-lg">
        <Management />
      </div>
    </Layout>
  );
};

export default UserManage;
