import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, message } from "antd";
import axios from "axios";
import moment from "moment";

const ReadCorporateForm = ({ open, onCancel, data }) => {
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
          initialCompanyScale ? initialCompanyScale.nama_company_scales : ""
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

  return (
    <Modal
      open={open}
      title="View Corporate Customer"
      footer={null}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" initialValues={initialData}>
        <Form.Item name="name" label="Name">
          <Input disabled />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input disabled />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input disabled />
        </Form.Item>
        <Form.Item name="code_name" label="Code Name">
          <Input disabled />
        </Form.Item>
        <Form.Item name="id_industry_type" label="Industry Type">
          <Input value={industryName} disabled />
        </Form.Item>
        <Form.Item name="id_company_scale" label="Company Scale">
          <Input value={companyScaleName} disabled />
        </Form.Item>
        <Form.Item name="establish" label="Establish">
          <Input type="number" disabled />
        </Form.Item>
        <Form.Item name="nib" label="NIB">
          <Input disabled />
        </Form.Item>
        <Form.Item name="npwp" label="NPWP">
          <Input disabled />
        </Form.Item>
        <Form.Item name="location" label="Location">
          <Input disabled />
        </Form.Item>
        <Form.Item name="join_iglo" label="Joining Date at IGLO">
          <DatePicker style={{ width: "100%" }} disabled />
        </Form.Item>
        <Form.Item name="file_document" label="Link">
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReadCorporateForm;
