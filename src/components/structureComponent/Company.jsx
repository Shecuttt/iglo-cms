import React, { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import CompanyModal from "./CompanyModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const Company = () => {
  const [departments, setDepartments] = useState([]);
  const [visible, setVisible] = useState(false);
  const [userNames, setUserNames] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [addingChildName, setAddingChildName] = useState({});
  const [editingName, setEditingName] = useState({});
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    // Fetch departments data from API
    axios
      .get("https://iglo-cms-api.xyz/api/organization-structures")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          // Transform the data into a hierarchical structure
          const structuredData = buildHierarchy(data);
          setDepartments(structuredData);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) =>
        console.error("There was an error fetching the departments!", error)
      );
  }, []);

  const buildHierarchy = (data) => {
    const map = {};
    const roots = [];
    data.forEach((item) => {
      map[item.nama_department] = { ...item, children: [] };
    });
    data.forEach((item) => {
      if (item.parent_department) {
        map[item.parent_department].children.push(map[item.nama_department]);
      } else {
        roots.push(map[item.nama_department]);
      }
    });
    return roots;
  };

  const showCollectionCreateForm = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreate = (values) => {
    const { departmentName, parentDepartment } = values;
    const newDepartment = {
      id: `${Date.now()}`,
      nama_department: departmentName,
      parent_department: parentDepartment,
      children: [],
    };

    if (parentDepartment) {
      const addDepartment = (nodes) => {
        nodes.forEach((node) => {
          if (node.nama_department === parentDepartment) {
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

    axios
      .post(
        "https://iglo-cms-api.xyz/api/organization-structures/create",
        newDepartment
      )
      .then((response) =>
        console.log("Department added successfully:", response)
      )
      .catch((error) =>
        console.error("There was an error adding the department!", error)
      );

    setVisible(false);
  };

  const handleAddName = () => {
    setIsAdding(true);
  };

  const handleNameSubmit = () => {
    if (newName) {
      const newUser = { name: newName };
      setUserNames([...userNames, newName]);

      axios
        .post("http://localhost:3001/users", newUser)
        .then((response) => console.log("User added successfully:", response))
        .catch((error) =>
          console.error("There was an error adding the user!", error)
        );

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

      const newUser = { name: newName, departmentId: id };

      axios
        .post("http://localhost:3001/users", newUser)
        .then((response) => console.log("User added successfully:", response))
        .catch((error) =>
          console.error("There was an error adding the user!", error)
        );

      setNewName("");
      setAddingChildName((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  const handleChildNameCancel = (id) => {
    setNewName("");
    setAddingChildName((prevState) => ({ ...prevState, [id]: false }));
  };

  const renderTreeNodes = (data, level = 0) => {
    if (!Array.isArray(data)) {
      console.error("Expected data to be an array, but got:", data);
      return null;
    }
    return data.map((department, index) => {
      const isLastChild = index === data.length - 1; // Check if this is the last child
      return (
        <TreeNode
          key={department.id}
          line={!isLastChild} // Set the line property to false if this is the last child
          label={
            <div
              className={`rounded-lg text-center mx-auto ${
                department.id ? "bg-red-200" : ""
              } ${
                level === 0
                  ? "bg-red-100"
                  : level === 1
                  ? "bg-green-100"
                  : "bg-pink-100"
              }`}
            >
              <div className="w-48 p-4 m-2">
                <div className="flex items-center border-b border-black pb-4">
                  <span className="font-semibold">
                    {department.nama_department}
                  </span>
                  <button
                    className="ml-auto hover:text-red-600"
                    onClick={() => handleAddChildName(department.id)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <ul className="mt-4 text-left">
                  {department.names &&
                    department.names.map((name, index) => (
                      <li key={index} className="mt-1 flex items-center">
                        {name}
                      </li>
                    ))}
                  {addingChildName[department.id] && (
                    <li className="mt-1 flex items-center">
                      <Input
                        value={newName}
                        onPressEnter={() =>
                          handleChildNameSubmit(department.id)
                        }
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Enter name"
                        className="mr-2"
                      />
                      <button className="ml-2 hover:text-red-500">
                        <FontAwesomeIcon
                          icon={faX}
                          onClick={() => handleChildNameCancel(department.id)}
                          className="text-xs"
                        />
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          }
        >
          {department.children.length > 0 &&
            renderTreeNodes(department.children, level + 1)}
        </TreeNode>
      );
    });
  };

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
        <Tree>{renderTreeNodes(departments)}</Tree>
      </div>
      <CompanyModal
        visible={visible}
        onCreate={handleCreate}
        onCancel={handleCancel}
        departments={departments}
      />
    </>
  );
};

export default Company;
