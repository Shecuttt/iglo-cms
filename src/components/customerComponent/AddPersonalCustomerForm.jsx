import React from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";

const { Option } = Select;

const AddPersonalCustomerForm = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  const handleCreate = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      onCreate(values);
    });
  };

  return (
    <Modal
      open={visible}
      title="Add Personal Customer"
      okText="Add"
      onCancel={onCancel}
      onOk={handleCreate}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter customer name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter customer email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please enter customer phone number" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select customer status" }]}
        >
          <Select>
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPersonalCustomerForm;
