import React, { useState } from "react";
import {
  Layout,
  Menu,
  Table,
  Input,
  Space,
  Modal,
  Form,
  Select,
  DatePicker,
  Button,
  Checkbox,
} from "antd";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import moment from "moment";

const { Sider, Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;

const Activity = () => {
  const [selectedMenu, setSelectedMenu] = useState("Proposal");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();
  const [formDetail] = Form.useForm();

  const handleMenuClick = ({ key }) => {
    setSelectedMenu(key);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreate = () => {
    // Handle create logic here
    console.log("Create form values: ", form.getFieldsValue());
    setIsModalVisible(false);
  };

  const showDetailModal = (record) => {
    // Convert date strings to moment objects
    const recordWithMomentDates = {
      ...record,
      start: moment(record.start),
      end: moment(record.end),
    };
    setSelectedRecord(recordWithMomentDates);
    formDetail.setFieldsValue(recordWithMomentDates);
    setIsDetailModalVisible(true);
  };

  const handleDetailCancel = () => {
    setIsDetailModalVisible(false);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Delete record: ", selectedRecord);
    setIsDetailModalVisible(false);
  };

  const handleSubmit = () => {
    // Handle submit logic here
    console.log("Submit form values: ", formDetail.getFieldsValue());
    setIsDetailModalVisible(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Start Date",
      dataIndex: "start",
      key: "start",
    },
    {
      title: "End Date",
      dataIndex: "end",
      key: "end",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
    },
    {
      title: "Responsible",
      dataIndex: "responsible",
      key: "responsible",
    },
  ];

  const data = [
    {
      key: "1",
      id: "001",
      start: "2024-06-01",
      end: "2024-06-10",
      title: "Campaign 1",
      product: "Product A",
      target: "$1000",
      responsible: "John Doe",
    },
    // Add more data as needed
  ];

  const productColumns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "New Customer",
      dataIndex: "newCustomer",
      key: "newCustomer",
      render: (text, record) => (
        <Checkbox checked={record.newCustomer}></Checkbox>
      ),
    },
  ];

  const productData = [
    {
      key: "1",
      product: "Product A",
      amount: 100,
      newCustomer: true,
    },
    {
      key: "2",
      product: "Product B",
      amount: 200,
      newCustomer: false,
    },
    // Add more data as needed
  ];

  const totalAmount = productData.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <Layout className="p-2 rounded-md">
      <Sider width={144} className="min-h-screen overflow-hidden">
        <Menu
          mode="inline"
          defaultSelectedKeys={["Proposal"]}
          className="h-full shadow"
          onClick={handleMenuClick}
        >
          <Menu.Item key="Create" onClick={showModal}>
            Create
          </Menu.Item>
          <Menu.Item key="Proposal">Proposal</Menu.Item>
          <Menu.Item key="Portfolio">Portfolio</Menu.Item>
          <Menu.Item key="Invoice">Invoice</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="p-6">
        <Content className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{selectedMenu}</h2>
          {selectedMenu == "Proposal" ? (
            <>
              <Space className="mb-4 flex justify-end">
                <button className="bg-red-700 text-white py-2 px-4 rounded flex items-center">
                  <PlusOutlined className="" />
                </button>
                <button className="bg-red-700 text-white py-2 px-4 rounded flex items-center">
                  <SettingOutlined className="" />
                </button>
                <Search
                  placeholder="Search..."
                  onSearch={(value) => console.log(value)}
                  enterButton
                />
              </Space>
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
                style={{ fontSize: 12, lineHeight: 16 }}
                className="text-xs"
                onRow={(record) => {
                  return {
                    onDoubleClick: () => showDetailModal(record),
                  };
                }}
              />
              <Modal
                title="Proposal Details"
                open={isDetailModalVisible}
                onCancel={handleDetailCancel}
                footer={null}
              >
                <Form form={formDetail} layout="vertical">
                  <Form.Item label="Code" name="id">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item label="Title" name="title">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Start Date" name="start">
                    <DatePicker />
                  </Form.Item>
                  <Form.Item label="End Date" name="end">
                    <DatePicker />
                  </Form.Item>
                  <Form.Item label="Product" name="product">
                    <Select>
                      <Option value="Product A">Product A</Option>
                      <Option value="Product B">Product B</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Target" name="target">
                    <Input prefix="$" />
                  </Form.Item>
                  <Form.Item label="Responsible" name="responsible">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Description" name="description">
                    <TextArea rows={4} />
                  </Form.Item>
                  <Form.Item label="Client" name="client">
                    <Input />
                  </Form.Item>
                  <div className="flex justify-end mt-4">
                    <Button
                      type="danger"
                      className="mr-2"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                    <Button type="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </div>
                </Form>
              </Modal>
            </>
          ) : selectedMenu == "Create" ? (
            <>
              <Modal
                title="Create New Entry"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
              >
                <Form form={form} layout="vertical">
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      { required: true, message: "Please input the name!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Type"
                    name="type"
                    rules={[
                      { required: true, message: "Please select the type!" },
                    ]}
                  >
                    <Select>
                      <Option value="Type1">Type 1</Option>
                      <Option value="Type2">Type 2</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Plan"
                    name="plan"
                    rules={[
                      { required: true, message: "Please select the plan!" },
                    ]}
                  >
                    <Select mode="tags" placeholder="Select or type">
                      <Option value="Plan1">Plan 1</Option>
                      <Option value="Plan2">Plan 2</Option>
                    </Select>
                  </Form.Item>
                  <div className="flex justify-evenly">
                    <Form.Item
                      label="Start Date"
                      name="startDate"
                      rules={[
                        {
                          required: true,
                          message: "Please select the start date!",
                        },
                      ]}
                    >
                      <DatePicker />
                    </Form.Item>
                    <Form.Item
                      label="End Date"
                      name="endDate"
                      rules={[
                        {
                          required: true,
                          message: "Please select the end date!",
                        },
                      ]}
                    >
                      <DatePicker />
                    </Form.Item>
                  </div>
                  <Form.Item
                    label="Deal Type"
                    name="dealType"
                    rules={[
                      {
                        required: true,
                        message: "Please select the deal type!",
                      },
                    ]}
                  >
                    <Select>
                      <Option value="DealType1">Deal Type 1</Option>
                      <Option value="DealType2">Deal Type 2</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Client">
                    <Input.Group className="flex flex-col space-y-4 border rounded-lg p-4">
                      <Form.Item
                        name={["client", "contact"]}
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: "Please input the contact!",
                          },
                        ]}
                      >
                        <Search
                          placeholder="Contact"
                          onSearch={(value) => console.log(value)}
                        />
                      </Form.Item>
                      <Form.Item
                        name={["client", "company"]}
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: "Please input the company!",
                          },
                        ]}
                      >
                        <Search
                          placeholder="Company"
                          onSearch={(value) => console.log(value)}
                        />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                  <Form.Item
                    label="Responsible"
                    name="responsible"
                    rules={[
                      {
                        required: true,
                        message: "Please input the responsible person!",
                      },
                    ]}
                  >
                    <Search
                      placeholder="Responsible"
                      onSearch={(value) => console.log(value)}
                    />
                  </Form.Item>
                  <Table
                    columns={productColumns}
                    dataSource={productData}
                    pagination={false}
                    footer={() => (
                      <div className="flex justify-end">
                        <strong>Total Amount: ${totalAmount}</strong>
                      </div>
                    )}
                  />
                  <div className="flex justify-end mt-4">
                    <Button
                      type="primary"
                      className="mr-2"
                      onClick={handleCreate}
                    >
                      Send to Head
                    </Button>
                    <Button
                      type="primary"
                      className="mr-2"
                      onClick={handleCreate}
                    >
                      Create
                    </Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                  </div>
                </Form>
              </Modal>
            </>
          ) : selectedMenu == "Portfolio" ? (
            <div>portfolio</div>
          ) : (
            <>
              <div>invoice</div>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Activity;
