import React from "react";

const TabContext = ({ tabs, activeTab, setActiveTab }) => {
    const Tab = ({ label, onClick, isActive }) => {
        return (
            <div className="">
                <button
                    onClick={onClick}
                    className={isActive ? "bg-red-500 text-white font-bold py-2 px-4 rounded" : "bg-white hover:text-white hover:bg-red-700 text-red-500 font-bold py-2 px-4 rounded"}
                >
                    {label}
                </button>
            </div>
        );
    };

    return (
        <div>
            <div className="p-8 flex">
                {tabs.map((tab) => (
                    <button key={tab.label} className="flex mx-2">
                        <Tab label={tab.label} onClick={() => setActiveTab(tab.label)} isActive={tab.label === activeTab} />
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {tabs.map((tab) => (
                    <div key={tab.label} className={tab.label === activeTab ? "active" : "hidden"}>
                        {tab.component}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabContext;
