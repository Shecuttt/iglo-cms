import { faEye, faEyeSlash, faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ReactSelect from "react-select";
import { optionDepart, optionPosition, optionRole, optionStatus, workGroup } from "../../data/MyData";

const EmployeeForm = () => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("");

    const handleShowPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            background: "transparent",
            display: "flex",
            flexWrap: "nowrap",
            border: "0px",
        }),
        menu: (provided) => ({
            ...provided,
            background: "white",
            width: "8em",
        }),
    };

    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false); // State baru untuk status upload

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            if (file.type === "image/*") {
                setSelectedImage(URL.createObjectURL(file));
            }
            setIsUploading(true);

            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
                setIsUploading(false); // Tandai status upload sebagai "false" setelah selesai
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ name, id, email, phone, password });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full text-sm overflow-y-auto">
                <div className="flex flex-col items-center">
                    {selectedImage ? (
                        <img src={selectedImage} alt="Uploaded Image" className="w-40 h-40 object-cover rounded-full" />
                    ) : (
                        <div className="w-40 h-40 border border-gray-300 rounded-full flex items-center justify-center text-gray-500">
                            {isUploading ? (
                                <svg className="w-6 h-6 animate-spin" fill="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                </svg>
                            ) : (
                                <label htmlFor="imageInput" className="cursor-pointer">
                                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                                    <span className="ml-2">Pilih Gambar</span>
                                </label>
                            )}
                            <input type="file" id="imageInput" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </div>
                    )}
                </div>
                <div className="my-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                        Name
                    </label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-red-50 px-3 py-2 rounded-md outline-none" autoComplete="off" />
                </div>
                <div className="my-2">
                    <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900">
                        Employee ID
                    </label>
                    <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} className="w-full bg-red-50 px-3 py-2 rounded-md outline-none" autoComplete="off" />
                </div>
                <div className="my-2 flex space-x-2">
                    <div className="w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-red-50 px-3 py-2 rounded-md outline-none" autoComplete="off" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                            Phone
                        </label>
                        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-red-50 px-3 py-2 rounded-md outline-none" autoComplete="off" />
                    </div>
                </div>
                <div className="my-2">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-red-50 px-3 py-2 rounded-md outline-none"
                        />
                        <button className="absolute inset-y-0 right-0 px-3 flex items-center" onClick={handleShowPassword}>
                            {showPassword ? <FontAwesomeIcon icon={faEye} className="w-4 h-4 text-gray-500" /> : <FontAwesomeIcon icon={faEyeSlash} className="w-4 h-4 text-gray-500" />}
                        </button>
                    </div>
                </div>
                <div className="my-2">
                    <span className="block mb-2 text-sm font-medium text-gray-900">Position</span>
                    <ReactSelect id="position" options={optionPosition} className="w-full bg-red-50 p-1 rounded-md" styles={customStyles} />
                </div>
                <div className="my-2">
                    <span className="block mb-2 text-sm font-medium text-gray-900">Department</span>
                    <ReactSelect id="department" options={optionDepart} className="w-full bg-red-50 p-1 rounded-md" styles={customStyles} />
                </div>
                <div className="my-2">
                    <span className="block mb-2 text-sm font-medium text-gray-900">Role</span>
                    <ReactSelect id="role" options={optionRole} className="w-full bg-red-50 p-1 rounded-md" styles={customStyles} />
                </div>
                <div className="my-2">
                    <span className="block mb-2 text-sm font-medium text-gray-900">Work Group</span>
                    <ReactSelect id="workgroup" options={workGroup} className="w-full bg-red-50 p-1 rounded-md" styles={customStyles} />
                </div>
                <div className="my-2">
                    <span className="block mb-2 text-sm font-medium text-gray-900">Status</span>
                    <ReactSelect id="status" options={optionStatus} className="w-full bg-red-50 p-1 rounded-md" styles={customStyles} />
                </div>
                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    );
};

export default EmployeeForm;
