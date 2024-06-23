import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  message,
  Modal,
  Row,
  Col,
  DatePicker,
} from "antd";
import axios from "axios";

const { Option } = Select;

const AddCorporateCustomerForm = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const [industryTypes, setIndustryTypes] = useState([]);
  const [companyScales, setCompanyScales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://iglo-cms-api.xyz/api/customers/create"
        );
        setIndustryTypes(response.data.industri_types);
        setCompanyScales(response.data.company_scales);
      } catch (error) {
        message.error("Failed to fetch data from API");
      }
    };

    fetchData();
  }, []);

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      // Append all form values to FormData object
      Object.keys(values).forEach((key) => {
        if (key === "join_iglo") {
          formData.append(key, values[key].format("YYYY-MM-DD"));
        } else {
          formData.append(key, values[key]);
        }
      });

      // Perform API request using FormData
      await axios.post("https://iglo-cms-api.xyz/api/customers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      form.resetFields();
      onCreate(values);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      message.error("Failed to add customer");
    }
  };

  return (
    <Modal
      open={visible}
      title="Add Corporate Customer"
      okText="Add"
      onCancel={onCancel}
      onOk={handleCreate}
      width={800}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please enter customer name" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="code_name"
              label="Code Name"
              rules={[{ required: true, message: "Please enter code name" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="id_industry_type"
              label="Industry Type"
              rules={[
                { required: true, message: "Please select industry type" },
              ]}
            >
              <Select placeholder="Select industry type">
                {industryTypes.map((type) => (
                  <Option key={type.id} value={type.id}>
                    {type.nama_industri_type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="id_company_scale"
              label="Company Scale"
              rules={[
                { required: true, message: "Please select company scale" },
              ]}
            >
              <Select placeholder="Select company scale">
                {companyScales.map((scale) => (
                  <Option key={scale.id} value={scale.id}>
                    {scale.nama_company_scale}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter customer email" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: "Please enter customer phone number",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="website"
              label="Website"
              rules={[{ required: true, message: "Please enter website" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="establish"
              label="Establish"
              rules={[
                { required: true, message: "Please enter establishment year" },
              ]}
            >
              <Input type="number" maxLength={4} placeholder="Year" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="nib"
              label="NIB"
              rules={[{ required: true, message: "Please enter NIB" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="npwp"
              label="NPWP"
              rules={[{ required: true, message: "Please enter NPWP" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Please enter location" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="join_iglo"
              label="Joining Date at IGLO"
              rules={[
                { required: true, message: "Please select joining date" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="file_document"
              label="Link"
              rules={[{ required: false, message: "Please enter link" }]}
            >
              <Input placeholder="https://link-to-your-gdrive.com" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddCorporateCustomerForm;
