import React, { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import CompanyModal from "./CompanyModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";

const Company = () => {
    const [departments, setDepartments] = useState([]);
    const [visible, setVisible] = useState(false);
    const [userNames, setUserNames] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState("");
    const [addingChildName, setAddingChildName] = useState({});

    useEffect(() => {
        // Fetch your departments data here and set it in the state
        // Example static data
        const initialDepartments = [
            { id: "1", name: "HR", children: [] },
            { id: "2", name: "IT", children: [] },
        ];
        setDepartments(initialDepartments);
    }, []);

    const showCollectionCreateForm = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleCreate = (values) => {
        const { departmentName, parentDepartment } = values;
        const newDepartment = { id: `${Date.now()}`, name: departmentName, children: [] };

        if (parentDepartment) {
            const addDepartment = (nodes) => {
                nodes.forEach((node) => {
                    if (node.id === parentDepartment) {
                        node.children.push(newDepartment);
                    } else if (node.children.length) {
                        addDepartment(node.children);
                    }
                });
            };
            setDepartments((prevDepartments) => {
                const updatedDepartments = [...prevDepartments];
                addDepartment(updatedDepartments);
                return updatedDepartments;
            });
        } else {
            setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
        }

        setVisible(false);
    };

    const handleAddName = () => {
        setIsAdding(true);
    };

    const handleNameSubmit = () => {
        if (newName) {
            setUserNames([...userNames, newName]);
            setNewName("");
            setIsAdding(false);
        }
    };

    const handleNameCancel = () => {
        setNewName("");
        setIsAdding(false);
    };

    const handleAddChildName = (id) => {
        setAddingChildName((prevState) => ({ ...prevState, [id]: true }));
    };

    const handleChildNameSubmit = (id) => {
        if (newName) {
            const addNameToDepartment = (nodes) => {
                nodes.forEach((node) => {
                    if (node.id === id) {
                        if (!node.names) {
                            node.names = [];
                        }
                        node.names.push(newName);
                    } else if (node.children.length) {
                        addNameToDepartment(node.children);
                    }
                });
            };

            setDepartments((prevDepartments) => {
                const updatedDepartments = [...prevDepartments];
                addNameToDepartment(updatedDepartments);
                return updatedDepartments;
            });

            setNewName("");
            setAddingChildName((prevState) => ({ ...prevState, [id]: false }));
        }
    };

    const handleChildNameCancel = (id) => {
        setNewName("");
        setAddingChildName((prevState) => ({ ...prevState, [id]: false }));
    };

    const renderTreeNodes = (data, level = 0) =>
        data.map((department) => (
            <TreeNode
                key={department.id}
                label={
                    <div className={`rounded-lg p-4 m-2 text-center mx-auto ${department.id ? "bg-red-200" : ""} ${level === 0 ? "bg-red-100" : level === 1 ? "bg-green-100" : "bg-pink-100"}`}>
                        <div className="rounded-lg p-4 m-2">
                            <div className="flex items-center border-b border-black pb-4">
                                <span className="font-semibold">{department.name}</span>
                                <button className="ml-auto hover:text-red-600" onClick={handleAddChildName(department.id)}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <ul className="mt-4 text-left">
                                {department.names &&
                                    department.names.map((name, index) => (
                                        <li key={index} className="mt-1">
                                            {name}
                                        </li>
                                    ))}
                                {addingChildName[department.id] && (
                                    <li className="mt-1 flex items-center">
                                        <Input
                                            value={newName}
                                            onPressEnter={() => handleChildNameSubmit(department.id)}
                                            onChange={(e) => setNewName(e.target.value)}
                                            placeholder="Enter name"
                                            className="mr-2"
                                        />
                                        <button className="ml-2 hover:text-red-500">
                                            <FontAwesomeIcon icon={faX} onClick={() => handleChildNameCancel(department.id)} className="text-xs" />
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                }
            >
                {department.children.length > 0 && renderTreeNodes(department.children, level + 1)}
            </TreeNode>
        ));

    return (
        <>
            <div className="flex items-center justify-end space-x-3 mb-4">
                <div className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md shadow-sm active:outline-none">
                    <Link to={"/adduser"}>
                        <button type="button">Add user</button>
                    </Link>
                </div>
                <div className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md shadow-sm active:outline-none">
                    <button type="button" onClick={showCollectionCreateForm}>
                        Add Department
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <Tree
                    lineColor="red"
                    lineWidth="3px"
                    nodePadding="4rem"
                    label={
                        <div className="rounded-lg p-4 m-2 bg-red-300 w-1/2 text-center mx-auto">
                            <div className="flex items-center border-b border-black pb-4">
                                <span className="font-semibold">Company</span>
                                <button className="ml-auto hover:text-red-600" onClick={handleAddName}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <ul className="mt-4 text-left">
                                {userNames.map((name, index) => (
                                    <li key={index} className="mt-1">
                                        {name}
                                    </li>
                                ))}
                                {isAdding && (
                                    <li className="mt-1 flex items-center">
                                        <Input value={newName} onPressEnter={handleNameSubmit} onChange={(e) => setNewName(e.target.value)} placeholder="Enter name" />
                                        <button className="ml-2 hover:text-red-500">
                                            <FontAwesomeIcon icon={faX} onClick={handleNameCancel} className="text-xs" />
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
                >
                    {renderTreeNodes(departments)}
                </Tree>
            </div>
            <CompanyModal visible={visible} onCreate={handleCreate} onCancel={handleCancel} departments={departments} />
        </>
    );
};

export default Company;
