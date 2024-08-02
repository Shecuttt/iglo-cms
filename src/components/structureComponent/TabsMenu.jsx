import React from "react";
import Company from "./Company";
import Employee from "./Employee";
import TimeReport from "./TimeReport";
import Knowledge from "./Knowledge";
import { Tabs } from "antd";

const TabsMenu = () => {
  const tabs = [
    { key: 1, label: "Company", children: <Company /> },
    { key: 2, label: "Employee", children: <Employee /> },
    { key: 3, label: "Time Report", disabled: true, children: <TimeReport /> },
    { key: 4, label: "Knowledge", disabled: true, children: <Knowledge /> },
  ];

  return <Tabs defaultActiveKey="1" items={tabs} className="p-8" />;
};

export default TabsMenu;
