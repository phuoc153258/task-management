import * as React from 'react';
import { useState, useEffect } from 'react';

function FormInput({ title, type, placeholder }: any) {
    return (
        <>
            <label
                className="block mb-2 text-lg text-gray-600 dark:text-gray-400"
            >
                {title}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500 text-lg"
            />
        </>
    );
}

export default FormInput;