import * as React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import { isHaveRole } from '../../utils';
import { ROLE_ADMIN, ROLE_LEADER, ROLE_MANAGER } from '../../constants/user';
import { useNavigate } from 'react-router-dom';
import route from '../../routes/web/route';

const DefaultLayout = ({
    children,
}: any): JSX.Element | React.ReactNode | any => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuth = isHaveRole([ROLE_ADMIN, ROLE_MANAGER, ROLE_LEADER]);
        if (!isAuth) navigate(route.home);
    }, [navigate])

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
