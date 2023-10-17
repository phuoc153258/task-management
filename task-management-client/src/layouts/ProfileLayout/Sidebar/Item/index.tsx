import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Item({ route, title, active = false }: any) {
    return (
        <>
            <li>
                <Link
                    to={route}
                    className={`flex items-center p-4 text-base text-gray-900 rounded-lg hover:bg-gray-200 group ${active && 'bg-gray-200'}`}
                >
                    <svg
                        className={`w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 ${active && 'text-gray-900'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                    </svg>
                    <span className="ml-3">
                        {title}
                    </span>
                </Link>
            </li>
        </>
    );
}

export default Item;