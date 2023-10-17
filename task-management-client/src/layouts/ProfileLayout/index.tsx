import * as React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';

const DefaultLayout = ({
    children,
}: any): JSX.Element | React.ReactNode | any => {

    return (
        <>
            <ToastContainer />
            <Header />

            <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900 h-screen">
                <div className="bg-gray-100 w-full">
                    <div className="container mx-auto py-8">
                        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                            <div className="col-span-4 sm:col-span-3">
                                <Sidebar />
                            </div>
                            <div className="col-span-4 sm:col-span-9">
                                <div className="bg-white shadow rounded-lg p-6 w-full">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DefaultLayout;
