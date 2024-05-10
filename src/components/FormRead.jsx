import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { optionDepart, optionPosition, optionRole, optionStatus, workGroup } from "../data/MyData";
import Select from "react-select";

const FormRead = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="bg-white rounded-md shadow-md p-8">
            <form>
                <div className="flex items-center space-x-3">
                    <div className="mt-4 text-sm w-full">
                        <label htmlFor="name" className="font-semibold">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={firstName}
                            name="fname"
                            id="fname"
                            className="rounded-md bg-gray-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none"
                            placeholder="Kirana"
                            onChange={(e) => setFirstName(e.target.value)}
                            disabled
                        />
                    </div>
                    <div className="mt-4 text-sm w-full">
                        <label htmlFor="name" className="font-semibold">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={lastName}
                            name="lname"
                            id="lname"
                            className="rounded-md bg-gray-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none"
                            placeholder="Spakbor"
                            onChange={(e) => setLastName(e.target.value)}
                            disabled
                        />
                    </div>
                </div>
                <div className="mt-4 text-sm">
                    <label htmlFor="id" className="font-semibold">
                        Employee ID
                    </label>
                    <input
                        type="text"
                        value={id}
                        name="id"
                        id="id"
                        className="rounded-md bg-gray-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none"
                        placeholder="Kirana001"
                        onChange={(e) => setId(e.target.value)}
                        disabled
                    />
                </div>
                <div className="mt-4 text-sm">
                    <label htmlFor="email" className="font-semibold">
                        Email
                    </label>
                    <input
                        type="text"
                        value={email}
                        name="email"
                        id="email"
                        className="rounded-md bg-gray-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none"
                        placeholder="kirana123@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                    />
                </div>
                <div className="mt-4 text-sm">
                    <label htmlFor="phone" className="font-semibold">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        value={phone}
                        name="phone"
                        id="phone"
                        className="rounded-md bg-gray-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none"
                        placeholder="01234567890"
                        onChange={(e) => setPhone(e.target.value)}
                        disabled
                    />
                </div>
                <div className="mt-4 text-sm">
                    <label htmlFor="password" className="block text-sm font-semibold">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            className="block w-full mt-1 rounded-md bg-gray-100 p-2 focus:outline-none hover:shadow-md"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            disabled
                        />
                        <button type="button" onClick={handleShowPasswordClick} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            {showPassword ? <FontAwesomeIcon icon={faEye} className="w-4 h-4 text-gray-500" /> : <FontAwesomeIcon icon={faEyeSlash} className="w-4 h-4 text-gray-500" />}
                        </button>
                    </div>
                </div>
                <div className="mt-4 text-sm">
                    <label htmlFor="position" className="block text-sm font-semibold">
                        Position
                    </label>
                    <Select id="position" name="position" options={optionPosition} className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none" isDisabled />
                </div>
                <div className="mt-4 text-sm">
                    <label htmlFor="depart" className="block text-sm font-semibold">
                        Department
                    </label>
                    <Select id="depart" name="depart" options={optionDepart} className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none" isDisabled />
                </div>
                <div className="mt-4 text-sm">
                    <label htmlFor="group" className="block text-sm font-semibold">
                        Work Group
                    </label>
                    <Select id="workgroup" name="workgroup" options={workGroup} className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none" isDisabled />
                </div>
                <div className="mt-4 text-sm">
                    <label htmlFor="role" className="block text-sm font-semibold">
                        Role
                    </label>
                    <Select id="role" name="role" options={optionRole} className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none" isDisabled />
                </div>
                <div className="my-4 text-sm">
                    <label htmlFor="status" className="block text-sm font-semibold">
                        Status
                    </label>
                    <Select id="status" name="status" options={optionStatus} className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none" isDisabled />
                </div>
            </form>
        </div>
    );
};

export default FormRead;
