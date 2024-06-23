import React, { useState, useEffect } from "react";
import { Table, Button, message, Breadcrumb } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";

const ProdMan = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://iglo-cms-api.xyz/api/product"
        );
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Expected an array of products");
        }
      } catch (error) {
        console.error("There was an error fetching the data!", error);
        message.error("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Logo",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <>
          <img
            src={`https://iglo-cms-api.xyz/api/product/${record.image}`}
            alt={record.nama}
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Version",
      dataIndex: "versi",
      key: "versi",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (text, record) => record.company.nama_company,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text, record) => record.type.nama_tipe,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button
            type="link"
            onClick={() => navigate(`/productmanage/edit/${record.id}`)}
          >
            Detail
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="my-8 mx-10 p-4 bg-white rounded-lg">
      <Breadcrumb
        items={[
          {
            title: <Link to="/">Home</Link>,
          },
          {
            title: "Product Management",
          },
        ]}
        className="mb-4"
      />
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => navigate("/productmanage/add")}
        style={{ marginBottom: "20px" }}
      >
        Add Product
      </Button>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default ProdMan;
