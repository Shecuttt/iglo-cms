import React from "react";

const SalesTabContext = ({ tabs, activeTab, setActiveTab }) => {
  const Tab = ({ label, onClick, isActive }) => {
    return (
      <button
        onClick={onClick}
        className={
          isActive
            ? "text-red-700 border-b-2 border-b-red-500 font-bold py-2 px-4"
            : "hover:text-red-700 text-red-500 font-semibold py-2 px-4"
        }
      >
        {label}
      </button>
    );
  };

  return (
    <div className="w-full">
      <div className="p-8 flex">
        {tabs.map((tab) => (
          <div key={tab.label} className="flex mx-2">
            {typeof tab.label === "string" ? (
              <Tab
                label={tab.label}
                onClick={() => setActiveTab(tab.label)}
                isActive={tab.label === activeTab}
              />
            ) : (
              <div className="flex items-center">{tab.label}</div>
            )}
          </div>
        ))}
      </div>
      <div className="px-8">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={tab.label === activeTab ? "active" : "hidden"}
          >
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesTabContext;
