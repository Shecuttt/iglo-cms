// App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

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

import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AuthProvider>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateRoute element={Dashboard} />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/usermanage"
              element={<PrivateRoute element={UserManage} />}
            />
            <Route
              path="/adduser"
              element={<PrivateRoute element={AddUser} />}
            />
            <Route
              path="/userlog"
              element={<PrivateRoute element={UserLog} />}
            />
            <Route
              path="/edit/:id"
              element={<PrivateRoute element={EditUser} />}
            />
            <Route
              path="/readonly/:id"
              element={<PrivateRoute element={ReadUser} />}
            />
            <Route
              path="/structure"
              element={<PrivateRoute element={Structure} />}
            />
            <Route
              path="/salesplan"
              element={<PrivateRoute element={SalesPlan} />}
            />
            <Route
              path="/customer"
              element={<PrivateRoute element={Customer} />}
            />
            <Route
              path="/productmanage"
              element={<PrivateRoute element={ProductManage} />}
            />
            <Route
              path="/productmanage/edit/:id"
              element={<PrivateRoute element={EditProduct} />}
            />
            <Route
              path="/productmanage/add"
              element={<PrivateRoute element={AddProduct} />}
            />
            <Route
              path="/companymanage"
              element={<PrivateRoute element={CompanyManage} />}
            />
            <Route
              path="/addpersonal"
              element={<PrivateRoute element={AddPersonalCustomerForm} />}
            />
            <Route
              path="/addcorporate"
              element={<PrivateRoute element={AddCorporateCustomerForm} />}
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      )}
    </AuthProvider>
  );
}

export default App;
