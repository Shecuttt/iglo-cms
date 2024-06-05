import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import BackButton from "../components/BackButton";
import axios from "axios";
import { Form, Input, Select, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const { Option } = Select;

const EditUser = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fileList, setFileList] = useState([]);

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

    const onFinish = (values) => {
        setLoading(true);
        if (fileList.length > 0) {
            values.foto = fileList[0].originFileObj;
        }
        axios
            .put(`http://localhost:3001/userlist/${id}`, values)
            .then(() => {
                setLoading(false);
                Swal.fire({
                    title: "Success",
                    text: "User updated successfully",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    history.push("/usermanage");
                });
            })
            .catch((error) => {
                setLoading(false);
                console.error("There was an error updating the user!", error);
                Swal.fire({
                    title: "Error",
                    text: "There was an error updating the user",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e.fileList;
    };

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
        reader.onerror = (error) => console.log("Error: ", error);
    };

    const handleImageChange = (info) => {
        try {
            const fileList = info.fileList || [];
            setFileList(fileList); // Pastikan fileList selalu berupa array
            if (fileList.length > 0 && (info.file.status === "done" || info.file.status === "uploading")) {
                getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl));
            }
        } catch (error) {
            console.error("An error occurred while handling image change:", error);
            // Handle error, such as displaying an error message to the user
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
                <div className="px-10 py-4">
                    <Form form={form} layout="vertical" className="bg-white p-8 rounded-lg" onFinish={onFinish}>
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
                        <Form.Item label="Nama" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
                            <Input className="capitalize" />
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
                        <Form.Item className="flex items-center justify-end">
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </main>
        </div>
    );
};

export default EditUser;
