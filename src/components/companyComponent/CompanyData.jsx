import { faSearch, faPhone, faMessage, faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Input } from "antd";
import React, { useState } from "react";
import Highlighter from "react-highlight-words";
import CompanyForm from "./CompanyForm";

const CompanyData = () => {
    const columns = [
        {
            title: "#",
            dataIndex: "number",
            key: "number",
            sorter: (a, b) => a.number - b.number,
        },
        {
            title: "Logo",
            dataIndex: "logo",
            key: "logo",
            render: (text) => <img src={text} alt="logo" className="w-10 h-10 rounded-full" />,
        },
        {
            title: "Company Name",
            dataIndex: "companyName",
            key: "companyName",
            sorter: (a, b) => a.companyName.localeCompare(b.companyName),
        },
        {
            title: "Code Name",
            dataIndex: "codeName",
            key: "codeName",
        },
        {
            title: "Industry Type",
            dataIndex: "industryType",
            key: "industryType",
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className="flex space-x-5">
                    <button type="button" className="text-gray-400 hover:text-red-900">
                        <FontAwesomeIcon icon={faPhone} />
                    </button>

                    <button type="button" className="text-gray-400 hover:text-red-900">
                        <FontAwesomeIcon icon={faMessage} />
                    </button>
                    <button type="button" className="text-gray-400 hover:text-red-900">
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button type="button" className="text-gray-400 hover:text-red-900">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button type="button" className="text-gray-400 hover:text-red-900">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            ),
        },
    ];

    const data = [
        {
            key: 1,
            number: 1,
            logo: "https://via.placeholder.com/40",
            companyName: "Company A",
            codeName: "A1",
            industryType: "Tech",
            location: "New York",
        },
        {
            key: 2,
            number: 2,
            logo: "https://via.placeholder.com/40",
            companyName: "Company B",
            codeName: "B1",
            industryType: "Finance",
            location: "San Francisco",
        },
        {
            key: 3,
            number: 3,
            logo: "https://via.placeholder.com/40",
            companyName: "Company C",
            codeName: "C1",
            industryType: "Healthcare",
            location: "Los Angeles",
        },
        {
            key: 4,
            number: 4,
            logo: "https://via.placeholder.com/40",
            companyName: "Company D",
            codeName: "D1",
            industryType: "Retail",
            location: "Chicago",
        },
        {
            key: 5,
            number: 5,
            logo: "https://via.placeholder.com/40",
            companyName: "Company E",
            codeName: "E1",
            industryType: "Manufacturing",
            location: "Detroit",
        },
        {
            key: 6,
            number: 6,
            logo: "https://via.placeholder.com/40",
            companyName: "Company F",
            codeName: "F1",
            industryType: "Energy",
            location: "Houston",
        },
        {
            key: 7,
            number: 7,
            logo: "https://via.placeholder.com/40",
            companyName: "Company G",
            codeName: "G1",
            industryType: "Telecommunications",
            location: "Dallas",
        },
        {
            key: 8,
            number: 8,
            logo: "https://via.placeholder.com/40",
            companyName: "Company H",
            codeName: "H1",
            industryType: "Transportation",
            location: "Atlanta",
        },
        {
            key: 9,
            number: 9,
            logo: "https://via.placeholder.com/40",
            companyName: "Company I",
            codeName: "I1",
            industryType: "Construction",
            location: "Miami",
        },
        {
            key: 10,
            number: 10,
            logo: "https://via.placeholder.com/40",
            companyName: "Company J",
            codeName: "J1",
            industryType: "Real Estate",
            location: "Seattle",
        },
    ];

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");

    const handleSearch = (selectedKeys) => {
        setSearchText(selectedKeys[0]);
        setSearchedColumn("companyName");
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters }) => (
            <div className="p-4 flex space-x-2">
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys)}
                    className="w-44"
                />
                <button type="button" onClick={() => handleReset(clearFilters)} className="px-4 rounded-md bg-red-700 text-white">
                    Reset
                </button>
            </div>
        ),
        filterIcon: (filtered) => <FontAwesomeIcon icon={faSearch} style={{ color: filtered ? "#1890ff" : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => setSearchText(selectedKeys[0]));
            }
        },
        render: (text) =>
            searchText && searchedColumn === dataIndex ? (
                <Highlighter highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }} searchWords={[searchText]} autoEscape textToHighlight={text.toString()} />
            ) : (
                text
            ),
    });

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleCreate = (values) => {
        console.log("Received values of form: ", values);
        setIsModalVisible(false);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Company</h1>
            <div className="flex mb-8">
                <button onClick={showModal} className="flex px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800">
                    + Add Company
                </button>
                <div className="flex flex-row space-x-3 ml-auto">
                    <button className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800">Filters</button>
                    <button className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800">Import</button>
                </div>
            </div>
            <CompanyForm visible={isModalVisible} onCancel={handleCancel} onCreate={handleCreate} />
            <Table
                columns={columns.map((col) => {
                    if (col.dataIndex === "companyName") {
                        return { ...col, ...getColumnSearchProps(col.dataIndex) };
                    }
                    return col;
                })}
                dataSource={data}
                pagination={{ pageSize: 5 }}
                className="bg-white rounded-lg shadow-md"
            />
        </div>
    );
};

export default CompanyData;
