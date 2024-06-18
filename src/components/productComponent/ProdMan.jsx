import React, { useState, useEffect, useRef } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import ModalComponent from "./ModalComponent";
import EditProductModal from "./EditProductModal";

const ProdMan = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const contextMenuOverlay = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://iglo-cms-api.xyz/api/product");
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Expected an array of products");
        }
        message.success("Data fetched successfully!");
      } catch (error) {
        console.error("There was an error fetching the data!", error);
        message.error("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleProductUpdated = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setEditModalOpen(false);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://iglo-cms-api.xyz/api/product/${productId}`);
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
      message.success("Product deleted successfully!");
    } catch (error) {
      console.error("Failed to delete product:", error);
      message.error("Failed to delete product.");
    }
  };

  const columns = [
    {
      title: "Logo",
      dataIndex: "image",
      key: "image",
      render: (text) =>
        text ? (
          <img
            src={text}
            alt="Product"
            className="w-12 h-12 overflow-hidden object-cover rounded-full"
          />
        ) : null,
    },
    {
      title: "Product Name",
      dataIndex: "nama",
      key: "nama",
      sorter: (a, b) => a.nama.localeCompare(b.nama),
    },
    {
      title: "Version",
      dataIndex: "versi",
      key: "versi",
      sorter: (a, b) => a.versi.localeCompare(b.versi),
    },
    {
      title: "Type",
      dataIndex: "type.nama_tipe",
      key: "type",
      sorter: (a, b) => a.type.nama_tipe.localeCompare(b.type.nama_tipe),
    },
    {
      title: "Description",
      dataIndex: "deskripsi",
      key: "deskripsi",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button.Group>
          <Button type="primary" onClick={() => handleEditProduct(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDeleteProduct(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </Button.Group>
      ),
    },
  ];

  return (
    <>
      <div className="p-8">
        <h1 className="font-bold text-red-800 text-xl uppercase">
          Product Management
        </h1>
      </div>
      <div className="mx-8 flex">
        <Button
          type="primary"
          onClick={() => setShowModal(true)}
          icon={<PlusOutlined />}
          style={{ marginBottom: 16 }}
        >
          Add Product
        </Button>
      </div>

      {/* Modal for adding a new product */}
      <ModalComponent
        open={showModal}
        onClose={() => setShowModal(false)}
        onProductAdded={handleProductAdded}
      />

      {/* Modal for editing an existing product */}
      {selectedProduct && (
        <EditProductModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          productData={selectedProduct}
          onProductUpdated={handleProductUpdated}
        />
      )}

      <div className="m-8">
        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          loading={loading}
        />
      </div>
    </>
  );
};

export default ProdMan;
