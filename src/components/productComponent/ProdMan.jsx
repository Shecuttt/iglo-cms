import React, { useState } from "react";
import Modal from "./Modal";

const ProdMan = () => {
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([]);

    const handleAddProduct = (product) => {
        setProducts((prev) => [...prev, product]);
    };
    return (
        <>
            <div className="p-8">
                <h1 className="font-bold text-red-800 text-xl uppercase">Product Management</h1>
            </div>
            <div className="mx-8 flex">
                <button onClick={() => setShowModal(true)} className="flex px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800">
                    + Add Product
                </button>
                <div className="flex flex-row space-x-3 ml-auto">
                    <button className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800">Filters</button>
                    <button className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800">Import</button>
                </div>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddProduct} />
            <div className="m-8">
                <table className="min-w-full bg-white border text-sm">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Logo</th>
                            <th className="px-4 py-2 border">Product Name</th>
                            <th className="px-4 py-2 border">Version</th>
                            <th className="px-4 py-2 border">Type</th>
                            <th className="px-4 py-2 border">Description</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border">
                                        <img src={product.image} className="w-12 h-12 overflow-hidden rounded-full"></img>
                                    </td>
                                    <td className="px-4 py-2 border">{product.name}</td>
                                    <td className="px-4 py-2 border">{product.version}</td>
                                    <td className="px-4 py-2 border">{product.type}</td>
                                    <td className="px-4 py-2 border">{product.description}</td>
                                    <td className="px-4 py-2 border">{product.responsible}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-2 border" colSpan="6">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ProdMan;
