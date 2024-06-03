import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import UserManage from "./pages/UserManage";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import Login from "./pages/Login";
import UserLog from "./pages/UserLog";
import NotFound from "./components/NotFound";
import Structure from "./pages/Structure";
import EditUser from "./pages/EditUser";
import ReadUser from "./pages/ReadUser";
import SalesPlan from "./pages/SalesPlan";
import Customer from "./pages/Customer";
import ProductManage from "./pages/ProductManage";
import CompanyManage from "./pages/CompanyManage";
import Loading from "./components/Loading";

function App() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [location]); // Menambahkan location sebagai dependensi

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/usermanage" element={<UserManage />} />
                    <Route path="/structure" element={<Structure />} />
                    <Route path="/salesplan" element={<SalesPlan />} />
                    <Route path="/customer" element={<Customer />} />
                    <Route path="/productmanage" element={<ProductManage />} />
                    <Route path="/companymanage" element={<CompanyManage />} />
                    <Route path="/userlog" element={<UserLog />} />
                    <Route path="/adduser" element={<AddUser />} />
                    <Route path="/edit" element={<EditUser />} />
                    <Route path="/readonly" element={<ReadUser />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            )}
        </>
    );
}

export default App;
