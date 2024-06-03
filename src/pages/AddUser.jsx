import React, { useContext, useState } from "react";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import { Form, Input, Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const { Option } = Select;

const AddUser = () => {
    const [imageUrl, setImageUrl] = useState("");
    const { addUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleImageChange = ({ fileList }) => {};

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const onFinish = (values) => {
        values.foto = imageUrl;
        addUser(values);
        navigate("/usermanage");
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            {/* Main */}
            <main className="w-full bg-red-50">
                <TopNav />
                <div className="my-8 mx-10">
                    <h1 className="text-2xl font-bold mb-4 ">Add Data</h1>
                    <Form name="addData" onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" className="bg-white p-8 rounded-lg">
                        <Form.Item className="" label="Foto" name="foto" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                showUploadList={false}
                                beforeUpload={(file) => {
                                    getBase64(file, (url) => setImageUrl(url));
                                    return false; // Prevent default upload behavior
                                }}
                                onChange={handleImageChange}
                            >
                                {imageUrl ? (
                                    <img src={imageUrl} alt="avatar" className="rounded-md object-cover overflow-hidden" />
                                ) : (
                                    <div>
                                        <UploadOutlined />
                                        <div className="mt-2">Upload</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                        <Form.Item label="Nama" name="nama" rules={[{ required: true, message: "Please input your name!" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Employee ID" name="employeeId" rules={[{ required: true, message: "Please input your employee ID!" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: "Please input your phone number!" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please select a role!" }]}>
                            <Select placeholder="Select a role">
                                <Option value="admin">Admin</Option>
                                <Option value="super admin">Super Admin</Option>
                                <Option value="user">User</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select a status!" }]}>
                            <Select placeholder="Select a status">
                                <Option value="active">Active</Option>
                                <Option value="inactive">Inactive</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </main>
        </div>
    );
};

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

export default AddUser;
