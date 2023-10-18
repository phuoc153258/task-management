import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import route from '../../../../routes/web/route';
import { isAdminPage } from '../../../../helpers';

function Logo() {
    const location = useLocation().pathname

    return (
        <>
            <Link to={route.home} className="flex ml-2 md:mr-24">
                <img
                    src="https://flowbite-admin-dashboard.vercel.app/images/logo.svg"
                    className="h-8 mr-3"
                    alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                    {isAdminPage(location) ? 'Admin' : 'Flowbite'}
                </span>
            </Link>
        </>
    );
}

export default Logo;