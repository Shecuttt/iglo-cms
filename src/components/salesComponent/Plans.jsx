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

const { Content } = Layout;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Plans = () => {
  const onFinish = (values) => {
    console.log("Received values from form: ", values);
    // You can handle form submission here, e.g., save to backend
  };

  const targetColumns = [
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
      render: (text, record) => (
        <Input
          defaultValue={text}
          onChange={(e) => handleTargetChange(e.target.value, record.key)}
        />
      ),
    },
  ];

  const handleTargetChange = (value, key) => {
    // Handle target change for specific month (key)
    console.log(`Changed target for month ${key} to: `, value);
  };

  const months = moment.months().map((month, index) => ({
    key: index + 1,
    month,
    target: 0,
  }));

  return (
    <Layout className="p-6">
      <Content className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Plans</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Sales Name"
            name="salesName"
            rules={[{ required: true, message: "Please input sales name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Plan Name"
            name="planName"
            rules={[{ required: true, message: "Please input plan name!" }]}
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
          >
            <Input />
          </Form.Item>
          <h3 className="text-lg font-bold mb-2">Target for 12 Months</h3>
          <Table
            columns={targetColumns}
            dataSource={months}
            pagination={false}
            className="mb-4"
          />
          <Form.Item
            label="Carry Over"
            name="carryOver"
            valuePropName="checked"
          >
            <Checkbox>Carry Over</Checkbox>
          </Form.Item>
          <Form.Item
            label="Frequency"
            name="frequency"
            rules={[{ required: true, message: "Please select frequency!" }]}
          >
            <Select>
              <Option value="Monthly">Monthly</Option>
              <Option value="Quarterly">Quarterly</Option>
              <Option value="Yearly">Yearly</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Total" name="total">
            <Input prefix="$" />
          </Form.Item>
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
