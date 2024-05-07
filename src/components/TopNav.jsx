import { faEnvelope, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

import CRM from "../assets/logo-ecrm.png";

const TopNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <nav className="bg-red-800 text-gray-50 flex px-4 py-2 top-0 right-0">
            <div className="w-full flex items-center justify-between mx-auto px-8 py-2">
                <a href="" className="flex items-start space-x-4">
                    <img src={CRM} alt="CRM" className="h-16 -my-8" />
                </a>
                <div>
                    <ul className="flex items-center ml-auto space-x-8">
                        <li ref={dropdownRef} className="px-1 rounded-full hover:bg-white/20">
                            <button className="p-1" onClick={toggleDropdown}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </button>
                            {isOpen && (
                                <div className="absolute bg-white text-red-800 border rounded-lg overflow-hidden mt-2">
                                    {/* Dropdown menu items go here */}
                                    <NavLink to={"/"} className="block px-4 py-2 hover:bg-gray-100">
                                        Item 1
                                    </NavLink>
                                    <NavLink to={"/"} className="block px-4 py-2 hover:bg-gray-100">
                                        Item 2
                                    </NavLink>
                                    <NavLink to={"/"} className="block px-4 py-2 hover:bg-gray-100">
                                        Item 3
                                    </NavLink>
                                </div>
                            )}
                        </li>
                        <li className="px-1 rounded-full hover:bg-white/20">
                            <button className="p-1">
                                <FontAwesomeIcon icon={faBell} />
                            </button>
                        </li>
                        <li>
                            <NavLink to={"/login"}>
                                <div className="flex items-center justify-end p-2 rounded-lg hover:bg-white/20">
                                    <img
                                        src="https://images.unsplash.com/photo-1570158268183-d296b2892211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBvcnRyYWl0fGVufDB8fDB8fHww"
                                        alt="Profile Image"
                                        className="w-8 h-8 rounded-full mr-2 overflow-hidden"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm">Kirana</span>
                                        <span className="text-xs font-light">Super Admin</span>
                                    </div>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default TopNav;
