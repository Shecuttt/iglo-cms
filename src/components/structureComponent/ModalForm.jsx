import React from "react";
import ReactDOM from "react-dom";
import EmployeeForm from "./EmployeeForm";

const ModalForm = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" aria-hidden="true"></div>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="text-gray-600" onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" width="20" height="20">
                                <path
                                    fill="currentColor"
                                    d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.19 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.19 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                                    className="close-button-icon"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <EmployeeForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ModalForm;
