import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";

const CompanyModal = ({ visible, onCreate, onCancel, departments }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={visible}
            title="Create a new department"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
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
                <Form.Item name="departmentName" label="Department Name" rules={[{ required: true, message: "Please input the name of the department!" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="parentDepartment" label="Parent Department">
                    <Select allowClear>
                        <Select.Option value="">Company</Select.Option>
                        {departments.map((dept) => (
                            <Select.Option key={dept.id} value={dept.id}>
                                {dept.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CompanyModal;
