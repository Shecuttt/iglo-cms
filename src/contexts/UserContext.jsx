import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const addUser = (user) => {
        setUsers((prevUsers) => [...prevUsers, user]);
    };

    return <UserContext.Provider value={{ users, addUser }}>{children}</UserContext.Provider>;
};
