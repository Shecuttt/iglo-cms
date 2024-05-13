import React, { useState } from "react";
import ModalEdit from "./ModalEdit";

const Employee = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className="flex items-center justify-end space-x-3">
                <div className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm">
                    <button type="button">Add user</button>
                </div>
                <div className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm">
                    <button type="button">Filter</button>
                </div>
                <div className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm">
                    <button type="button">Import</button>
                </div>
            </div>
            <div className="py-4">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="bg-red-700 text-white py-4 text-sm">Photo</th>
                            <th className="bg-red-700 text-white py-4 text-sm">Name</th>
                            <th className="bg-red-700 text-white py-4 text-sm">Email</th>
                            <th className="bg-red-700 text-white py-4 text-sm">Phone</th>
                            <th className="bg-red-700 text-white py-4 text-sm">Position</th>
                            <th className="bg-red-700 text-white py-4 text-sm">Department</th>
                            <th className="bg-red-700 text-white py-4 text-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white text-center text-sm">
                            <td className="py-2">
                                <img
                                    src="https://images.unsplash.com/photo-1700585560129-2c03e2a3f511?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                                    alt="Profile Image"
                                    className="w-8 h-8 rounded-full mx-auto my-2 overflow-hidden object-cover"
                                />
                            </td>
                            <td className="py-2">William Smith</td>
                            <td className="py-2">william12345@example.com</td>
                            <td className="py-2">08123456789</td>
                            <td className="py-2">Head of Marketing</td>
                            <td className="py-2">Marketing</td>
                            <td className="py-2">
                                <button onClick={handleOpenModal} className="bg-red-700 px-4 py-2 rounded-md text-white">
                                    Edit
                                </button>
                                <ModalEdit isOpen={modalOpen} onClose={handleCloseModal} />
                            </td>
                        </tr>
                        <tr className="bg-white text-center text-sm">
                            <td className="py-2">
                                <img
                                    src="https://images.unsplash.com/photo-1700585560129-2c03e2a3f511?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                                    alt="Profile Image"
                                    className="w-8 h-8 rounded-full mx-auto my-2 overflow-hidden object-cover"
                                />
                            </td>
                            <td className="py-2">William Smith</td>
                            <td className="py-2">william12345@example.com</td>
                            <td className="py-2">08123456789</td>
                            <td className="py-2">Head of Marketing</td>
                            <td className="py-2">Marketing</td>
                            <td className="py-2">
                                <button onClick={handleOpenModal} className="bg-red-700 px-4 py-2 rounded-md text-white">
                                    Edit
                                </button>
                                <ModalEdit isOpen={modalOpen} onClose={handleCloseModal} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* pagination */}
                <div className="flex flex-row space-x-5 justify-between py-4 px-8"></div>
            </div>
        </>
    );
};

export default Employee;
