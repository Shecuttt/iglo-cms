import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Select, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;
const { TextArea } = Input;

const ModalComponent = ({ open, onClose, onProductAdded }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [imageFileList, setImageFileList] = useState([]);
    const [types, setTypes] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get("http://localhost:3001/types");
                setTypes(response.data);
            } catch (error) {
                message.error("Failed to fetch types");
            }
        };

        const fetchCompanies = async () => {
            try {
                const response = await axios.get("http://localhost:3001/companies");
                setCompanies(response.data);
            } catch (error) {
                message.error("Failed to fetch companies");
            }
        };

        fetchTypes();
        fetchCompanies();
    }, []);

    const handleImageChange = ({ fileList }) => {
        setImageFileList(fileList);
    };

    const handleFileChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();

            if (imageFileList.length > 0) {
                formData.append("image", imageFileList[0].originFileObj);
            }

            formData.append("name", values.name);
            formData.append("version", values.version);
            formData.append("type", values.type);
            formData.append("company", values.company);
            formData.append("description", values.description);
            formData.append("responsible", values.responsible);

            fileList.forEach((file) => {
                formData.append("documents", file.originFileObj);
            });

            const response = await axios.post("http://localhost:3001/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            onProductAdded(response.data);
            onClose();
        } catch (error) {
            console.error("Failed to submit form:", error);
            if (error.response && error.response.data) {
                message.error(`Failed to submit form: ${error.response.data}`);
            } else {
                message.error("Failed to submit form");
            }
        }
    };

    return (
        <Modal
            title="Add Product"
            open={open}
            onCancel={onClose}
            onOk={handleSubmit}
            footer={[
                <Button key="back" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Submit
                </Button>,
            ]}
        >
            <Form layout="vertical" form={form}>
                <Form.Item label="Image" name="image" className="flex-1" rules={[{ required: true, message: "Please upload an image" }]}>
                    <Upload listType="picture-card" fileList={imageFileList} onChange={handleImageChange} beforeUpload={() => false}>
                        {imageFileList.length === 0 && (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
                <div className="flex gap-4 mb-4">
                    <Form.Item label="Name" name="name" className="flex-1" rules={[{ required: true, message: "Please input name" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Version" name="version" className="flex-1" rules={[{ required: true, message: "Please input version" }]}>
                        <Input />
                    </Form.Item>
                </div>

                <div className="flex gap-4 mb-4">
                    <Form.Item label="Type" name="type" className="flex-1" rules={[{ required: true, message: "Please select type" }]}>
                        <Select>
                            {types.map((type) => (
                                <Option key={type.id} value={type.id}>
                                    {type.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Company Name" name="company" className="flex-1" rules={[{ required: true, message: "Please select company name" }]}>
                        <Select>
                            {companies.map((company) => (
                                <Option key={company.id} value={company.id}>
                                    {company.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input description" }]}>
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item label="Responsible" name="responsible" rules={[{ required: true, message: "Please select responsible person" }]}>
                    <Select showSearch placeholder="Select a person" optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        <Option value="person1">Person 1</Option>
                        <Option value="person2">Person 2</Option>
                        <Option value="person3">Person 3</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Documents" name="documents" rules={[{ required: true, message: "Please upload documents" }]}>
                    <Upload multiple fileList={fileList} onChange={handleFileChange} beforeUpload={() => false} listType="picture">
                        <Button icon={<PlusOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalComponent;
