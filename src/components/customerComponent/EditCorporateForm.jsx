import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, message } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const EditCorporateForm = ({ open, onCancel, onUpdate, data }) => {
  const [form] = Form.useForm();
  const [industryTypes, setIndustryTypes] = useState([]);
  const [companyScales, setCompanyScales] = useState([]);
  const [industryName, setIndustryName] = useState("");
  const [companyScaleName, setCompanyScaleName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://iglo-cms-api.xyz/api/customers/create"
        );
        setIndustryTypes(response.data.industri_types);
        setCompanyScales(response.data.company_scales);
        // Set initial names based on data
        const initialIndustry = response.data.industri_types.find(
          (type) => type.id === data.id_industry_type
        );
        const initialCompanyScale = response.data.company_scales.find(
          (scale) => scale.id === data.id_company_scale
        );
        setIndustryName(
          initialIndustry ? initialIndustry.nama_industri_type : ""
        );
        setCompanyScaleName(
          initialCompanyScale ? initialCompanyScale.nama_company_scale : ""
        );
      } catch (error) {
        message.error("Failed to fetch data from API");
      }
    };

    fetchData();
  }, [data]);

  const initialData = {
    ...data,
    join_iglo: data.join_iglo ? moment(data.join_iglo) : null,
  };

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      const updatedValues = {
        ...values,
        join_iglo: values.join_iglo
          ? values.join_iglo.format("YYYY-MM-DD")
          : null,
      };
      axios
        .put(`https://iglo-cms-api.xyz/api/customers/${data.id}`, updatedValues) // Use data.id here
        .then((response) => {
          onUpdate({ ...data, ...updatedValues });
          form.resetFields();
          message.success("Corporate customer updated successfully");
        })
        .catch((error) => {
          //   console.error("Failed to update corporate customer", error);
          return;
        });
    });
  };

  return (
    <Modal
      open={open}
      title="Edit Corporate Customer"
      okText="Update"
      onCancel={onCancel}
      onOk={handleUpdate}
    >
      <Form form={form} layout="vertical" initialValues={initialData}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="code_name"
          label="Code Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="id_industry_type"
          label="Industry Type"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select industry type"
            onChange={(value, option) => setIndustryName(option.children)}
          >
            {industryTypes.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.nama_industri_type}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="id_company_scale"
          label="Company Scale"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select company scale"
            onChange={(value, option) => setCompanyScaleName(option.children)}
          >
            {companyScales.map((scale) => (
              <Option key={scale.id} value={scale.id}>
                {scale.nama_company_scale}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="establish"
          label="Establish"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name="nib" label="NIB" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="npwp" label="NPWP" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="join_iglo"
          label="Joining Date at IGLO"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="file_document" label="Link">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCorporateForm;
