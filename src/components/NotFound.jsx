import React from "react";

function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-red-500 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Page not found</h2>
                <p className="text-gray-600 mb-4">The page you are looking for does not exist.</p>
                <button
                    className="bg-red-500 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all.15s ease" }}
                >
                    Go to homepage
                </button>
            </div>
        </div>
    );
}

export default NotFound;
