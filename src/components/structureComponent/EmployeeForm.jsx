import React from "react";
import { Modal, Form, Input, Button } from "antd";

const ModalForm = ({ newUser, setNewUser, handleSubmit, isOpen, onClose }) => (
    <Modal title="Add New User" open={isOpen} onCancel={onClose} footer={null}>
        <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Photo URL" name="photo" rules={[{ required: true, message: "Please input the photo URL!" }]}>
                <Input value={newUser.photo} onChange={(e) => setNewUser({ ...newUser, photo: e.target.value })} />
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input the name!" }]}>
                <Input value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input the email!" }]}>
                <Input value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Please input the phone number!" }]}>
                <Input value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
            </Form.Item>
            <Form.Item label="Position" name="position" rules={[{ required: true, message: "Please input the position!" }]}>
                <Input value={newUser.position} onChange={(e) => setNewUser({ ...newUser, position: e.target.value })} />
            </Form.Item>
            <Form.Item label="Department" name="department" rules={[{ required: true, message: "Please input the department!" }]}>
                <Input value={newUser.department} onChange={(e) => setNewUser({ ...newUser, department: e.target.value })} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </Modal>
);

export default ModalForm;
