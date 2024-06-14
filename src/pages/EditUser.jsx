import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import BackButton from "../components/BackButton";
import axios from "axios";
import { Form, Input, Select, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const { Option } = Select;

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [role, setRole] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://iglo-cms-api.xyz/api/user-manages/${id}`
        );
        const user = response.data;
        setUserData(user);
        form.setFieldsValue(user); // Set form fields with user data
        if (user.foto) {
          setImageUrl(user.foto);
        }
      } catch (error) {
        console.error("There was an error fetching the user!", error);
      }
    };

    fetchData();
  }, [id, form]);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get(
          "http://iglo-cms-api.xyz/api/user-manage/create"
        );
        if (Array.isArray(response.data.roles)) {
          setRole(response.data.roles);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error.message);
      }
    };
    fetchRole();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    if (fileList.length > 0) {
      formData.append("foto", fileList[0].originFileObj);
    }
    formData.append("nama", values.nama);
    formData.append("id_karyawan", values.id_karyawan);
    formData.append("email", values.email);
    formData.append("telepon", values.telepon);
    formData.append("id_role", values.id_role);

    try {
      await axios.put(
        `http://iglo-cms-api.xyz/api/user-manages/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      Swal.fire({
        title: "Success",
        text: "User updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/usermanage");
      });
    } catch (error) {
      setLoading(false);
      console.error("There was an error updating the user!", error);
      Swal.fire({
        title: "Error",
        text: "There was an error updating the user",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleImageChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      setImageUrl(URL.createObjectURL(file));
    } else {
      setImageUrl(null);
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
          <Form
            form={form}
            layout="vertical"
            className="bg-white p-8 rounded-lg"
            onFinish={onFinish}
          >
            <Form.Item
              className=""
              label="Foto"
              name="foto"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                name="foto"
                listType="picture-card"
                fileList={fileList}
                showUploadList={false}
                beforeUpload={() => false} // Prevent default upload behavior
                onChange={handleImageChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    className="rounded-md object-cover overflow-hidden"
                  />
                ) : (
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
              <Input className="capitalize" />
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
              name="id_role" // Ensure this matches the user data structure
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
