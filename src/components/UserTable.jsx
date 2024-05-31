import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { userList } from "../data/MyData";

const UserTable = (userData, setUserData) => {
    useState(userList);
    const confirmDel = (id) => {
        Swal.fire({
            icon: "question",
            title: "Hapus data?",
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                const listData = userData.filter((data) => data.id !== id);
                setUserData(listData);
                localStorage.setItem("userlist", JSON.stringify(listData));
                Swal.fire("Berhasil dihapus", "", "success");
            }
        });
    };

    return (
        <>
            <table className="w-full text-sm px-6">
                {/* <!-- Table header --> */}
                <thead className="text-white bg-red-800 text-left">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nama
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>

                {/* <!-- Table content --> */}
                {userData.length ? (
                    <tbody>
                        {userData.map((data, index) => (
                            <tr key={`row_${index}_${data.id}`} className="odd:bg-white even:bg-red-50 border-b">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{data.name}</td>
                                <td className="px-6 py-4">{data.email}</td>
                                <td className="px-6 py-4">{data.position}</td>
                                <td className="px-6 py-4">
                                    {data.status === "Active" ? (
                                        <span className="bg-green-200 hover:bg-green-400 text-green-800 rounded-full py-2 px-4">{data.status}</span>
                                    ) : (
                                        <span className="bg-red-200 hover:bg-red-400 text-red-800 rounded-full py-2 px-4">{data.status}</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <Link to={"/readonly"} className="rounded-full text-white bg-blue-600 hover:bg-blue-800 active:text-blue-600 active:bg-white flex items-center">
                                            <FontAwesomeIcon icon={faEye} className="p-2 items-center" />
                                        </Link>
                                        <Link to={"/edit"} className="rounded-full text-white bg-green-600 hover:bg-green-800 active:text-green-600 active:bg-white flex items-center">
                                            <FontAwesomeIcon icon={faPenToSquare} className="p-2" />
                                        </Link>
                                        <button
                                            onClick={() => confirmDel(data.id)}
                                            className="rounded-full text-white bg-red-600 hover:bg-red-800 active:text-red-600 active:bg-white flex items-center"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="p-2" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <div className="my-8">No Data Found</div>
                )}
            </table>
            <div className="flex items-center justify-end bg-red-800 text-white">
                <div className="mr-auto ml-6 text-sm">
                    {userData.length ? (
                        <span>
                            Showing {userData.length} {userData.length === 1 ? "user" : "users"}
                        </span>
                    ) : (
                        <span></span>
                    )}
                </div>
                <div className="p-2 text-sm">
                    <nav className="flex items-center space-x-1">
                        <button
                            type="button"
                            className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <span aria-hidden="true">«</span>
                            <span className="sr-only">Previous</span>
                        </button>
                        <button
                            type="button"
                            className="min-w-10 flex justify-center items-center text-white hover:bg-white/10 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
                            aria-current="page"
                        >
                            1
                        </button>
                        <button
                            type="button"
                            className="min-w-10 flex justify-center items-center text-white hover:bg-white/10 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
                        >
                            2
                        </button>
                        <button
                            type="button"
                            className="min-w-10 flex justify-center items-center text-white hover:bg-white/10 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
                        >
                            3
                        </button>
                        <button
                            type="button"
                            className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <span className="sr-only">Next</span>
                            <span aria-hidden="true">»</span>
                        </button>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default UserTable;
