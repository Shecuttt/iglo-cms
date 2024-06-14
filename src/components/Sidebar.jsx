import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBorderAll,
  faUsers,
  faUserGroup,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
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
    <div>
      <aside
        className={`h-svh sticky flex flex-col justify-stretch text-sm left-0 top-0 bg-white p-4 transition-transform duration-300 ${
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        } lg:translate-x-0 lg:w-64`}
      >
        <div className="">
          {/* <button className="hidden p-4" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button> */}
          <a
            href="#"
            className="hidden h-16 lg:flex items-center pb-4 border-b-2 border-b-red-800"
          >
            <h1 className="text-red-800 font-bold mx-auto text-2xl">
              TECHTOLK
            </h1>
          </a>
        </div>
        <ul className="space-y-3 text-red-800 font-semibold py-4">
          <li ref={dropdownRef} className="relative">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "relative flex items-center bg-red-700 text-red-50 rounded-lg px-4 py-3 shadow-md"
                  : "flex items-center hover:bg-red-100 rounded-lg px-4 py-3"
              }
              end
            >
              <FontAwesomeIcon icon={faHouse} />
              <span className="mx-auto lg:mx-4 hidden lg:block">Dashboard</span>
            </NavLink>
          </li>
          <li className="group p-4">
            <h5 className=" hidden lg:block">User Management</h5>
            <ul className="space-y-4 pt-4">
              <li>
                <NavLink
                  to={"/usermanage"}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 bg-red-700 text-red-50 rounded-md flex items-center shadow-md"
                      : "p-2 hover:bg-red-100 rounded-md flex items-center"
                  }
                  end
                >
                  <FontAwesomeIcon icon={faUserGear} />
                  <span href="" className="ml-4 hidden lg:block">
                    Admin
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/structure"}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 bg-red-700 text-red-50 rounded-md flex items-center shadow-md"
                      : "p-2 hover:bg-red-100 rounded-md flex items-center"
                  }
                  end
                >
                  <FontAwesomeIcon icon={faUserGroup} />
                  <span href="" className="ml-4 hidden lg:block">
                    Lead
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/customer"}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 bg-red-700 text-red-50 rounded-md flex items-center shadow-md"
                      : "p-2 hover:bg-red-100 rounded-md flex items-center"
                  }
                  end
                >
                  <FontAwesomeIcon icon={faUsers} />
                  <span href="" className="mx-4 hidden lg:block">
                    Customer
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/salesplan"}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 bg-red-700 text-red-50 rounded-md flex items-center shadow-md"
                      : "p-2 hover:bg-red-100 rounded-md flex items-center"
                  }
                  end
                >
                  <FontAwesomeIcon icon={faUsers} />
                  <span href="" className="mx-4 hidden lg:block">
                    Sales Plan
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="group p-4">
            <h5 className=" hidden lg:block">Campaign</h5>
            <ul className="pt-4">
              <li className="">
                <a
                  href=""
                  className="p-2 hover:bg-red-100 rounded-md flex items-center"
                >
                  <FontAwesomeIcon icon={faBorderAll} />
                  <span href="" className="ml-4 hidden lg:block">
                    Campaign
                  </span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
