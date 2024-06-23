import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Table,
  InputNumber,
  Row,
  Col,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

const DetailModal = ({
  isVisible,
  onCancel,
  onSubmit,
  onDelete,
  formDetail,
  record,
}) => {
  const [apiProductData, setApiProductData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [responsibleData, setResponsibleData] = useState([]);

  const [types, setTypes] = useState([]);
  const [dealType, setDealType] = useState([]);
  const [clientName, setClientName] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          "https://iglo-cms-api.xyz/api/product"
        );
        setApiProductData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    const fetchResponsibleData = async () => {
      try {
        const response = await axios.get(
          "https://iglo-cms-api.xyz/api/user-manage"
        );
        setResponsibleData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    const fetchOptionData = async () => {
      try {
        const response = await axios.get(
          "https://iglo-cms-api.xyz/api/sales_plan_heads/create"
        );
        const data = response.data;

        setTypes(data.type.map((type) => ({ ...type, name: type.nama_tipe })));
        setDealType(
          data.deal_type.map((deal) => ({ ...deal, name: deal.nama_deal_type }))
        );
        setClientName(data.client);
        setCompanies(data.company);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchTableData = async () => {
      try {
        const response = await axios.get(
          "https://iglo-cms-api.xyz/api/sales_plan_heads"
        );
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching table data: ", error);
      }
    };

    fetchTableData();
    fetchProductData();
    fetchResponsibleData();
    fetchOptionData();
  }, []);

  useEffect(() => {
    if (record) {
      formDetail.setFieldsValue({
        ...record,
        start_date: record.start_date ? moment(record.start_date) : null,
        end_date: record.end_date ? moment(record.end_date) : null,
      });
      setTableData(record.details || []);
      calculateTotalAmount(record.details || []);
    }
  }, [record]);

  const handleAddRow = () => {
    const newRow = {
      key: tableData.length + 1,
      id_product: "",
      amount: 0,
    };
    setTableData([...tableData, newRow]);
  };

  const calculateTotalAmount = (data) => {
    let total = 0;
    data.forEach((row) => {
      total += row.amount;
    });
    setTotalAmount(total);
  };

  const productColumns = [
    {
      title: "Product",
      dataIndex: "id_product",
      key: "id_product",
      render: (text, record) => (
        <Select
          style={{ width: "100%" }}
          placeholder="Select a product"
          onChange={(value) => {
            const newData = tableData.map((item) =>
              item.key === record.key ? { ...item, id_product: value } : item
            );
            setTableData(newData);
          }}
        >
          {apiProductData.map((product) => (
            <Option key={product.id} value={product.id}>
              {product.nama}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => (
        <InputNumber
          placeholder="IDR"
          style={{ width: "100%" }}
          value={record.amount}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => {
            const numberValue = Number(value.replace(/\D/g, ""));
            return isNaN(numberValue) ? 0 : numberValue;
          }}
          onChange={(value) => {
            const newData = tableData.map((item) =>
              item.key === record.key ? { ...item, amount: value } : item
            );
            setTableData(newData);
            calculateTotalAmount(newData);
          }}
        />
      ),
    },
  ];

  const handleFinish = (values) => {
    onSubmit({ ...values, details: tableData });
  };

  return (
    <Modal
      title="Detail Entry"
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      width={720}
    >
      <Form form={formDetail} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Name"
          name="nama"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          name="id_type"
          rules={[{ required: true, message: "Please select the type!" }]}
        >
          <Select>
            {types.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.nama_tipe}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Plan"
          name="plan_name"
          rules={[{ required: true, message: "Please select the plan!" }]}
        >
          <Input />
        </Form.Item>
        <Row justify={"space-evenly"}>
          <Col>
            <Form.Item
              label="Start Date"
              name="start_date"
              rules={[
                { required: true, message: "Please select the start date!" },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="End Date"
              name="end_date"
              rules={[
                { required: true, message: "Please select the end date!" },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Deal Type"
          name="id_deal_type"
          rules={[{ required: true, message: "Please select the deal type!" }]}
        >
          <Select>
            {dealType.map((deal) => (
              <Option key={deal.id} value={deal.id}>
                {deal.nama_deal_type}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Client">
          <Input.Group className="flex flex-col space-y-4 border rounded-lg p-4">
            <Form.Item
              name={"id_client_contact"}
              noStyle
              rules={[{ required: true, message: "Please input the contact!" }]}
            >
              <Select placeholder="Select contact">
                {clientName.map((client) => (
                  <Option key={client.id} value={client.id}>
                    {client.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={"id_client_company"}
              noStyle
              rules={[{ required: true, message: "Please input the company!" }]}
            >
              <Select placeholder="Select company">
                {companies.map((company) => (
                  <Option key={company.id} value={company.id}>
                    {company.nama_company}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item
          label="Responsible"
          name="id_user_manage"
          rules={[
            { required: true, message: "Please input the responsible person!" },
          ]}
        >
          <Select>
            {responsibleData.map((responsible) => (
              <Option key={responsible.id} value={responsible.id}>
                {responsible.nama}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="flex items-center justify-end">
          <Button
            className="mb-2"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddRow}
          >
            Add
          </Button>
        </div>
        <Form.Item name="details">
          <Table
            columns={productColumns}
            dataSource={tableData}
            pagination={false}
            footer={() => (
              <div className="flex justify-end">
                <strong>Total Amount: {totalAmount.toLocaleString()}</strong>
              </div>
            )}
          />
        </Form.Item>
        <Form.Item
          label="Document Link"
          name="dokumen"
          rules={[
            { required: true, message: "Please input the document link!" },
          ]}
        >
          <Input placeholder="Insert your document link here" />
        </Form.Item>
        <div className="flex justify-end mt-4">
          <Button type="primary" htmlType="submit" className="mr-2">
            Submit
          </Button>
          <Button type="danger" onClick={() => onDelete(record.id)}>
            Delete
          </Button>
          <Button onClick={onCancel} className="ml-2">
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default DetailModal;
