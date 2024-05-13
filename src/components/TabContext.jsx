import React from "react";

const TabContext = ({ tabs, activeTab, setActiveTab }) => {
    const Tab = ({ label, onClick, isActive }) => {
        return (
            <div>
                <button
                    onClick={onClick}
                    className={isActive ? "bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md" : "bg-white hover:text-white hover:bg-red-700 text-red-500 font-bold py-2 px-4 rounded"}
                >
                    {label}
                </button>
            </div>
        );
    };

    return (
        <div className="w-full">
            <div className="p-8 flex">
                {tabs.map((tab) => (
                    <button key={tab.label} className="flex mx-2">
                        <Tab label={tab.label} onClick={() => setActiveTab(tab.label)} isActive={tab.label === activeTab} />
                    </button>
                ))}
            </div>
            <div className="tab-content px-8">
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
