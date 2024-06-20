import React, { useState, useEffect } from "react";
import { Form, Input, Upload, Select, Button, message, Breadcrumb } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import TopNav from "../TopNav";
import Swal from "sweetalert2";

const { Option } = Select;
const { TextArea } = Input;

const EditProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageFileList, setImageFileList] = useState([]);
  const [types, setTypes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [responsible, setResponsible] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for companies, types, and responsible persons
        const response = await axios.get(
          "https://iglo-cms-api.xyz/api/product/create"
        );
        const { companies, types, userManages } = response.data;

        setCompanies(companies);
        setTypes(types);
        setResponsible(userManages);

        // Fetch product data for the given id
        const productResponse = await axios.get(
          `https://iglo-cms-api.xyz/api/product/${id}`
        );
        const productData = productResponse.data;

        // Handle cases where productData may not contain certain fields
        form.setFieldsValue({
          nama: productData.nama || "",
          versi: productData.versi || "",
          type: productData.id_tipe,
          company: productData.id_company,
          deskripsi: productData.deskripsi || "",
          responsible: productData.id_um,
        });

        // Set the initial file lists if they exist
        if (productData.image) {
          setImageFileList([
            {
              uid: "-1",
              name: productData.image.split("/").pop(),
              status: "done",
              url: `https://iglo-cms-api.xyz/${productData.image}`,
            },
          ]);
        }

        if (productData.documents) {
          setFileList(
            productData.documents.map((doc, index) => ({
              uid: index.toString(),
              name: doc.split("/").pop(),
              status: "done",
              url: `https://iglo-cms-api.xyz/${doc}`,
            }))
          );
        }
      } catch (error) {
        message.error("Failed to fetch data");
        console.error(error);
      }
    };

    fetchData();
  }, [id, form]);

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

      if (imageFileList.length > 0 && imageFileList[0].originFileObj) {
        formData.append("image", imageFileList[0].originFileObj);
      }

      formData.append("nama", values.nama);
      formData.append("versi", values.versi);
      formData.append("id_tipe", values.type);
      formData.append("id_company", values.company);
      formData.append("deskripsi", values.deskripsi);
      formData.append("id_um", values.responsible);

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("documents", file.originFileObj);
        }
      });

      await axios.put(`https://iglo-cms-api.xyz/api/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Product updated successfully");
      navigate("/products"); // Redirect to the products list page after successful update
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

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`https://iglo-cms-api.xyz/api/product/${id}`);
      message.success("Product deleted successfully!");
      navigate("/productmanage");
    } catch (error) {
      console.error("Failed to delete product:", error);
      message.error("Failed to delete product.");
    }
  };

  const showDeleteConfirm = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProduct();
      }
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full bg-red-50">
        <TopNav />
        <div className="p-8">
          <Breadcrumb
            items={[
              {
                title: <Link to={"/"}>Home</Link>,
              },
              {
                title: <Link to={"/productmanage"}>Product Manage</Link>,
              },
              {
                title: <span>Edit Product</span>,
              },
            ]}
          />
          <h1 className="my-4 text-2xl font-bold">Edit Product</h1>
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
                name="company"
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
              name="documents"
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
              <Button
                type="danger"
                onClick={showDeleteConfirm}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </Button>
            </Form.Item>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default EditProduct;
