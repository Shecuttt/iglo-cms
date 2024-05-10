import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    };

    // error: doesn't go back to prev. page

    return (
        <div className="mx-8 mt-8">
            <button onClick={handleClick} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-red-700">
                <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3 me-2.5" />
                Kembali
            </button>
        </div>
    );
}

export default BackButton;
