import React, { useState } from "react";
import ModalForm from "./ModalForm";
// import DataTable from "react-data-table-component";
import { userList } from "../../data/MyData";
import Swal from "sweetalert2";

const Employee = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const [userData, setUserData] = useState(userList);
    const [newUser, setNewUser] = useState("");

    const deleteAlert = (id) => {
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

    const handleSubmit = (e) => {
        console.log("Submitted");
    };

    // const columns = [
    //     {
    //         name: "Photo",
    //         selector: (row) => row.photo,
    //         cell: (row) => <img src={row.photo} alt="Profile Image" className="w-8 h-8 rounded-full my-2 overflow-hidden object-cover" />,
    //         sortable: false,
    //         width: "7%",
    //     },
    //     {
    //         name: "Name",
    //         selector: (row) => row.name,
    //         sortable: true,
    //     },
    //     {
    //         name: "Email",
    //         selector: (row) => row.email,
    //         sortable: true,
    //         width: "25%",
    //     },
    //     {
    //         name: "Phone",
    //         selector: (row) => row.phone,
    //     },
    //     {
    //         name: "Position",
    //         selector: (row) => row.position,
    //         sortable: true,
    //     },
    //     {
    //         name: "Department",
    //         selector: (row) => row.department,
    //         sortable: true,
    //     },
    //     {
    //         name: "Action",
    //         selector: (row) => row.action,
    //         width: "15%",
    //         cell: (row) => (
    //             <div className="flex space-x-1">
    //                 <button className="bg-red-100 hover:bg-red-200 px-4 py-2 rounded-md text-red-900" onClick={() => handleOpenModal(userList.row)}>
    //                     Edit
    //                 </button>
    //                 <button className="bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md text-white" onClick={() => deleteAlert(userList.id)}>
    //                     Delete
    //                 </button>
    //             </div>
    //         ),
    //     },
    // ];

    return (
        <>
            <ModalForm newUser={newUser} setNewUser={setNewUser} handleSubmit={handleSubmit} isOpen={modalOpen} onClose={handleCloseModal} />
            <div className="flex items-center justify-end space-x-3 mb-4">
                <div className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md shadow-sm active:outline-none">
                    <button type="button" onClick={handleOpenModal}>
                        Add user
                    </button>
                </div>
                <div className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm">
                    <button type="button">Import</button>
                </div>
            </div>
            {/* {userList.length ? (
                <div className="my-4 rounded-lg shadow-md">
                    <DataTable className="odd:bg-red-50 even:bg-white" columns={columns} data={userList} pagination fixedHeader></DataTable>
                </div>
            ) : (
                <div className="my-4 shadow-md">
                    <DataTable />
                </div>
            )} */}
            <div className="w-full bg-white rounded-xl p-6">
                <table className="w-full text-sm px-6">
                    {/* <!-- Table header --> */}
                    <thead className="text-white bg-red-800 text-left">
                        <tr>
                            <th scope="col" className="px-4 py-3">
                                Photo
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Position
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Department
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>

                    {/* <!-- Table content --> */}
                    {userData.length ? (
                        <tbody>
                            {userData.map((data) => (
                                <tr key={`row_${data.id}`} className="odd:bg-white even:bg-red-50 border-b">
                                    <td className="px-4 py-2">
                                        <img src={data.photo} alt="Profile Image" className="w-8 h-8 rounded-full my-2 overflow-hidden object-cover" />
                                    </td>
                                    <td className="px-4 py-2">{data.name}</td>
                                    <td className="px-4 py-2">{data.email}</td>
                                    <td className="px-4 py-2">{data.phone}</td>
                                    <td className="px-4 py-2">{data.position}</td>
                                    <td className="px-4 py-2">{data.department}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center space-x-2">
                                            <button className="bg-red-100 hover:bg-red-200 px-4 py-2 rounded-md text-red-900" onClick={() => handleOpenModal(userList.row)}>
                                                Edit
                                            </button>
                                            <button className="bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md text-white" onClick={() => deleteAlert(data.id)}>
                                                Delete
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
                        <span>
                            {userData.length} {userData.length === 1 ? "user" : "users"}
                        </span>
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
            </div>
        </>
    );
};

export default Employee;
