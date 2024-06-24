import React from "react";
import { Link } from "react-router-dom";
import ProfileImage from "../assets/person-1.jpg";
import { useAuth } from "./AuthContext";

const MyProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-2 space-y-2 h-fit">
      <h2 className="text-red-700 text-center font-semibold">My Profile</h2>
      <div className="flex justify-center py-2">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img src={user ? user.foto : ProfileImage} alt="User Image" />
        </div>
      </div>
      <div className="text-center pb-2">
        <p className="font-semibold">{user ? user.nama : "User"}</p>
        <p className="text-sm text-red-700">{user ? user.email : "Email"}</p>
      </div>
      <div className="flex flex-col text-center space-y-3">
        <Link
          to={"/userlog"}
          className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded w-full"
        >
          User Log
        </Link>
        <Link
          onClick={logout}
          to={"/login"}
          className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded w-full"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default MyProfile;
