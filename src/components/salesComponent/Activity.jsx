import React, { useState, useEffect } from "react";
import { Layout, Menu, Space, Input, Button, Form, Table, message } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import moment from "moment";
import CreateModal from "./activityComponent/CreateModal";
import DetailModal from "./activityComponent/DetailModal";
import axios from "axios";

const { Sider, Content } = Layout;
const { Search } = Input;

const Activity = () => {
  const [selectedMenu, setSelectedMenu] = useState("Proposal");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();
  const [formDetail] = Form.useForm();
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://iglo-cms-api.xyz/api/sales_plan_heads"
  //       );
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       message.error("Failed to fetch data.");
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleMenuClick = ({ key }) => {
    setSelectedMenu(key);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  //Submit form for creating new record here
  const handleCreate = (tableData) => {
    form
      .validateFields()
      .then((values) => {
        // Convert moment objects to strings
        values.start_date = values.start_date
          ? values.start_date.format("YYYY-MM-DD")
          : null;
        values.end_date = values.end_date
          ? values.end_date.format("YYYY-MM-DD")
          : null;

        // Map table data to detail_sales_plan_heads
        values.details = tableData.map((item) => ({
          id_product: item.id_product,
          amount: item.amount,
        }));

        axios
          .post("https://iglo-cms-api.xyz/api/sales_plan_heads", values)
          .then((response) => {
            console.log("Form values sent to API:", values);
            console.log("API response:", response);
            form.resetFields();
            setTableData([]); // Reset table data
            setIsModalVisible(false);
            message.success("Form submitted successfully.");
          })
          .catch((error) => {
            console.error("Error sending form values to API:", error);
            console.log(values);
            message.error("Failed to submit form.");
          });
      })
      .catch((error) => {
        console.error("Error validating form fields:", error);
        message.error("Please fill in all required fields.");
      });
  };

  const showDetailModal = (record) => {
    const recordWithMomentDates = {
      ...record,
      start_date: moment(record.start_date),
      end_date: moment(record.end_date),
    };
    setSelectedRecord(recordWithMomentDates);
    formDetail.setFieldsValue(recordWithMomentDates);
    setIsDetailModalVisible(true);
  };

  const handleDetailCancel = () => {
    setIsDetailModalVisible(false);
  };

  const handleDelete = async () => {
    if (selectedRecord) {
      try {
        await axios.delete(
          `https://iglo-cms-api.xyz/api/sales_plan_heads/${selectedRecord.id}`
        );
        message.success("Record deleted successfully.");
        setIsDetailModalVisible(false);
        // Fetch updated data after deletion
        const response = await axios.get(
          "https://iglo-cms-api.xyz/api/sales_plan_heads"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error deleting record:", error);
        message.error("Failed to delete record.");
      }
    }
  };

  const handleSubmit = () => {
    console.log("Submit form values: ", formDetail.getFieldsValue());
    setIsDetailModalVisible(false);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Start Date", dataIndex: "start_date", key: "start_date" },
    { title: "End Date", dataIndex: "end_date", key: "end_date" },
    { title: "Title", dataIndex: "nama", key: "nama" },
  ];

  const staticData = [
    {
      id: 1,
      nama: "Proposal 1",
      start_date: "2022-01-01",
      end_date: "2022-02-01",
    },
  ];

  return (
    <Layout className="rounded-md">
      <Sider width={144} className="min-h-screen overflow-hidden">
        <Menu
          mode="inline"
          defaultSelectedKeys={["Proposal"]}
          className="h-full shadow"
          onClick={handleMenuClick}
        >
          <Menu.Item key="Create" onClick={showModal}>
            Create
          </Menu.Item>
          <Menu.Item key="Proposal">Proposal</Menu.Item>
          <Menu.Item disabled key="Portfolio">
            Portfolio
          </Menu.Item>
          <Menu.Item disabled key="Invoice">
            Invoice
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="p-6">
        <Content className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{selectedMenu}</h2>
          {selectedMenu === "Proposal" ? (
            <>
              <Space className="mb-4 flex justify-end">
                <Button className="bg-red-700 text-white py-2 px-4 rounded flex items-center">
                  <SettingOutlined className="" />
                </Button>
                <Search
                  placeholder="Search..."
                  onSearch={(value) => console.log(value)}
                  enterButton
                />
              </Space>
              <Table
                columns={columns}
                dataSource={staticData}
                pagination={{ pageSize: 5 }}
                style={{ fontSize: 12, lineHeight: 16 }}
                className="text-xs"
                onRow={(record) => ({
                  onDoubleClick: () => showDetailModal(record),
                })}
              />
              <DetailModal
                isVisible={isDetailModalVisible}
                onCancel={handleDetailCancel}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
                formDetail={formDetail}
                record={selectedRecord}
              />
            </>
          ) : selectedMenu === "Create" ? (
            <CreateModal
              isVisible={isModalVisible}
              onCancel={handleCancel}
              onCreate={handleCreate}
              form={form}
            />
          ) : selectedMenu === "Portfolio" ? (
            <div>portfolio</div>
          ) : (
            <div>invoice</div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Activity;
