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
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedDocument(null);
    form.resetFields();
  };

  const handleEdit = (values) => {
    if (selectedDocument) {
      axios
        .put(
          `https://iglo-cms-api.xyz/api/document-templates/${selectedDocument.id}`,
          {
            nama_file: values.nama_file,
            id_user_manage: values.id_user_manage,
          }
        )
        .then(() => {
          message.success("Document updated successfully!");
          fetchDocuments();
          handleCancel();
        })
        .catch((error) => {
          console.error("There was an error updating the document!", error);
          message.error("Failed to update document.");
        });
    }
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
        .then(() => {
          message.success("Document template uploaded successfully!");
          setIsUploadModalVisible(false);
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
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button
            icon={<DownloadOutlined />}
            onClick={() => console.log("Download:", record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record)}
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
        title="Edit Document"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={() => handleDelete(selectedDocument)}
          >
            <DeleteOutlined /> Delete
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleEdit}>
          <Form.Item
            name="nama_file"
            label="Name"
            rules={[
              { required: true, message: "Please enter the document name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="id_user_manage"
            label="User Manage ID"
            rules={[
              { required: true, message: "Please enter the user manage ID" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

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
          <Form.Item
            name="id_user_manage"
            label="User Manage ID"
            rules={[
              { required: true, message: "Please enter the user manage ID" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Document;
