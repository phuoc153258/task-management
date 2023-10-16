import * as React from 'react';
import { useState, useEffect } from 'react';

function Modal({ children }: any) {

    return (
        <div
            id="extralarge-modal"
            tabIndex={-1}
            className={`z-[101] flex justify-center bg-gray-900 bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 w-full md:inset-0 h-modal md:h-full`}
        >
            <div className="mb-5 flex justify-center item-center relative p-4 w-full h-max top-[50px]">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[900px]">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;