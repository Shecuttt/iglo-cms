import React, { useState } from "react";

const Modal = ({ show, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "CMS",
        type: "Product",
        version: "1.0.0",
        company_name: "IGLO",
        description: "Nothing",
        responsible: "1",
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedFile) {
            formData.image = preview;
        }
        onSubmit(formData);
        onClose();
    };

    if (!show) return null;
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg w-1/2 h-full overflow-y-scroll p-8 hide-scrollbar">
                    <div className="flex justify-between items-center pb-4 border-b">
                        <h2 className="text-2xl font-semibold">Add Product</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            &times;
                        </button>
                    </div>
                    <form className="mt-4 text-sm" onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <label className="block text-gray-700">Image</label>
                                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />
                                {preview && (
                                    <div className="mt-2">
                                        <img src={preview} alt="Selected" className="h-32 w-32 object-cover rounded-full flex justify-center" />
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700">Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Version</label>
                                    <input type="text" name="version" value={formData.version} onChange={handleChange} className="w-full p-2 border rounded" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700">Type</label>
                                    <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
                                        <option value="">Select Type</option>
                                        <option value="PRODUCT">PRODUCT</option>
                                        <option value="SERVICE">SERVICE</option>
                                        <option value="OTHER">OTHER</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Company Name</label>
                                    <select name="company_name" value={formData.company_name} onChange={handleChange} className="w-full p-2 border rounded">
                                        <option value="">Select Company</option>
                                        <option value="INDOCYBER GLOBAL TECHNOLOGY">INDOCYBER GLOBAL TECHNOLOGY</option>
                                        <option value="TECH COMPANY A">TECH COMPANY A</option>
                                        <option value="TECH COMPANY B">TECH COMPANY B</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" rows={5}></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-700">Responsible</label>
                                <input type="text" name="responsible" value={formData.responsible} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Search Name" />
                            </div>
                            <div className="flex space-x-2 mt-4">
                                <div className="flex-1 flex items-center justify-center border p-2 rounded cursor-pointer hover:bg-gray-100">
                                    <span className="text-red-500">PORTFOLIO</span>
                                </div>
                                <div className="flex-1 flex items-center justify-center border p-2 rounded cursor-pointer hover:bg-gray-100">
                                    <span className="text-red-500">USER GUIDE</span>
                                </div>
                                <div className="flex-1 flex items-center justify-center border p-2 rounded cursor-pointer hover:bg-gray-100">
                                    <span className="text-red-500">PORTFOLIO</span>
                                </div>
                                <div className="flex items-center justify-center border p-2 rounded cursor-pointer hover:bg-gray-100">
                                    <span className="text-red-500">+</span>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modal;
