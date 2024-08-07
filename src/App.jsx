// App.jsx
import React from "react";
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
import AddPersonalCustomerForm from "./components/customerComponent/AddPersonalCustomerForm";
import AddCorporateCustomerForm from "./components/customerComponent/AddCorporateCustomerForm";
import EditProduct from "./components/productComponent/EditProduct";
import AddProduct from "./components/productComponent/AddProduct";

import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/usermanage"
            // element={<PrivateRoute element={UserManage} />}
            element={<UserManage />}
          />
          <Route
            path="/adduser"
            // element={<PrivateRoute element={AddUser} />}
            element={<AddUser />}
          />
          <Route
            path="/userlog"
            // element={<PrivateRoute element={UserLog} />}
            element={<UserLog />}
          />
          <Route
            path="/edit/:id"
            // element={<PrivateRoute element={EditUser} />}
            element={<EditUser />}
          />
          <Route
            path="/readonly/:id"
            // element={<PrivateRoute element={ReadUser} />}
            element={<ReadUser />}
          />
          <Route
            path="/structure"
            // element={<PrivateRoute element={Structure} />}
            element={<Structure />}
          />
          <Route
            path="/salesplan"
            // element={<PrivateRoute element={SalesPlan} />}
            element={<SalesPlan />}
          />
          <Route
            path="/customer"
            // element={<PrivateRoute element={Customer} />}
            element={<Customer />}
          />
          <Route
            path="/productmanage"
            // element={<PrivateRoute element={ProductManage} />}
            element={<ProductManage />}
          />
          <Route
            path="/productmanage/edit/:id"
            // element={<PrivateRoute element={EditProduct} />}
            element={<EditProduct />}
          />
          <Route
            path="/productmanage/add"
            // element={<PrivateRoute element={AddProduct} />}
            element={<AddProduct />}
          />
          <Route
            path="/companymanage"
            // element={<PrivateRoute element={CompanyManage} />}
            element={<CompanyManage />}
          />
          <Route
            path="/addpersonal"
            // element={<PrivateRoute element={AddPersonalCustomerForm} />}
            element={<AddPersonalCustomerForm />}
          />
          <Route
            path="/addcorporate"
            // element={<PrivateRoute element={AddCorporateCustomerForm} />}
            element={<AddCorporateCustomerForm />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
