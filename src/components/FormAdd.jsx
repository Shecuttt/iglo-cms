import React, { useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { optionDepart, optionPosition, optionRole, optionStatus, workGroup } from "../data/MyData";
import { Link, useNavigate } from "react-router-dom";
import { userlist } from "../data/db.json";

const FormAdd = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    id,
    setId,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    position,
    setPosition,
    department,
    setDepartment,
    work,
    setWork,
    role,
    setRole,
    status,
    setStatus,
}) => {
    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };

    const add = (user) => {
        const id = userlist.length ? userlist[userlist.length - 1].id + 1 : 1;
        const newUser = {
            firstName,
            lastName,
            id,
            email,
            phone,
            password,
            position,
            department,
            work,
            role,
            status,
        };
        const listData = [...userlist, newUser];
        setUserData(listData);
        localStorage.setItem("userlist", JSON.stringify(listData));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        add(newUser);
        setFirstName("");

        const isValid = firstName != "" && lastName != "" && id != "" && email != "" && phone != "" && password != "";

        Swal.fire({
            icon: isValid ? "success" : "error",
            title: isValid ? "Berhasil" : "Gagal",
            text: isValid ? "Data berhasil ditambahkan" : "Data belum lengkap!",
        }).then(() => {
            <Link to={"/usermanage"}></Link>;
        });
    };

    const backPrevious = useNavigate();
    const handleBack = () => {
        backPrevious(-1);
    };

    return (
        <>
            <div className="bg-white rounded-md shadow-md p-8">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center space-x-3">
                        <div className="mt-4 text-sm w-full">
                            <label htmlFor="fname" className="font-semibold">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={firstName}
                                id="fname"
                                aria-label=""
                                className="rounded-md bg-gray-100 focus:bg-white w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border"
                                placeholder="First Name"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="mt-4 text-sm w-full">
                            <label htmlFor="lname" className="font-semibold">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                id="lname"
                                className="rounded-md bg-gray-100 focus:bg-white w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border"
                                placeholder="Last Name"
                                onChange={(e) => setLastName(e.target.value)}
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
                            id="id"
                            className="rounded-md bg-gray-100 focus:bg-white w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border"
                            placeholder="ID"
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>
                    <div className="mt-4 text-sm">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>
                        <input
                            type="text"
                            value={email}
                            id="email"
                            autoComplete="off"
                            className="rounded-md bg-gray-100 focus:bg-white w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border"
                            placeholder="E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-4 text-sm">
                        <label htmlFor="phone" className="font-semibold">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={phone}
                            id="phone"
                            autoComplete="off"
                            className="rounded-md bg-gray-100 focus:bg-white w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border"
                            placeholder="Phone number"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mt-4 text-sm">
                        <label htmlFor="password" className="block text-sm font-semibold">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                placeholder="Password"
                                className="block w-full mt-1 rounded-md bg-gray-100 p-2 focus:outline-none focus:bg-white focus:ring-red-600 focus:border-red-500 hover:shadow-md border"
                            />
                            <button type="button" onClick={handleShowPasswordClick} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                {showPassword ? <FontAwesomeIcon icon={faEye} className="w-4 h-4 text-gray-500" /> : <FontAwesomeIcon icon={faEyeSlash} className="w-4 h-4 text-gray-500" />}
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 text-sm">
                        <span htmlFor="position" className="block text-sm font-semibold">
                            Position
                        </span>
                        <Select
                            id="position"
                            options={optionPosition}
                            onChange={(e) => {
                                if (e.target && e.target.value) {
                                    setPosition(e.target.value);
                                }
                            }}
                            className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0"
                        />
                    </div>
                    <div className="mt-4 text-sm">
                        <span htmlFor="depart" className="block text-sm font-semibold">
                            Department
                        </span>
                        <Select
                            id="depart"
                            options={optionDepart}
                            onChange={(e) => {
                                if (e.target && e.target.value) {
                                    setDepartment(e.target.value);
                                }
                            }}
                            className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0"
                        />
                    </div>
                    <div className="mt-4 text-sm">
                        <span htmlFor="group" className="block text-sm font-semibold">
                            Work Group
                        </span>
                        <Select
                            id="workgroup"
                            options={workGroup}
                            onChange={(e) => {
                                if (e.target && e.target.value) {
                                    setWork(e.target.value);
                                }
                            }}
                            className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0"
                        />
                    </div>
                    <div className="mt-4 text-sm">
                        <span htmlFor="role" className="block text-sm font-semibold">
                            Role
                        </span>
                        <Select
                            id="role"
                            options={optionRole}
                            onChange={(e) => {
                                if (e.target && e.target.value) {
                                    setRole(e.target.value);
                                }
                            }}
                            className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0"
                        />
                    </div>
                    <div className="my-4 text-sm">
                        <span htmlFor="status" className="block text-sm font-semibold">
                            Status
                        </span>
                        <Select
                            id="status"
                            options={optionStatus}
                            onChange={(e) => {
                                if (e.target && e.target.value) {
                                    setStatus(e.target.value);
                                }
                            }}
                            className="rounded-md bg-red-100 w-full p-2 hover:shadow-md mt-2 focus:outline-none focus:ring-red-600 focus:border-red-500 border-0"
                        />
                    </div>
                    <div className="my-8 flex justify-end items-center">
                        <button type="submit" className="bg-green-300 text-green-800 hover:bg-green-500 hover:text-green-100 rounded-md px-8 py-2 mr-2">
                            Add
                        </button>
                        <button onClick={handleBack} className="bg-gray-300 text-gray-800 hover:bg-gray-500 hover:text-gray-100 rounded-md px-8 py-2 ml-2">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormAdd;
