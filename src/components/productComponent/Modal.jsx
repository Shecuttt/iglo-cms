import React, { useState } from "react";

const Modal = ({ show, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        image: "../../assets/person-1.jpg",
        name: "CMS Admin App",
        type: "Prototype",
        version: "1.0.1",
        company_name: "INDOCYBER GLOBAL TECHNOLOGY INDONESIA",
        description:
            "Selamat datang ke aplikasi Dasbor Admin IGLO, aplikasi yang dirancang khusus untuk memudahkan manajemen bisnis Anda. Dengan tampilan yang intuitif dan fitur yang lengkap, aplikasi ini memungkinkan Anda untuk mengawasi dan mengelola berbagai aspek bisnis Anda dengan mudah dan efisien. Dari manajemen stok hingga pelaporan keuangan, aplikasi ini akan membantu Anda untuk mengambil keputusan yang lebih cerdas dan tepat waktu. Bergabunglah dengan kami dan rasakan manfaatnya sendiri!",
        responsible: "200",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            image: file,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                                <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
                            </div>
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input type="text" className="w-full p-2 border rounded" value={formData.name} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-gray-700">Type</label>
                                <input type="text" className="w-full p-2 border rounded" value={formData.type} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-gray-700">Version</label>
                                <input type="text" className="w-full p-2 border rounded" value={formData.version} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-gray-700">Company Name</label>
                                <input type="text" className="w-full p-2 border rounded" value={formData.company_name} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-gray-700">Description</label>
                                <textarea className="w-full p-2 border rounded" rows={3} value={formData.description} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-gray-700">Responsible</label>
                                <input type="text" className="w-full p-2 border rounded" value={formData.responsible} onChange={handleChange} />
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
