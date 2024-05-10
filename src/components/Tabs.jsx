import { useState } from "react";
import React from "react";
import Company from "./structureComponent/Company";
import Employee from "./structureComponent/Employee";
import TimeReport from "./structureComponent/TimeReport";
import Knowledge from "./structureComponent/Knowledge";

import TabContext from "./TabContext";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("Company");

    const tabs = [
        { label: "Company", component: <Company /> },
        { label: "Employee", component: <Employee /> },
        { label: "Time Report", component: <TimeReport /> },
        { label: "Knowledge", component: <Knowledge /> },
    ];

    return (
        <div className="flex justify-between">
            <TabContext tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" />
        </div>
    );
};

export default Tabs;
