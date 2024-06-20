import React, { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const EditUser = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [role, setRole] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "https://iglo-cms-api.xyz/api/user-manage/create"
        );
        if (Array.isArray(response.data.roles)) {
          setRole(response.data.roles);
        } else {
          console.error("Unexpected data format:", response.data);
          message.error("Failed to fetch roles: unexpected data format");
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error.message);
        message.error("Failed to fetch roles: " + error.message);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          ` https://iglo-cms-api.xyz/api/user-manages/${id}/edit`
        );
        setUser(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error.message);
        message.error("Failed to fetch user: " + error.message);
      }
    };

    fetchRoles();
    fetchUser();
  }, [id, form]);

  const handleImageChange = (info) => {
    const { file } = info;
    setFile(file);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    if (file) {
      formData.append("foto", file);
    }
    formData.append("nama", values.nama);
    formData.append("id_karyawan", values.id_karyawan);
    formData.append("email", values.email);
    formData.append("telepon", values.telepon);
    formData.append("id_role", values.id_role);

    try {
      const response = await axios.post(
        `https://iglo-cms-api.xyz/api/user-manages/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status) {
        message.success("User updated successfully!");
        navigate("/usermanage");
      }
    } catch (error) {
      console.error("There was an error updating the user!", error);
      message.error("Error submitting form: " + error.message);
      setTimeout(() => {
        message.destroy();
      }, 3000);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Form submission failed. Please check your inputs.");
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full bg-red-50">
        <TopNav />
        <div className="my-8 mx-10">
          <h1 className="text-2xl font-bold mb-4">Edit Data</h1>
          <Form
            form={form}
            name="editData"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="bg-white p-8 rounded-lg"
            encType="multipart/form-data"
          >
            <Form.Item
              label="Foto"
              name="foto"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
            >
              <Upload
                name="foto"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleImageChange}
              >
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="avatar"
                    className="rounded-md object-cover overflow-hidden"
                  />
                ) : (
                  user &&
                  user.foto && (
                    <img
                      src={user.foto}
                      alt="avatar"
                      className="rounded-md object-cover overflow-hidden"
                    />
                  )
                )}
                {!file && !user?.foto && (
                  <div>
                    <UploadOutlined />
                    <div className="mt-2">Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              label="Nama"
              name="nama"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Employee ID"
              name="id_karyawan"
              rules={[
                { required: true, message: "Please input your employee ID!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="telepon"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Role"
              name="id_role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select placeholder="Select a role">
                {role.map((roles) => (
                  <Option key={roles.id} value={roles.id}>
                    {roles.nama_role}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item className="flex items-center justify-end">
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

export default EditUser;
