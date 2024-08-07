import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Input, message, Button } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

const Management = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState({
    current: 1,
    pageSize: 10,
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3001/admin");
  //       setData(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       message.error("Error fetching data:" + error.message);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handlePagination = (page) => {
    setPage(page);
  };

  const confirmDel = async (record) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete ${record.nama} ?`, // Merubah record.name menjadi record.nama
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    // if (result.isConfirmed) {
    //   try {
    //     await axios.delete(
    //       `https://iglo-cms-api.xyz/api/user-manages/${record.id}`
    //     );
    //     setData(data.filter((item) => item.id !== record.id));
    //     Swal.fire("Deleted!", "The record has been deleted.", "success");
    //   } catch (error) {
    //     message.error("Error deleting data: " + error.message);
    //   }
    // }
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (text, record, index) =>
        (page.current - 1) * page.pageSize + index + 1,
    },
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "ID Karyawan",
      dataIndex: "id_karyawan",
      key: "id_karyawan",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "nama_role",
      key: "nama_role",
      render: (text, record) => <span className="capitalize">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span
          className={`capitalize rounded-full py-2 px-4 ${
            text === "Aktif" || text === "aktif"
              ? "bg-green-200 hover:bg-green-400 text-green-800"
              : "bg-red-200 hover:bg-red-400 text-red-800"
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
          <Link
            to={`/readonly/${record.id}`}
            className="rounded-full text-white bg-blue-600 hover:bg-blue-800 active:text-blue-600 active:bg-white flex items-center"
          >
            <FontAwesomeIcon icon={faEye} className="p-2 items-center" />
          </Link>
          <Link
            to={`/edit/${record.id}`}
            className="rounded-full text-white bg-green-600 hover:bg-green-800 active:text-green-600 active:bg-white flex items-center"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="p-2" />
          </Link>
          <button
            onClick={() => confirmDel(record)}
            className="rounded-full text-white bg-red-600 hover:bg-red-800 active:text-red-600 active:bg-white flex items-center"
          >
            <FontAwesomeIcon icon={faTrash} className="p-2" />
          </button>
        </div>
      ),
    },
  ];

  // const filteredData =
  //   data.length > 0
  //     ? data.filter(
  //         (item) =>
  //           (item.nama?.toLowerCase() || "").includes(
  //             searchText.toLowerCase()
  //           ) ||
  //           (item.email?.toLowerCase() || "").includes(searchText.toLowerCase())
  //       )
  //     : [];

  const staticData = [
    {
      no: 1,
      nama: "John Doe",
      id_karyawan: "12345",
      email: "johndoe@example.com",
      nama_role: "Admin",
      status: "Aktif",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          className="w-1/3"
        />
        <Link to="/adduser">
          <Button type="primary" danger>
            Tambah data
          </Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={staticData}
        // loading={loading}
        pagination={page}
        onChange={handlePagination}
        rowKey="id"
      />
    </div>
  );
};

export default Management;
