import * as React from 'react';
import { useState, useEffect } from 'react';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';

function AuthLayout({ children }: any) {
    return (
        <>
            <ToastContainer />
            <div className="flex justify-center min-h-screen items-center bg-gray-100">
                <div className="container max-w-xl border-2 border-gray-200 p-6 bg-white rounded-xl shadow-lg">
                    {children}
                    <Footer />
                </div>
            </div>
        </>);
}

export default AuthLayout;