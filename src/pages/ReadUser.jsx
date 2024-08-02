import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, Input, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Layout from "../components/Layout";

const { Option } = Select;

const ReadUser = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(
          `http://iglo-cms-api.xyz/api/user-manages/${id}`
        );
        form.setFieldsValue(userResponse.data);
        if (userResponse.data.foto) {
          setImageUrl(userResponse.data.foto);
        }
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the user!", error);
      }
    };

    const fetchRole = async () => {
      try {
        const roleResponse = await axios.get(
          "http://iglo-cms-api.xyz/api/user-manage/create"
        );
        if (Array.isArray(roleResponse.data.roles)) {
          setRole(roleResponse.data.roles);
        } else {
          console.error("Unexpected data format:", roleResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error.message);
      }
    };

    fetchUser();
    fetchRole();
  }, [id, form]);

  return (
    <Layout>
      <div className="my-8 mx-10">
        <Form form={form} layout="vertical" className="bg-white p-8 rounded-lg">
          <Form.Item label="Foto" className="flex items-center justify-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="foto"
                className="rounded-md object-cover overflow-hidden w-32 h-32"
              />
            ) : (
              <div>
                <UploadOutlined />
                <div className="mt-2 italic">No Image</div>
              </div>
            )}
          </Form.Item>
          <Form.Item label="Nama" name="nama">
            <Input className="capitalize" disabled />
          </Form.Item>
          <Form.Item label="Employee ID" name="id_karyawan">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Phone Number" name="telepon">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Role" name="nama_role">
            <Select placeholder="Select a role" disabled>
              {role.nama_role}
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
    </Layout>
  );
};

export default ReadUser;
