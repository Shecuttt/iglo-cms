import { faEnvelope, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { Menu, Dropdown, Button } from "antd";

import CRM from "../assets/logo-ecrm.png";
import MyProfile from "./MyProfile";

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const item = (
    <Menu
      items={[
        {
          key: "0",
          label: <MyProfile />,
        },
      ]}
    />
  );

  return (
    <nav className="bg-red-800 text-gray-50 flex px-4 py-2 top-0 right-0">
      <div className="w-full flex items-center justify-between mx-auto px-8 py-2">
        <a href="" className="flex items-start space-x-4">
          <img src={CRM} alt="CRM" className="h-16 -my-8" />
        </a>
        <div>
          <ul className="flex items-center ml-auto space-x-8">
            <li className="px-1 rounded-full hover:bg-white/20">
              <button className="p-1">
                <FontAwesomeIcon icon={faEnvelope} />
              </button>
            </li>
            <li className="px-1 rounded-full hover:bg-white/20">
              <button className="p-1">
                <FontAwesomeIcon icon={faBell} />
              </button>
            </li>
            <li className="px-1">
              <Dropdown
                menu={item}
                className="bg-transparent border-0 py-6"
                trigger={["click"]}
              >
                <Button
                  className="flex items-center p-4 rounded-lg hover:bg-white/20 hover:text-black"
                  onClick={handleMenuClick}
                >
                  <img
                    src="https://images.unsplash.com/photo-1570158268183-d296b2892211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBvcnRyYWl0fGVufDB8fDB8fHww"
                    alt="Profile Image"
                    className="w-8 h-8 rounded-full mr-2 overflow-hidden object-cover"
                  />
                  <div className="flex flex-col text-white hover:text-black">
                    <span className="text-sm">Kirana</span>
                    <span className="text-xs font-light">Super Admin</span>
                  </div>
                </Button>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
