import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBorderAll,
  faUsers,
  faUserGroup,
  faUserGear,
  faEnvelope,
  faBell,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, Menu, Badge, theme, ConfigProvider, Breadcrumb } from "antd";
import { Link, NavLink, useLocation } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const sidemenu = [
  {
    key: "divider",
    type: "divider",
  },
  {
    key: "dashboard",
    label: <NavLink to={"/"}>Dashboard</NavLink>,
    icon: <FontAwesomeIcon icon={faHouse} />,
  },
  {
    key: "usermanage",
    label: "User Management",
    type: "group",
    children: [
      {
        key: "admin",
        label: <NavLink to={"/usermanage"}>Admin</NavLink>,
        icon: <FontAwesomeIcon icon={faUserGear} />,
      },
      {
        key: "lead",
        label: <NavLink to={"/structure"}>Lead</NavLink>,
        icon: <FontAwesomeIcon icon={faUserGroup} />,
      },
      {
        key: "customer",
        label: <NavLink to={"/customer"}>Customers</NavLink>,
        icon: <FontAwesomeIcon icon={faUsers} />,
      },
      {
        key: "sales",
        label: <NavLink to={"/salesplan"}>Sales Plan</NavLink>,
        icon: <FontAwesomeIcon icon={faUsers} />,
      },
    ],
  },
  {
    key: "campaign",
    label: "Campaign",
    type: "group",
    children: [
      {
        key: "camp1",
        label: "Campaign",
        icon: <FontAwesomeIcon icon={faBorderAll} />,
        disabled: true,
      },
    ],
  },
];

const topmenu = [
  {
    key: "message",
    label: (
      <Badge size="small" count={1}>
        <FontAwesomeIcon icon={faEnvelope} />
      </Badge>
    ),
    children: [
      {
        key: "message1",
        label: "New message!",
      },
    ],
  },
  {
    key: "notification",
    label: (
      <Badge size="small" count={1}>
        <FontAwesomeIcon icon={faBell} />
      </Badge>
    ),
    children: [
      {
        key: "notification1",
        label: "New notification!",
      },
    ],
  },
  {
    key: "profile",
    label: <Avatar icon={<FontAwesomeIcon icon={faUser} />} />,
    children: [
      {
        key: "logout",
        label: <NavLink to={"/login"}>Logout</NavLink>,
      },
    ],
  },
];

const Layout = ({ children }) => {
  const currentYear = new Date().getFullYear();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((prevTheme) => !prevTheme);
  };

  const location = useLocation();
  const breadcrumbItem = [
    {
      title: "Dashboard",
    },
  ];

  switch (location.pathname) {
    case "/usermanage":
      breadcrumbItem.push({ title: "User Management" });
      break;

    case "/structure":
      breadcrumbItem.push({ title: "Lead" });
      break;

    case "/customer":
      breadcrumbItem.push({ title: "Customers" });
      break;

    case "/salesplan":
      breadcrumbItem.push({ title: "Sales Plan" });
      break;

    case "/adduser":
      breadcrumbItem.push({ title: "User Management", href: "/usermanage" });
      breadcrumbItem.push({ title: "Add User" });
      break;

    default:
      break;
  }

  return (
    <>
      <ConfigProvider
        theme={{ algorithm: darkMode ? darkAlgorithm : defaultAlgorithm }}
      >
        <div className="flex">
          <aside className={collapsed ? `w-auto` : `lg:w-1/5`}>
            <div className="flex justify-between">
              <button
                className="mx-auto p-4 font-bold text-xl"
                onClick={toggleCollapsed}
              >
                {collapsed ? "CRM" : "IGLO CRM"}
              </button>
              <button className="hidden p-4" onClick={toggleDarkMode}>
                <FontAwesomeIcon icon={faMoon} />
              </button>
            </div>
            <Menu
              mode="inline"
              inlineCollapsed={collapsed}
              items={sidemenu}
              className="p-2 space-y-2"
            />
          </aside>
          <main className="w-full h-svh overflow-y-auto">
            <Menu
              mode="horizontal"
              items={topmenu}
              selectable={false}
              className="p-3 flex justify-end space-x-2 shadow"
            />
            <Breadcrumb className="pt-8 pl-8" items={breadcrumbItem} />
            {children}
            <div className="flex justify-center items-center w-full bg-white p-4 text-gray-600 text-sm">
              © {currentYear} IGLO CRM. All rights reserved.
            </div>
          </main>
        </div>
      </ConfigProvider>
    </>
  );
};

export default Layout;
