import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import ModalComponent from "./ModalComponent";

const ProdMan = () => {
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/products");
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

    const columns = [
        {
            title: "Logo",
            dataIndex: "image",
            key: "image",
            render: (text) => (text ? <img src={text} alt="Product" className="w-12 h-12 overflow-hidden object-cover rounded-full" /> : null),
        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Version",
            dataIndex: "version",
            key: "version",
            sorter: (a, b) => a.version.localeCompare(b.version),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button type="primary" onClick={() => setShowModal(true)}>
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <>
            <div className="p-8">
                <h1 className="font-bold text-red-800 text-xl uppercase">Product Management</h1>
            </div>
            <div className="mx-8 flex">
                <Button type="primary" onClick={() => setShowModal(true)} icon={<PlusOutlined />}>
                    Add Product
                </Button>
            </div>
            <ModalComponent open={showModal} onClose={() => setShowModal(false)} onProductAdded={handleProductAdded} />
            <div className="m-8">
                <Table columns={columns} dataSource={products} rowKey="id" loading={loading} />
            </div>
        </>
    );
};

export default ProdMan;
