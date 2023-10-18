import * as React from 'react';
import { useState, useEffect } from 'react';
import { useStore } from '../../../hooks';
import { ENV } from '../../../config';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Dropdown from './Dropdown';
import { isAuthenticate } from '../../../utils';

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
                        <Logo />
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
                                <Dropdown show={show} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
