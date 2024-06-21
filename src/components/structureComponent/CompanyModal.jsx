import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";

const CompanyModal = ({ visible, onCreate, onCancel, departments }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={visible}
      title="Add a new department"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="departmentName"
          label="Department Name"
          rules={[
            {
              required: true,
              message: "Please input the name of the department!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="parentDepartment" label="Parent Department">
          <Select allowClear>
            {departments.map((dept) => (
              <Select.Option key={dept.id} value={dept.id}>
                {dept.nama_department}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CompanyModal;
