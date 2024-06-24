import React, { useState } from "react";
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
import SalesTable from "./SalesTable";

const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Plans = () => {
  return (
    <Layout className="p-6 max-w-screen-lg overflow-x-hidden">
      <Content className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Plans</h2>
        <Form layout="vertical">
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
          <SalesTable />
          <div className="flex justify-end mt-4">
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
