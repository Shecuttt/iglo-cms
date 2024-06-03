import React from "react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import NotFound from "../components/NotFound";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Contoh penggunaan timeout untuk simulasi loading data
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Membersihkan timeout saat komponen dibongkar
        return () => clearTimeout(timeout);
    }, []);
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="flex">
                    {/* Sidebar */}
                    <Sidebar />
                    {/* Main */}
                    <main className="w-full bg-red-50">
                        <TopNav />
                        <NotFound />
                    </main>
                </div>
            )}
        </>
    );
};

export default Dashboard;
