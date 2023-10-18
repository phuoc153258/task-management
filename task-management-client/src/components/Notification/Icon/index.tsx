import * as React from 'react';
import { useState, useEffect } from 'react';

function Icon({ callback }: any) {
    return (
        <>
            <div className="w-fit dark:text-white" onClick={callback}>
                <button className="flex items-center">
                    <span className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="sr-only">Notifications</span>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 20 20" className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                    </span>
                </button>
            </div>
        </>
    );
}

export default Icon;