import React from "react";
import { Layout, Menu, Table, Button, Input, Breadcrumb } from "antd";
import {
  UploadOutlined,
  FolderOutlined,
  FileOutlined,
  StarOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "tailwindcss/tailwind.css";

const { Header, Content, Sider } = Layout;

const Document = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Sharing",
      dataIndex: "sharing",
      key: "sharing",
    },
    {
      title: "Modified",
      dataIndex: "modified",
      key: "modified",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
  ];

  const data = [
    {
      key: "1",
      name: "expenses.doc",
      sharing: "User 1",
      modified: "12 Feb 2024",
      size: "27.4 Mb",
    },
    {
      key: "2",
      name: "Jampack.pdf",
      sharing: "User 2",
      modified: "10 Mar 2021",
      size: "20.6 Mb",
    },
    // Add more data rows as needed
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="h-auto">
        <div className="text-center py-4 bg-red-100">
          <button className="font-semibold bg-red-700 hover:bg-red-800 text-white rounded-lg py-2 px-4">
            <span className="mr-2">Upload</span>
            <UploadOutlined />
          </button>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100vh", borderRight: 0 }}
          className="bg-red-100 font-semibold"
        >
          <Menu.Item key="1" icon={<FileOutlined />}>
            All Files
          </Menu.Item>
          <Menu.Item key="2" icon={<FolderOutlined />}>
            Folders
          </Menu.Item>
          <Menu.Item key="3" icon={<FileOutlined />}>
            Shared
          </Menu.Item>
          <Menu.Item key="4" icon={<StarOutlined />}>
            Starred
          </Menu.Item>
          <Menu.Item key="5" icon={<DeleteOutlined />}>
            Trash
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Header className="bg-red-200 text-center">
          <Breadcrumb
            items={[
              {
                title: "My Space",
              },
            ]}
            className="mt-4 text-2xl font-bold"
          />
        </Header>
        <Content className="bg-red-50 p-6 m-4">
          <div className="flex justify-between mb-4">
            <Input
              placeholder="Search File and Folders"
              prefix={<SearchOutlined />}
              className="w-1/3"
            />
          </div>
          <Table columns={columns} dataSource={data} className="bg-white" />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Document;
