import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function PasswordInput({ value, onChange }) {
    const [showPassword, setShowPassword] = useState(false);
  
    const handleShowPasswordClick = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <div className="relative">
        <input
          type={showPassword? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder="********"
          className="block w-full mt-1 rounded-md bg-gray-100 p-2 focus:outline-none focus:bg-white focus:ring-red-600 focus:border-red-500 border"
        />
        <button
          type="button"
          onClick={handleShowPasswordClick}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword? (
            <FontAwesomeIcon icon={faEye} className="w-4 h-4 text-gray-500" />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>
    );
  }

  export default PasswordInput