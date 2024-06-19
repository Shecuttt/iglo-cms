import React from "react";
import {
  Form,
  Input,
  Select,
  Button,
  message,
  Modal,
  Table,
  Row,
  Col,
  DatePicker,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddCorporateCustomerForm = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  const handleCreate = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      onCreate(values);
    });
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
              name="codeName"
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
              name="industryType"
              label="Industry Type"
              rules={[
                { required: true, message: "Please enter industry type" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="companyScale"
              label="Company Scale"
              rules={[
                { required: true, message: "Please enter company scale" },
              ]}
            >
              <Input />
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
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="NIB"
              label="NIB"
              rules={[{ required: true, message: "Please enter NIB" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="NPWP"
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
              name="joiningDate"
              label="Joining Date at IGLO"
              rules={[
                { required: true, message: "Please select joining date" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Company Structure Organization">
          <Button type="dashed" icon={<UploadOutlined />}>
            Add
          </Button>
          <Button
            type="dashed"
            danger
            icon={<UploadOutlined />}
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
          <Table
            dataSource={[]}
            columns={[
              { title: "Titles", dataIndex: "title", key: "title" },
              { title: "Name", dataIndex: "name", key: "name" },
              {
                title: "Occupation",
                dataIndex: "occupation",
                key: "occupation",
              },
              { title: "Email", dataIndex: "email", key: "email" },
              { title: "Phone", dataIndex: "phone", key: "phone" },
              {
                title: "Doc Signature",
                dataIndex: "docSignature",
                key: "docSignature",
              },
              { title: "IMG", dataIndex: "img", key: "img" },
            ]}
            pagination={false}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleCreate}>
            Add Company
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onCancel}>
            Close
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCorporateCustomerForm;
