import {
  faSearch,
  faPhone,
  faMessage,
  faEye,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Input, Breadcrumb } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Highlighter from "react-highlight-words";
import CompanyForm from "./CompanyForm";
import { Link } from "react-router-dom";

const CompanyData = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "https://iglo-cms-api.xyz/api/product/create"
        );
        setCompanies(response.data.companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className="p-4 flex space-x-2">
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          className="w-44"
        />
        <button
          type="button"
          onClick={() => handleReset(clearFilters)}
          className="px-4 rounded-md bg-red-700 text-white"
        >
          Reset
        </button>
      </div>
    ),
    filterIcon: (filtered) => (
      <FontAwesomeIcon
        icon={faSearch}
        style={{ color: filtered ? "#1890ff" : undefined }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) =>
      searchText && searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreate = (values) => {
    console.log("Received values of form: ", values);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Company Name",
      dataIndex: "nama_company",
      key: "nama_company",
      sorter: (a, b) => a.nama_company.localeCompare(b.nama_company),
      ...getColumnSearchProps("nama_company"),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex space-x-5">
          <button type="button" className="text-gray-400 hover:text-red-900">
            <FontAwesomeIcon icon={faPhone} />
          </button>

          <button type="button" className="text-gray-400 hover:text-red-900">
            <FontAwesomeIcon icon={faMessage} />
          </button>
          <button type="button" className="text-gray-400 hover:text-red-900">
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button type="button" className="text-gray-400 hover:text-red-900">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button type="button" className="text-gray-400 hover:text-red-900">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
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
            title: "Company",
          },
        ]}
        className="mb-4"
      />
      <h1 className="text-2xl font-bold mb-4">Company</h1>
      <div className="flex mb-8">
        <button
          onClick={showModal}
          className="flex px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800"
        >
          + Add Company
        </button>
        <div className="flex flex-row space-x-3 ml-auto">
          <button className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800">
            Filters
          </button>
          <button className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800">
            Import
          </button>
        </div>
      </div>
      <CompanyForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onCreate={handleCreate}
      />
      <Table
        columns={columns}
        dataSource={companies}
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="bg-white rounded-lg shadow-md"
        rowKey="id"
      />
    </div>
  );
};

export default CompanyData;
