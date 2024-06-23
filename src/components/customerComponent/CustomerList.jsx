import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Table,
  Modal,
  Dropdown,
  Menu,
  message,
} from "antd";
import {
  PlusOutlined,
  SettingOutlined,
  FilterOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AddCorporateCustomerForm from "./AddCorporateCustomerForm";
import EditCorporateForm from "./EditCorporateForm";
import ReadCorporateForm from "./ReadCorporateForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CustomerList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectModalVisible, setSelectModalVisible] = useState(false);
  const [personalModalVisible, setPersonalModalVisible] = useState(false);
  const [corporateModalVisible, setCorporateModalVisible] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [readModalVisible, setReadModalVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [readData, setReadData] = useState({});

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "https://iglo-cms-api.xyz/api/customers"
      );
      setDataSource(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setLoading(false);
    }
  };

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
    } else if (type === "edit") {
      setEditModalVisible(false);
    } else if (type === "read") {
      setReadModalVisible(false);
    }
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

  const handleEditCorporateCustomer = (values) => {
    const updatedData = dataSource.map((item) =>
      item.key === values.key ? { ...item, ...values } : item
    );
    setDataSource(updatedData);
    setEditModalVisible(false);
    message.success(`Corporate Customer ${values.name} updated successfully`);
  };

  const handleUpdate = (updatedCustomer) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.id === updatedCustomer.id ? updatedCustomer : item
      )
    );
    setEditModalVisible(false);
    message.success(`Corporate Customer ${values.name} updated successfully`);
  };

  const handleDeleteCorporateCustomer = (record) => {
    Swal.fire({
      title: `Are you sure you want to delete ${record.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Perform delete operation
          await axios.delete(
            `https://iglo-cms-api.xyz/api/customers/${record.id}`
          );
          const updatedData = dataSource.filter(
            (item) => item.id !== record.id
          );
          setDataSource(updatedData);
          Swal.fire("Deleted!", "The customer has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting customer:", error);
          Swal.fire("Failed!", "Failed to delete the customer.", "error");
        }
      }
    });
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Code Name", dataIndex: "code_name", key: "code_name" },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex items-center space-x-2">
          <button
            className="rounded-full text-white bg-blue-600 hover:bg-blue-800 active:text-blue-600 active:bg-white flex items-center"
            onClick={() => {
              setReadData(record);
              setReadModalVisible(true);
            }}
          >
            <FontAwesomeIcon icon={faEye} className="p-2 items-center" />
          </button>
          <button
            className="rounded-full text-white bg-green-600 hover:bg-green-800 active:text-green-600 active:bg-white flex items-center"
            onClick={() => {
              setEditData(record);
              setEditModalVisible(true);
            }}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="p-2 items-center"
            />
          </button>
          <button
            className="rounded-full text-white bg-red-600 hover:bg-red-800 active:text-red-600 active:bg-white flex items-center"
            onClick={() => handleDeleteCorporateCustomer(record)}
          >
            <FontAwesomeIcon icon={faTrash} className="p-2 items-center" />
          </button>
        </div>
      ),
    },
  ];

  const filterItems = [
    {
      key: "1",
      label: "Clear All",
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Field",
    },
    {
      key: "3",
      label: "Field 2",
    },
    {
      key: "4",
      label: "Field 3",
    },
  ];

  const settingsItems = [
    {
      key: "1",
      label: "Select All",
      disabled: true,
    },
    {
      key: "divider",
      type: "divider",
    },
    {
      key: "2",
      label: "Export to Excel",
    },
    {
      key: "3",
      label: "Export to PDF",
    },
    {
      key: "4",
      label: "Print",
    },
  ];

  return (
    <div className="p-8">
      <Breadcrumb
        items={[
          {
            title: <Link to={"/"}>Home</Link>,
          },
          {
            title: "Customer List",
          },
        ]}
        style={{ marginBottom: "16px" }}
      />
      <div className="flex justify-end space-x-2 mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddCustomer}
        >
          Add Customer
        </Button>
        <Dropdown
          overlay={<Menu items={settingsItems} />}
          placement="bottomRight"
          arrow
        >
          <Button icon={<SettingOutlined />} style={{ marginLeft: "8px" }}>
            Setting
          </Button>
        </Dropdown>
        <Dropdown
          overlay={<Menu items={filterItems} />}
          placement="bottomLeft"
          arrow
        >
          <Button icon={<FilterOutlined />} style={{ marginLeft: "8px" }}>
            Filter
          </Button>
        </Dropdown>
        <Button
          disabled
          icon={<ExportOutlined />}
          style={{ marginLeft: "8px" }}
        >
          Export
        </Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10 }}
        loading={loading}
        onChange={(pagination, filters, sorter) => {
          console.log("pagination:", pagination);
          console.log("filters:", filters);
          console.log("sorter:", sorter);
        }}
      />
      <Modal
        title="Select Customer Type"
        open={selectModalVisible}
        onCancel={() => handleCancel("select")}
        footer={[
          <Button
            disabled
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

      <AddCorporateCustomerForm
        open={corporateModalVisible}
        onCancel={() => handleCancel("corporate")}
        onCreate={handleCreateCorporateCustomer}
      />

      <EditCorporateForm
        open={editModalVisible}
        onCancel={() => handleCancel("edit")}
        onUpdate={handleUpdate}
        data={editData}
      />

      <ReadCorporateForm
        open={readModalVisible}
        onCancel={() => handleCancel("read")}
        data={readData}
      />
    </div>
  );
};

export default CustomerList;
