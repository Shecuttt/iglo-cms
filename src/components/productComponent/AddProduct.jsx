import React, { useState, useEffect } from "react";
import { Form, Input, Upload, Select, Button, message, Breadcrumb } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import TopNav from "../TopNav";

const { Option } = Select;
const { TextArea } = Input;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageFileList, setImageFileList] = useState([]);
  const [types, setTypes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [responsible, setResponsible] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://iglo-cms-api.xyz/api/product/create"
        );
        const { types, companies, userManages } = response.data;

        setTypes(types);
        setCompanies(companies);
        setResponsible(userManages);
      } catch (error) {
        message.error("Failed to fetch data");
      }
    };

    fetchData();
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

      // Append image file
      if (imageFileList.length > 0) {
        formData.append("image", imageFileList[0].originFileObj);
      }

      // Append other form data
      formData.append("nama", values.nama);
      formData.append("versi", values.versi);
      formData.append("id_tipe", values.type); // Assuming 'type' corresponds to 'id_tipe'
      formData.append("id_company", values.companies); // Assuming 'companies' corresponds to 'id_company'
      formData.append("deskripsi", values.deskripsi);
      formData.append("id_um", values.responsible); // Assuming 'responsible' corresponds to 'id_um'

      // Append document files
      fileList.forEach((file) => {
        formData.append("files[]", file.originFileObj);
      });

      const response = await axios.post(
        "https://iglo-cms-api.xyz/api/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success("Product added successfully");
      navigate("/products"); // Redirect to the products list page after successful addition
    } catch (error) {
      console.error("Failed to submit form:", error);
      if (error.response && error.response.data) {
        console.error("Error response:", error.response.data);
        message.error(`Failed to submit form: ${error.response.data}`);
      } else {
        message.error("Complete the form!");
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full bg-red-50">
        <TopNav />
        <div className="my-8 mx-10">
          <Breadcrumb
            items={[
              {
                title: <Link to="/">Home</Link>,
              },
              {
                title: <Link to={"/productmanage"}>Product Management</Link>,
              },
              {
                title: <span>Add Product</span>,
              },
            ]}
            className="mb-4"
          />
          <h1 className="text-2xl font-bold mb-4">Add Product</h1>
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Image"
              name="image"
              className="flex-1"
              rules={[{ required: true, message: "Please upload an image" }]}
            >
              <Upload
                listType="picture-card"
                fileList={imageFileList}
                onChange={handleImageChange}
                beforeUpload={() => false}
              >
                {imageFileList.length === 0 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <div className="flex gap-4 mb-4">
              <Form.Item
                label="Name"
                name="nama"
                className="flex-1"
                rules={[{ required: true, message: "Please input name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Version"
                name="versi"
                className="flex-1"
                rules={[{ required: true, message: "Please input version" }]}
              >
                <Input />
              </Form.Item>
            </div>

            <div className="flex gap-4 mb-4">
              <Form.Item
                label="Type"
                name="type"
                className="flex-1"
                rules={[{ required: true, message: "Please select type" }]}
              >
                <Select>
                  {types.map((type) => (
                    <Option key={type.id} value={type.id}>
                      {type.nama_tipe}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Company Name"
                name="companies"
                className="flex-1"
                rules={[
                  { required: true, message: "Please select company name" },
                ]}
              >
                <Select>
                  {companies.map((company) => (
                    <Option key={company.id} value={company.id}>
                      {company.nama_company}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              label="Description"
              name="deskripsi"
              rules={[{ required: true, message: "Please input description" }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Responsible"
              name="responsible"
              rules={[
                { required: true, message: "Please select responsible person" },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {responsible.map((userManage) => (
                  <Option key={userManage.id} value={userManage.id}>
                    {userManage.nama}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Documents"
              name="files"
              rules={[{ required: true, message: "Please upload documents" }]}
            >
              <Upload
                multiple
                fileList={fileList}
                onChange={handleFileChange}
                beforeUpload={() => false}
                listType="picture"
              >
                <Button icon={<PlusOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
