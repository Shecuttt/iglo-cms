import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form] = Form.useForm();

  // useEffect(() => {
  //   fetchEmployees();
  // }, []);

  // const fetchEmployees = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://iglo-cms-api.xyz/api/user-manage"
  //     );
  //     setEmployees(response.data);
  //   } catch (error) {
  //     console.error("There was an error fetching the employees!", error);
  //   }
  // };

  const handleOpenModal = (employee = null) => {
    setEditingEmployee(employee);
    setModalOpen(true);
    if (employee) {
      form.setFieldsValue(employee);
    } else {
      form.resetFields();
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (values) => {
    try {
      if (editingEmployee) {
        await axios.put(
          `http://localhost:3001/userlist/${editingEmployee.id}`,
          values
        );
        Swal.fire("Success", "Employee updated successfully", "success");
      } else {
        await axios.post("http://localhost:3001/userlist", values);
        Swal.fire("Success", "Employee added successfully", "success");
      }
      fetchEmployees();
      handleCloseModal();
    } catch (error) {
      console.error("There was an error saving the employee!", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/userlist/${id}`);
          fetchEmployees();
          Swal.fire("Deleted!", "Your employee has been deleted.", "success");
        } catch (error) {
          console.error("There was an error deleting the employee!", error);
        }
      }
    });
  };

  const staticEmployData = [
    {
      id: 1,
      nama: "John Doe",
      email: "johndoe@example.com",
      telepon: "08123456789",
      position: "Software Engineer",
      department: "Engineering",
      foto: "https://via.placeholder.com/150",
    },
    // Add more employees here
  ];

  const columns = [
    {
      title: "Photo",
      dataIndex: "foto",
      key: "foto",
      render: (text) => (
        <img
          src={text}
          alt="employee"
          className="rounded-full lg:w-12 lg:h-12 object-cover"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "telepon",
      key: "telepon",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span className="flex space-x-2">
          <Button onClick={() => handleOpenModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-end space-x-3 mb-4">
        <Button danger type="default" onClick={() => handleOpenModal()}>
          Add employee
        </Button>
        <Button disabled type="default">
          Import
        </Button>
      </div>
      <Table
        className="overflow-x-auto"
        dataSource={staticEmployData}
        columns={columns}
        rowKey="id"
      />
      <Modal
        title={editingEmployee ? "Edit Employee" : "Add Employee"}
        open={modalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="foto"
            label="Photo URL"
            rules={[{ required: true, message: "Please input the photo URL!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: "Please input the position!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="department"
            label="Department"
            rules={[
              { required: true, message: "Please input the department!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingEmployee ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Employee;
