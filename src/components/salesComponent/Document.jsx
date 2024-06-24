import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Input,
  Button,
  Modal,
  Form,
  Upload,
  message,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DownloadOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../AuthContext";

const Document = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [uploadForm] = Form.useForm();
  const [uploadedFile, setUploadedFile] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    axios
      .get("https://iglo-cms-api.xyz/api/document-templates")
      .then((response) => {
        const documents = response.data.map((doc) => ({
          ...doc,
          key: doc.id,
        }));
        setData(documents);
        setFilteredData(documents);
      })
      .catch((error) => {
        console.error("There was an error fetching the documents!", error);
      });
  };

  const showModal = (record) => {
    setSelectedDocument(record);
    const initialValues = {
      nama_file: record.nama_file,
      id_user_manage: record.id_user_manage,
    };

    form.setFieldsValue(initialValues);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedDocument(null);
    form.resetFields();
  };

  const handleDelete = (record) => {
    axios
      .delete(`https://iglo-cms-api.xyz/api/document-templates/${record.id}`)
      .then(() => {
        message.success("Document deleted successfully!");
        fetchDocuments();
      })
      .catch((error) => {
        console.error("There was an error deleting the document!", error);
        message.error("Failed to delete document.");
      });
  };

  const toLowerCaseSafe = (value) => {
    return value && typeof value === "string" ? value.toLowerCase() : "";
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = data.filter(
      (item) =>
        toLowerCaseSafe(item.nama_file).includes(value) ||
        toLowerCaseSafe(item.size).includes(value)
    );
    setFilteredData(filtered);
  };

  const handleUploadModal = () => {
    setIsUploadModalVisible(true);
  };

  const handleUploadCancel = () => {
    setIsUploadModalVisible(false);
    setFileList([]);
    uploadForm.resetFields();
  };

  const handleUploadChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);
  };

  const handleUploadSubmit = (values) => {
    const formData = new FormData();
    if (fileList.length > 0) {
      formData.append("file", fileList[0].originFileObj);
      formData.append("id_user_manage", values.id_user_manage);
      axios
        .post("https://iglo-cms-api.xyz/api/document-templates", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          message.success("Document template uploaded successfully!");
          setIsUploadModalVisible(false);
          setUploadedFile(response.data); // Simpan informasi file yang sudah diupload
          fetchDocuments();
        })
        .catch((error) => {
          console.error("There was an error uploading the document!", error);
          message.error("Failed to upload document template.");
        });
    } else {
      message.error("Please select a file to upload.");
    }
  };

  const handleDownload = (record) => {
    // Misalkan endpoint untuk mengunduh file adalah di 'https://iglo-cms-api.xyz/api/download-file/'
    const downloadUrl = `https://iglo-cms-api.xyz/api/download-template/${record.id}`;
    axios({
      url: downloadUrl,
      method: "GET",
      responseType: "blob", // penting untuk menangani response dalam bentuk blob (binary large object)
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", record.nama_file); // Nama file yang akan diunduh
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        message.error("Failed to download file.");
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "nama_file",
      key: "nama_file",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
          <Button
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Layout className="p-6 m-4">
        <div className="flex justify-between mb-4">
          <span className="font-bold text-2xl text-black">Document</span>
          <div>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={handleUploadModal}
              className="mr-2"
            >
              Upload Template
            </Button>
            <Input
              placeholder="Search File and Folders"
              prefix={<SearchOutlined />}
              className="w-1/3"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          className="bg-white"
          pagination={false}
        />
      </Layout>

      <Modal
        title="Upload Document Template"
        open={isUploadModalVisible}
        onCancel={handleUploadCancel}
        footer={[
          <Button key="cancel" onClick={handleUploadCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => uploadForm.submit()}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={uploadForm} layout="vertical" onFinish={handleUploadSubmit}>
          <Form.Item
            name="file"
            label="Select File"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload
              beforeUpload={() => false}
              onChange={handleUploadChange}
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Document;
