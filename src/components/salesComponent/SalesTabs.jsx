import React, { useState } from "react";
import { Menu, Dropdown } from "antd";
import Activity from "./Activity";
import Performance from "./Performance";
import Contact from "./Contact";
import Document from "./Document";
import Reward from "./Reward";
import Plans from "./Plans";
import ScheduleCenter from "./ScheduleCenter";
import { DownOutlined } from "@ant-design/icons";
import TaskEntry from "./TaskEntry";

const { Item } = Menu;

const items = [
  {
    key: "schedule-center",
    label: "Schedule Center",
  },
  {
    key: "task-entry",
    label: "Task Entry",
  },
  {
    key: "plans",
    label: "Plans",
  },
  {
    key: "customer-handling",
    label: "Customer Handling",
    disabled: true,
  },
];

const SalesTabs = () => {
  const [activeTab, setActiveTab] = useState("activity");

  const handleMenuClick = ({ key }) => {
    setActiveTab(key);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "activity":
        return <Activity />;
      case "performance":
        return <Performance />;
      case "contact":
        return <Contact />;
      case "document":
        return <Document />;
      case "reward":
        return <Reward />;
      case "plans":
        return <Plans />;
      case "schedule-center":
        return <ScheduleCenter />;
      case "task-entry":
        return <TaskEntry />;

      default:
        return null;
    }
  };

  return (
    <>
      <Menu mode="horizontal" className="flex justify-start border-0 px-4 py-2">
        <Dropdown
          overlay={<Menu items={items} onClick={handleMenuClick} />}
          trigger={["hover"]}
        >
          <Item
            key="activity"
            className="text-red-500 cursor-pointer"
            onClick={() => setActiveTab("activity")}
          >
            Activity
            <DownOutlined className="ml-2" />
          </Item>
        </Dropdown>
        <Item
          key="performance"
          disabled
          className="text-red-500 cursor-pointer"
          onClick={() => setActiveTab("performance")}
        >
          Performance
        </Item>
        <Item
          key="contact"
          disabled
          className="text-red-500 cursor-pointer"
          onClick={() => setActiveTab("contact")}
        >
          Contact
        </Item>
        <Item
          key="document"
          className="text-red-500 cursor-pointer"
          onClick={() => setActiveTab("document")}
        >
          Document
        </Item>
        <Item
          key="reward"
          disabled
          className="text-red-500 cursor-pointer"
          onClick={() => setActiveTab("reward")}
        >
          Reward
        </Item>
      </Menu>
      <div className="">{renderContent()}</div>
    </>
  );
};

export default SalesTabs;
