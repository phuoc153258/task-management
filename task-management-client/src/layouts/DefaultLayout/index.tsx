import * as React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DefaultLayout = ({
    children,
}: any): JSX.Element | React.ReactNode | any => {
    return (
        <>
            <ToastContainer />
            <Header />
            <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
                <Sidebar />

                <div className="relative h-full w-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
                    <main>{children}</main>
                </div>
            </div>
        </>
    );
};

export default DefaultLayout;
