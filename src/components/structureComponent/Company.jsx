import React, { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import CompanyModal from "./CompanyModal";

const Company = () => {
    const [departments, setDepartments] = useState([]);
    const [visible, setVisible] = useState(false);

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

    const renderTreeNodes = (data) =>
        data.map((department) => (
            <TreeNode key={department.id} label={<div>{department.name}</div>}>
                {department.children.length > 0 && renderTreeNodes(department.children)}
            </TreeNode>
        ));

    return (
        <>
            <div className="flex items-center justify-end space-x-3 mb-4">
                <div className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md shadow-sm active:outline-none">
                    <button type="button">Add user</button>
                </div>
                <div className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm">
                    <button type="button" onClick={showCollectionCreateForm}>
                        Add Department
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <Tree lineColor="red" lineWidth="3px" nodePadding="4rem" label={<div>Company</div>}>
                    {renderTreeNodes(departments)}
                </Tree>
            </div>
            <CompanyModal visible={visible} onCreate={handleCreate} onCancel={handleCancel} departments={departments} />
        </>
    );
};

export default Company;
