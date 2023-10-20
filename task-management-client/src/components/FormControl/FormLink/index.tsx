import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FormLink({ route, styles, title }: any) {
    return (
        <>
            <Link
                to={route}
                className={`text-white px-5 py-2.5 focus:ring-4 font-medium rounded-lg text-base focus:outline-none ${styles}`}
            >
                {title}
            </Link>
        </>
    );
}

export default FormLink;