import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Item({ route = null, title }: any) {
    return (
        <>
            <li>
                {
                    route !== null ?
                        <Link
                            to={route}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            {title}
                        </Link>
                        : title
                }
            </li >
        </>
    );
}

export default Item;