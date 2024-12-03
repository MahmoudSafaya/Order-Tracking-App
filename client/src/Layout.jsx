import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar'
import { useAuth } from './context/AuthContext';

const Layout = () => {
    const { auth } = useAuth();

    if (!auth) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="app-layout">
            <Header />
            <Sidebar />
            <main className="app-content">
                <Outlet /> {/* Render the specific route's component */}
            </main>
        </div>
    );
};

export default Layout;
