import React, { useState } from "react";
import Modal from "./Modal";

const ProdMan = () => {
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

    const sortedProducts = React.useMemo(() => {
        let sortableProducts = [...products];
        if (sortConfig.key !== null) {
            sortableProducts.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableProducts;
    }, [products, sortConfig]);

    const requestSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    const getClassNamesFor = (key) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === key ? sortConfig.direction : undefined;
    };

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
                            <th className="px-4 py-2 border cursor-pointer" onClick={() => requestSort("image")}>
                                Logo
                            </th>
                            <th className="px-4 py-2 border cursor-pointer" onClick={() => requestSort("name")}>
                                Product Name
                                <span className={getClassNamesFor("name")}></span>
                            </th>
                            <th className="px-4 py-2 border cursor-pointer" onClick={() => requestSort("version")}>
                                Version
                                <span className={getClassNamesFor("version")}></span>
                            </th>
                            <th className="px-4 py-2 border cursor-pointer" onClick={() => requestSort("type")}>
                                Type
                                <span className={getClassNamesFor("type")}></span>
                            </th>
                            <th className="px-4 py-2 border cursor-pointer" onClick={() => requestSort("description")}>
                                Description
                                <span className={getClassNamesFor("description")}></span>
                            </th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts.length > 0 ? (
                            sortedProducts.map((product, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 flex justify-center">{product.image && <img src={product.image} alt="Product" className="w-12 h-12 overflow-hidden rounded-full" />}</td>
                                    <td className="px-4 py-2 border">{product.name}</td>
                                    <td className="px-4 py-2 border">{product.version}</td>
                                    <td className="px-4 py-2 border">{product.type}</td>
                                    <td className="px-4 py-2 border">{product.description}</td>
                                    <td className="px-4 py-2 border">
                                        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800">
                                            Edit
                                        </button>
                                    </td>
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
