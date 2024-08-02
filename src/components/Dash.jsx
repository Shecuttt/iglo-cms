import {
  faBagShopping,
  faBriefcase,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Calendar, Card, Progress, Table, Timeline } from "antd";
import React from "react";

const cardTitle = [
  {
    id: 1,
    title: "Customers",
    text: "Last one week",
    value: 2345,
    icon: faUser,
  },
  {
    id: 2,
    title: "Sales",
    text: "Over 1 company",
    value: 56,
    icon: faBagShopping,
  },
  {
    id: 3,
    title: "Companies",
    text: "Work together with",
    value: 100,
    icon: faBriefcase,
  },
  {
    id: 4,
    title: "Orders",
    text: "All customers",
    value: 123,
    icon: faMessage,
  },
];

const activity = [
  {
    id: 1,
    color: "gray",
    children: "Finished task 1",
  },
  {
    id: 2,
    color: "gray",
    children: "New task 2",
  },
  {
    id: 3,
    children: "In progress task",
  },
];

const columns = [
  {
    title: "No",
    dataIndex: "no",
    key: "no",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text) => <p>{text}</p>,
  },
];

const dataTable = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
  },
  {
    id: 3,
    name: "Alice Doe",
    email: "alice.doe@example.com",
  },
  {
    id: 4,
    name: "Bob Doe",
    email: "bob.doe@example.com",
  },
];

const Dash = () => {
  return (
    <div className="p-8 space-y-4">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 lg:w-1/2">
          {cardTitle.map((card) => (
            <Card hoverable className="flex-1" key={card.id}>
              <div className="flex-row lg:flex-col flex-1">
                <div className="lg:flex items-center lg:justify-between">
                  <div className="lg:flex-row items-center">
                    <h1 className="text-xl lg:text-xl font-semibold">
                      {card.title}
                    </h1>
                    <p className="font-normal text-sm text-gray-400">
                      {card.text}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={card.icon}
                    className="hidden lg:flex p-2 rounded-md bg-slate-700 text-md text-white"
                  />
                </div>
                <div className="flex justify-end lg:justify-start items-center lg:mt-8">
                  <h1 className="text-2xl lg:text-4xl font-semibold">
                    {card.value}
                  </h1>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="lg:w-1/2 hidden lg:flex">
          <Card hoverable>
            <Calendar fullscreen={false} />
          </Card>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0">
        <Card>
          <div className="flex lg:flex-col-reverse gap-4 items-center justify-between">
            <Progress className="flex" type="circle" percent={85} />
            <h1 className="text-2xl lg:text-lg font-bold text-right">
              Task Entry Progress
            </h1>
          </div>
          <div className="flex flex-col mt-3">
            <p className="text-sm font-normal text-gray-600">
              Total tasks: 100
            </p>
            <Progress percent={85} showInfo={false} format={() => "belum"} />
            <Progress percent={15} strokeColor={"red"} showInfo={false} />
          </div>
        </Card>
        <Card className="flex-1">
          <Table
            className="overflow-x-auto"
            columns={columns}
            dataSource={dataTable}
            pagination={false}
          />
        </Card>
        <Card>
          <div className="flex flex-col gap-8 items-center justify-center">
            <h1 className="text-2xl lg:text-lg font-bold text-right">
              Recent Activity
            </h1>
            <Timeline items={activity} key={activity.id} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dash;
