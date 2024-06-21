import React from "react";
import {
  Layout,
  Form,
  Input,
  DatePicker,
  Table,
  Checkbox,
  Select,
  Button,
} from "antd";
import moment from "moment";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported

const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Plans = () => {
  const onFinish = (values) => {
    console.log("Received values from form: ", values);
  };

  const handleTargetChange = (value, index) => {
    console.log(`Changed target for index ${index} to: `, value);
  };

  const handleMonthChange = (value, key, month) => {
    console.log(`Changed ${month} for key ${key} to: `, value);
  };

  const targetColumns = [
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
      render: (text, record, index) => (
        <Input
          defaultValue={text}
          onChange={(e) => handleTargetChange(e.target.value, index)}
        />
      ),
      fixed: "left",
      width: 100,
    },
    ...moment.months().map((month, index) => ({
      title: month.slice(0, 3),
      dataIndex: month.toLowerCase(),
      key: month.toLowerCase(),
      render: (text, record, i) => (
        <Input
          defaultValue={text}
          onChange={(e) =>
            handleMonthChange(e.target.value, record.key, month.toLowerCase())
          }
        />
      ),
      width: 80,
    })),
    {
      title: "Carry Over",
      dataIndex: "carryOver",
      key: "carryOver",
      render: (text, record) => <Checkbox defaultChecked={text} />,
      fixed: "right",
      width: 100,
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      render: (text, record) => (
        <Select defaultValue={text} style={{ width: "100%" }}>
          <Option value="Monthly">Monthly</Option>
          <Option value="Quarterly">Quarterly</Option>
          <Option value="Yearly">Yearly</Option>
        </Select>
      ),
      fixed: "right",
      width: 120,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record) => <Input prefix="$" defaultValue={text} />,
      fixed: "right",
      width: 100,
    },
  ];

  const dataSource = [
    {
      key: "money",
      target: "Money",
      ...moment.months().reduce((acc, month) => {
        acc[month.toLowerCase()] = 0;
        return acc;
      }, {}),
      carryOver: false,
      frequency: "Monthly",
      total: 0,
    },
    {
      key: "quantity",
      target: "Quantity",
      ...moment.months().reduce((acc, month) => {
        acc[month.toLowerCase()] = 0;
        return acc;
      }, {}),
      carryOver: false,
      frequency: "Monthly",
      total: 0,
    },
  ];

  return (
    <Layout className="p-6 max-w-screen-lg overflow-x-hidden">
      <Content className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Plans</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Sales Name"
            name="salesName"
            rules={[{ required: true, message: "Please input sales name!" }]}
            className="w-1/3"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Plan Name"
            name="planName"
            rules={[{ required: true, message: "Please input plan name!" }]}
            className="w-1/3"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Active Period"
            name="activePeriod"
            rules={[
              { required: true, message: "Please select active period!" },
            ]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true, message: "Please input product name!" }]}
            className="w-1/3"
          >
            <Input />
          </Form.Item>
          <h3 className="text-lg font-bold mb-3">Target for 12 Months</h3>
          <Table
            columns={targetColumns}
            dataSource={dataSource}
            pagination={false}
            className="mb-4"
            bordered
            scroll={{ x: 1500 }}
          />
          <div className="flex justify-end">
            <Button type="primary" className="mr-2">
              Request Revision
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Content>
    </Layout>
  );
};

export default Plans;
