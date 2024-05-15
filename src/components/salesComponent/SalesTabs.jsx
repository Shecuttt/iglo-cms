import React, { useState } from "react";
import Calendar from "./Calendar";
import Contact from "./Contact";
import Document from "./Document";
import Performance from "./Performance";
import Reward from "./Performance";
import TaskEntry from "./TaskEntry";
import SalesTabContext from "./SalesTabContext";

const SalesTabs = () => {
    const [activeTab, setActiveTab] = useState("Calendar");

    const tabs = [
        { label: "Calendar", component: <Calendar /> },
        { label: "Contact", component: <Contact /> },
        { label: "Document", component: <Document /> },
        { label: "Performance", component: <Performance /> },
        { label: "Reward", component: <Reward /> },
        { label: "Task Entry", component: <TaskEntry /> },
    ];

    return (
        <div className="flex justify-between">
            <SalesTabContext tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
};

export default SalesTabs;
