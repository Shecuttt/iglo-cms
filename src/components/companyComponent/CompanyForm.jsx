import React, { useState } from "react";
import { Form, Input, Upload, Select, DatePicker, Button, Modal, Table, Checkbox, Tag } from "antd";
import { faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Option } = Select;

const CompanyForm = ({ visible, onCancel, onCreate }) => {
    const [form] = Form.useForm();
    const [searchVisible, setSearchVisible] = useState(false);
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const [dataSource, setDataSource] = useState([
        {
            key: "1",
            title: "Mr",
            name: "John Greg",
            occupation: "Manager",
            email: "john@gmail.com",
            phone: "08129834579",
            docSignature: false,
            img: null,
        },
        {
            key: "2",
            title: "Mrs",
            name: "Catrina",
            occupation: "Marketing",
            email: "catrina@gmail.com",
            phone: "08345732432",
            docSignature: false,
            img: null,
        },
        {
            key: "3",
            title: "Mr",
            name: "Fernandez",
            occupation: "Accountant",
            email: "fernandez@gmail.com",
            phone: "08234798234",
            docSignature: false,
            img: null,
        },
    ]);

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text) => (
                <Form.Item name="title" initialValue={text} noStyle>
                    <Select>
                        <Option value="Mr">Mr</Option>
                        <Option value="Mrs">Mrs</Option>
                    </Select>
                </Form.Item>
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => (
                <Form.Item name="name" initialValue={text} noStyle>
                    <Input />
                </Form.Item>
            ),
        },
        {
            title: "Occupation",
            dataIndex: "occupation",
            key: "occupation",
            render: (text) => (
                <Form.Item name="occupation" initialValue={text} noStyle>
                    <Select>
                        <Option value="Manager">Manager</Option>
                        <Option value="Marketing">Marketing</Option>
                        <Option value="Accountant">Accountant</Option>
                    </Select>
                </Form.Item>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (text) => (
                <Form.Item name="email" initialValue={text} noStyle>
                    <Input />
                </Form.Item>
            ),
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            render: (text) => (
                <Form.Item name="phone" initialValue={text} noStyle>
                    <Input />
                </Form.Item>
            ),
        },
        {
            title: "Doc Signature",
            dataIndex: "docSignature",
            key: "docSignature",
            render: (checked) => (
                <Form.Item name="docSignature" valuePropName="checked" initialValue={checked} noStyle>
                    <Checkbox />
                </Form.Item>
            ),
        },
        {
            title: "IMG",
            dataIndex: "img",
            key: "img",
            render: () => (
                <Upload name="logo" listType="picture" maxCount={1} beforeUpload={() => false}>
                    <Button icon={<FontAwesomeIcon icon={faUpload} />}>Upload</Button>
                </Upload>
            ),
        },
    ];

    const handleAdd = () => {
        const newData = {
            key: Date.now(),
            title: "",
            name: "",
            occupation: "",
            email: "",
            phone: "",
            docSignature: false,
            img: null,
        };
        setDataSource([...dataSource, newData]);
    };

    const handleDelete = () => {
        setDataSource(dataSource.slice(0, -1));
    };

    const handleSearchOk = () => {
        if (inputValue && !tags.includes(inputValue)) {
            setTags([...tags, inputValue]);
        }
        setInputValue("");
        setSearchVisible(false);
    };

    const handleSearchCancel = () => {
        setInputValue("");
        setSearchVisible(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleTagClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };

    return (
        <Modal
            open={visible}
            title="Add Company"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
            width={1000}
        >
            <Form form={form} layout="vertical" className="space-y-6">
                <Form.Item
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                    className="flex items-center space-x-4"
                    rules={[{ required: true, message: "Please upload an image!" }]}
                >
                    <Upload name="logo" listType="picture" maxCount={1} beforeUpload={() => false}>
                        <Button icon={<FontAwesomeIcon icon={faUpload} />}>Upload Gambar</Button>
                    </Upload>
                </Form.Item>

                <div className="flex space-x-4">
                    <Form.Item name="name" label="Nama" className="w-1/2" rules={[{ required: true, message: "Please input your name!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="code" label="Kode" className="w-1/2" rules={[{ required: true, message: "Please input your code!" }]}>
                        <Input />
                    </Form.Item>
                </div>

                <div className="flex space-x-4">
                    <Form.Item name="type" label="Type" className="w-1/2" rules={[{ required: true, message: "Please select a type!" }]}>
                        <Select>
                            <Option value="type1">Type 1</Option>
                            <Option value="type2">Type 2</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="scale" label="Scale" className="w-1/2" rules={[{ required: true, message: "Please select a scale!" }]}>
                        <Select>
                            <Option value="small">Small</Option>
                            <Option value="medium">Medium</Option>
                            <Option value="large">Large</Option>
                        </Select>
                    </Form.Item>
                </div>

                <div className="flex space-x-4">
                    <Form.Item name="email" label="Email" className="w-1/4" rules={[{ required: true, message: "Please input your email!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone" className="w-1/4" rules={[{ required: true, message: "Please input your phone number!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="nib" label="NIB" className="w-1/4" rules={[{ required: true, message: "Please input your NIB!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="npwp" label="NPWP" className="w-1/4" rules={[{ required: true, message: "Please input your NPWP!" }]}>
                        <Input />
                    </Form.Item>
                </div>

                <div className="flex space-x-4">
                    <Form.Item name="website" label="Website" className="w-1/2" rules={[{ required: true, message: "Please input your website!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="location" label="Lokasi" className="w-1/2" rules={[{ required: true, message: "Please input your location!" }]}>
                        <Input />
                    </Form.Item>
                </div>

                <div className="flex space-x-4">
                    <Form.Item name="establish" label="Establish Date" className="w-1/2" rules={[{ required: true, message: "Please select establish date!" }]}>
                        <DatePicker className="w-full" />
                    </Form.Item>
                    <Form.Item name="join" label="Join Date" className="w-1/2" rules={[{ required: true, message: "Please select join date!" }]}>
                        <DatePicker className="w-full" />
                    </Form.Item>
                </div>

                <Form.Item label="Company Structure Organization">
                    <div className="flex space-x-4 my-4">
                        <Button type="primary" onClick={handleAdd}>
                            ADD
                        </Button>
                        <Button type="danger" onClick={handleDelete}>
                            DELETE
                        </Button>
                    </div>

                    <Table dataSource={dataSource} columns={columns} pagination={false} />
                </Form.Item>

                <Form.Item label="Responsible Sales">
                    <div className="border p-2 rounded">
                        {tags.map((tag) => (
                            <Tag key={tag} closable onClose={() => handleTagClose(tag)}>
                                {tag}
                            </Tag>
                        ))}
                        <Button type="dashed" onClick={() => setSearchVisible(true)} className="ml-2">
                            <FontAwesomeIcon icon={faPlus} /> Add Sales
                        </Button>
                    </div>
                </Form.Item>

                {/* Input untuk file document */}
                <Form.Item name="document" label="Document" valuePropName="fileList" getValueFromEvent={(e) => e.fileList} rules={[{ required: true, message: "Please upload a document!" }]}>
                    <Upload name="document" beforeUpload={() => false} listType="picture">
                        <Button icon={<FontAwesomeIcon icon={faUpload} />}>Upload Document</Button>
                    </Upload>
                </Form.Item>

                {/* Modal untuk search input */}
                <Modal title="Search and Add Sales" open={searchVisible} onOk={handleSearchOk} onCancel={handleSearchCancel}>
                    <Input placeholder="Search Name" value={inputValue} onChange={handleInputChange} />
                </Modal>
            </Form>
        </Modal>
    );
};

export default CompanyForm;
