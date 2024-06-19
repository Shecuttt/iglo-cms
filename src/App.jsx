import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";

import UserManage from "./pages/UserManage";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import Login from "./pages/Login";
import UserLog from "./pages/UserLog";
import Structure from "./pages/Structure";
import EditUser from "./pages/EditUser";
import ReadUser from "./pages/ReadUser";
import SalesPlan from "./pages/SalesPlan";
import Customer from "./pages/Customer";
import ProductManage from "./pages/ProductManage";
import CompanyManage from "./pages/CompanyManage";

import NotFound from "./components/NotFound";
import Loading from "./components/Loading";
import AddPersonalCustomerForm from "./components/customerComponent/AddPersonalCustomerForm";
import AddCorporateCustomerForm from "./components/customerComponent/AddCorporateCustomerForm";
import EditProduct from "./components/productComponent/EditProduct";
import AddProduct from "./components/productComponent/AddProduct";

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
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/userlog" element={<UserLog />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/readonly/:id" element={<ReadUser />} />
          <Route path="/structure" element={<Structure />} />
          <Route path="/salesplan" element={<SalesPlan />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/productmanage" element={<ProductManage />} />
          <Route path="/productmanage/edit/:id" element={<EditProduct />} />
          <Route path="/productmanage/add" element={<AddProduct />} />
          <Route path="/companymanage" element={<CompanyManage />} />

          <Route path="/addpersonal" element={<AddPersonalCustomerForm />} />
          <Route path="/addcorporate" element={<AddCorporateCustomerForm />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App;
