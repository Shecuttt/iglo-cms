import React, { useState } from "react";
import { Breadcrumb, Button, Table, Popconfirm, message, Modal } from "antd";
import {
  PlusOutlined,
  SettingOutlined,
  FilterOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import AddPersonalCustomerForm from "./AddPersonalCustomerForm";
import AddCorporateCustomerForm from "./AddCorporateCustomerForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const CustomerList = () => {
  // State untuk menangani data tabel
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      no: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      status: "Aktif",
    },
    {
      key: "2",
      no: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "9876543210",
      status: "Nonaktif",
    },
    // Tambahkan data customer lainnya sesuai kebutuhan
  ]);

  // State untuk modal tambah customer
  const [selectModalVisible, setSelectModalVisible] = useState(false);
  const [personalModalVisible, setPersonalModalVisible] = useState(false);
  const [corporateModalVisible, setCorporateModalVisible] = useState(false);

  // Handlers untuk modal tambah customer
  const handleAddCustomer = () => {
    setSelectModalVisible(true);
  };

  const handleCustomerTypeSelect = (type) => {
    setSelectModalVisible(false);
    if (type === "Personal") {
      setPersonalModalVisible(true);
    } else if (type === "Corporate") {
      setCorporateModalVisible(true);
    }
  };

  const handleCancel = (type) => {
    if (type === "select") {
      setSelectModalVisible(false);
    } else if (type === "personal") {
      setPersonalModalVisible(false);
    } else if (type === "corporate") {
      setCorporateModalVisible(false);
    }
  };

  const handleCreatePersonalCustomer = (values) => {
    const newData = {
      key: (dataSource.length + 1).toString(),
      no: (dataSource.length + 1).toString(),
      ...values,
    };
    setDataSource([...dataSource, newData]);
    setPersonalModalVisible(false);
    message.success(`Personal Customer ${values.name} added successfully`);
  };

  const handleCreateCorporateCustomer = (values) => {
    const newData = {
      key: (dataSource.length + 1).toString(),
      no: (dataSource.length + 1).toString(),
      ...values,
    };
    setDataSource([...dataSource, newData]);
    setCorporateModalVisible(false);
    message.success(`Corporate Customer ${values.name} added successfully`);
  };

  // Column configuration untuk tabel
  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span
          className={`capitalize rounded-full py-2 px-4 ${
            text === "Aktif" || text === "aktif"
              ? "bg-green-200 hover:bg-green-400 text-green-800"
              : text === "Nonaktif" || text === "nonaktif"
              ? "bg-red-200 hover:bg-red-400 text-red-800"
              : ""
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex items-center space-x-2">
          <button className="rounded-full text-white bg-blue-600 hover:bg-blue-800 active:text-blue-600 active:bg-white flex items-center">
            <FontAwesomeIcon icon={faEye} className="p-2 items-center" />
          </button>
          <button className="rounded-full text-white bg-green-600 hover:bg-green-800 active:text-green-600 active:bg-white flex items-center">
            <FontAwesomeIcon icon={faPenToSquare} className="p-2" />
          </button>
          <button className="rounded-full text-white bg-red-600 hover:bg-red-800 active:text-red-600 active:bg-white flex items-center">
            <FontAwesomeIcon icon={faTrash} className="p-2" />
          </button>
        </div>
      ),
    },
  ];

  // Handler untuk aksi pada tombol Action (Read, Edit, Delete)
  const handleAction = (action, record) => {
    switch (action) {
      case "read":
        // Aksi untuk membaca detail customer
        message.info(`Read customer ${record.name}`);
        break;
      case "edit":
        // Aksi untuk mengedit customer
        message.info(`Edit customer ${record.name}`);
        break;
      case "delete":
        // Aksi untuk menghapus customer
        const newData = dataSource.filter((item) => item.key !== record);
        setDataSource(newData);
        message.success(`Customer ${record.name} deleted successfully`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-8">
      <Breadcrumb style={{ marginBottom: "16px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Customer List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex justify-end space-x-2 mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddCustomer}
        >
          Add Customer
        </Button>
        <Button icon={<SettingOutlined />} style={{ marginLeft: "8px" }}>
          Setting
        </Button>
        <Button icon={<FilterOutlined />} style={{ marginLeft: "8px" }}>
          Filter
        </Button>
        <Button icon={<ExportOutlined />} style={{ marginLeft: "8px" }}>
          Export
        </Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10 }} // Pengaturan pagination
        onChange={(pagination, filters, sorter) => {
          console.log("pagination:", pagination);
          console.log("filters:", filters);
          console.log("sorter:", sorter);
          // Logika sorting bisa ditambahkan di sini
        }}
      />
      <Modal
        title="Select Customer Type"
        open={selectModalVisible}
        onCancel={() => handleCancel("select")}
        footer={[
          <Button
            key="personal"
            onClick={() => handleCustomerTypeSelect("Personal")}
          >
            Personal
          </Button>,
          <Button
            key="corporate"
            onClick={() => handleCustomerTypeSelect("Corporate")}
          >
            Corporate
          </Button>,
        ]}
      >
        <p>Please select customer type:</p>
      </Modal>
      <AddPersonalCustomerForm
        visible={personalModalVisible}
        onCancel={() => handleCancel("personal")}
        onCreate={handleCreatePersonalCustomer}
      />
      <AddCorporateCustomerForm
        visible={corporateModalVisible}
        onCancel={() => handleCancel("corporate")}
        onCreate={handleCreateCorporateCustomer}
      />
    </div>
  );
};

export default CustomerList;
