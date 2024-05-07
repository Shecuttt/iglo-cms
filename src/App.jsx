import { Routes, Route } from "react-router-dom";

import UserManage from "./pages/UserManage";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import Login from "./pages/Login";
import UserLog from "./pages/UserLog";
import NotFound from "./components/NotFound";
import Structure from "./pages/Structure";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/usermanage" element={<UserManage />} />
                <Route path="/structure" element={<Structure />} />
                <Route path="/userlog" element={<UserLog />} />
                <Route path="/adduser" element={<AddUser />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
