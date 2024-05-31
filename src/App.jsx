import { Routes, Route } from "react-router-dom";

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

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/usermanage" element={<UserManage />} />
                <Route path="/structure" element={<Structure />} />
                <Route path="/salesplan" element={<SalesPlan />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/productmanage" element={<ProductManage />} />
                <Route path="/userlog" element={<UserLog />} />
                <Route path="/adduser" element={<AddUser />} />
                <Route path="/edit" element={<EditUser />} />
                <Route path="/readonly" element={<ReadUser />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
