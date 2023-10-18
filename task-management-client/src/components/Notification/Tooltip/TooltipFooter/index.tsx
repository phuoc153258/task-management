import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import route from '../../../../routes/web/route';

function TooltipFooter() {
    return (
        <>
            <Link to={route.notification} className="block rounded-b-xl bg-gray-50 py-2 text-center text-base font-normal text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline">
                <div className="inline-flex items-center gap-x-2">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 20 20" className="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span>
                        View all
                    </span>
                </div>
            </Link>
        </>
    );
}

export default TooltipFooter;