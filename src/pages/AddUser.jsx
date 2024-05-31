import React, { useState } from "react";
import TopNav from "../components/TopNav";
import FormAdd from "../components/FormAdd";
import Sidebar from "../components/Sidebar";

const AddUser = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [position, setPosition] = useState("");
    const [department, setDepartment] = useState("");
    const [work, setWork] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            {/* Main */}
            <main className="w-full bg-red-50">
                <TopNav />
                <div className="px-10 py-4">
                    <FormAdd
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        id={id}
                        setId={setId}
                        email={email}
                        setEmail={setEmail}
                        phone={phone}
                        setPhone={setPhone}
                        password={password}
                        setPassword={setPassword}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        position={position}
                        setPosition={setPosition}
                        department={department}
                        setDepartment={setDepartment}
                        work={work}
                        setWork={setWork}
                        role={role}
                        setRole={setRole}
                        status={status}
                        setStatus={setStatus}
                    />
                </div>
            </main>
        </div>
    );
};

export default AddUser;
