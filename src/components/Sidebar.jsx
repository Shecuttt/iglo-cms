import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faHouse, faUser, faBorderAll, faUsers, faUserGroup, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Sidebar() {
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
        <aside className="h-svh sticky flex flex-col justify-stretch text-sm left-0 top-0 w-64 bg-white p-4">
            <a href="#" className="h-16 flex items-center pb-4 border-b-2 border-b-red-800">
                <h1 className="text-red-800 font-bold mx-auto text-2xl">TECHTOLK</h1>
            </a>
            <ul className="space-y-3 text-red-800 font-semibold py-4">
                <li ref={dropdownRef} className="relative">
                    <NavLink
                        to={"/"}
                        className={({ isActive }) => (isActive ? "flex items-center bg-red-700 text-red-50 rounded-lg px-4 py-3 shadow-md" : "flex items-center hover:bg-red-100 rounded-lg px-4 py-3")}
                        end
                    >
                        <FontAwesomeIcon icon={faHouse} />
                        <span className="mx-4">Dashboard</span>
                        <button className="ml-auto py-2 pl-2" onClick={toggleDropdown}>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                    </NavLink>
                    <div className={`absolute bg-red-50 rounded-lg mt-2 mx-3 overflow-hidden transition-all duration-700 ${isOpen ? "max-h-40" : "max-h-0"}`}>
                        <NavLink
                            to={"/userlog"}
                            className={({ isActive }) =>
                                isActive ? "flex items-center bg-red-700 text-red-50 rounded-lg px-4 py-3 shadow-md" : "flex items-center hover:bg-red-100 rounded-lg px-4 py-3"
                            }
                        >
                            Detail Activity
                        </NavLink>
                        <NavLink
                            to={"/productmanage"}
                            className={({ isActive }) =>
                                isActive ? "flex items-center bg-red-700 text-red-50 rounded-lg px-4 py-3 shadow-md" : "flex items-center hover:bg-red-100 rounded-lg px-4 py-3"
                            }
                        >
                            Product Management
                        </NavLink>
                    </div>
                </li>
                <li className="group p-4">
                    <h5>User Management</h5>
                    <ul className="space-y-4 pt-4">
                        <li>
                            <NavLink
                                to={"/usermanage"}
                                className={({ isActive }) => (isActive ? "p-2 bg-red-700 text-red-50 rounded-md flex items-center shadow-md" : "p-2 hover:bg-red-100 rounded-md flex items-center")}
                                end
                            >
                                <FontAwesomeIcon icon={faUserGear} />
                                <span href="" className="ml-4">
                                    Admin
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/structure"}
                                className={({ isActive }) => (isActive ? "p-2 bg-red-700 text-red-50 rounded-md flex items-center shadow-md" : "p-2 hover:bg-red-100 rounded-md flex items-center")}
                                end
                            >
                                <FontAwesomeIcon icon={faUserGroup} />
                                <span href="" className="ml-4">
                                    Lead
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/customer"}
                                className={({ isActive }) => (isActive ? "p-2 bg-red-700 text-red-50 rounded-md flex items-center shadow-md" : "p-2 hover:bg-red-100 rounded-md flex items-center")}
                                end
                            >
                                <FontAwesomeIcon icon={faUsers} />
                                <span href="" className="mx-4">
                                    Customer
                                </span>
                                <i className="fa-solid fa-caret-down ml-auto"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/salesplan"}
                                className={({ isActive }) => (isActive ? "p-2 bg-red-700 text-red-50 rounded-md flex items-center shadow-md" : "p-2 hover:bg-red-100 rounded-md flex items-center")}
                                end
                            >
                                <FontAwesomeIcon icon={faUsers} />
                                <span href="" className="mx-4">
                                    Sales Plan
                                </span>
                                <i className="fa-solid fa-caret-down ml-auto"></i>
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li className="group p-4">
                    <h5>Campaign</h5>
                    <ul className="pt-4">
                        <li className="">
                            <a href="" className="p-2 hover:bg-red-100 rounded-md flex items-center">
                                <FontAwesomeIcon icon={faBorderAll} />
                                <span href="" className="ml-4">
                                    Campaign
                                </span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
