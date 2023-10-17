import * as React from 'react';
import { useState, useEffect } from 'react';
import { useStore } from '../../../hooks';
import { ENV } from '../../../config';
import { Logout, isAuthenticate } from '../../../utils';
import { actions } from '../../../store';
import { Link, useNavigate } from 'react-router-dom';
import route from '../../../routes/web/route';

function Header() {
    const [state, dispatch] = useStore();
    const [show, setShow] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isAuth = isAuthenticate();
        if (!isAuth) navigate('/login');
        setShowHeader(true);
    }, [navigate]);

    if (!showHeader) return <></>;
    return (
        <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button
                            aria-expanded="true"
                            aria-controls="sidebar"
                            className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <svg
                                className="hidden w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <Link to={route.home} className="flex ml-2 md:mr-24">
                            <img
                                src="https://flowbite-admin-dashboard.vercel.app/images/logo.svg"
                                className="h-8 mr-3"
                                alt="FlowBite Logo"
                            />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                Flowbite
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        {/* Profile */}
                        <div className="flex items-center ml-3">
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShow(!show);
                                    }}
                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                >
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={
                                            ENV.apiUrl +
                                            '/' +
                                            state.currentUser.avatar
                                        }
                                        alt=""
                                    />
                                </button>
                                <div
                                    className={`absolute ${show ? '' : 'hidden'
                                        } top-5 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                                >
                                    <div className="px-4 py-3" role="none">
                                        <p
                                            className="text-sm text-gray-900 dark:text-white"
                                            role="none"
                                        >
                                            {state.currentUser.fullname}
                                        </p>
                                        <p
                                            className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                            role="none"
                                        >
                                            {state.currentUser.email}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <Link
                                                to={route.home}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={route.profile}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <span
                                                className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={() => {
                                                    Logout();
                                                    dispatch(
                                                        actions.userLogIn(''),
                                                    );
                                                    dispatch(
                                                        actions.setCurrentUserInfo(
                                                            undefined,
                                                        ),
                                                    );
                                                    navigate('/login');
                                                }}
                                            >
                                                Logout
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
