import React, { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, Input, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const ReadUser = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/userlist/${id}`)
            .then((response) => {
                form.setFieldsValue(response.data);
                if (response.data.foto) {
                    setImageUrl(response.data.foto);
                }
                setLoading(false);
            })
            .catch((error) => console.error("There was an error fetching the user!", error));
    }, [id, form]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
        reader.onerror = (error) => console.log("Error: ", error);
    };

    const handleImageChange = (info) => {
        if (info.file.status === "done") {
            getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl));
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            {/* Main */}
            <main className="w-full bg-red-50">
                <TopNav />
                <BackButton />
                <div className="my-8 mx-10">
                    <Form form={form} layout="vertical" className="bg-white p-8 rounded-lg">
                        <Form.Item label="Foto" className="flex items-center justify-center">
                            {imageUrl ? (
                                <img src={imageUrl} alt="avatar" className="rounded-md object-cover overflow-hidden w-32 h-32" />
                            ) : (
                                <div>
                                    <UploadOutlined />
                                    <div className="mt-2 italic">No Image</div>
                                </div>
                            )}
                        </Form.Item>
                        <Form.Item label="Nama" name="name">
                            <Input className="capitalize" disabled />
                        </Form.Item>
                        <Form.Item label="Employee ID" name="employeeId">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Phone Number" name="phoneNumber">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input.Password disabled />
                        </Form.Item>
                        <Form.Item label="Role" name="role">
                            <Select placeholder="Select a role" disabled>
                                <Option value="admin">Admin</Option>
                                <Option value="super admin">Super Admin</Option>
                                <Option value="user">User</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Status" name="status">
                            <Select placeholder="Select a status" disabled>
                                <Option value="active">Active</Option>
                                <Option value="inactive">Inactive</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </div>
            </main>
        </div>
    );
};

export default ReadUser;
