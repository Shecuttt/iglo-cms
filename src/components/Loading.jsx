import React from "react";

const Loading = () => {
    return (
        <>
            <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-red-50">
                <div className="loader"></div>
            </div>
        </>
    );
};

export default Loading;
