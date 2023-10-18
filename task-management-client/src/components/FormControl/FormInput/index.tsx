import * as React from 'react';
import { useState, useEffect } from 'react';

function FormInput({ type, placeholder, readOnly, value, callback }: any) {
    return (
        <input
            type={type}
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            alt={placeholder}
            readOnly={readOnly}
            value={value}
            onChange={callback}
        />
    );
}

export default FormInput;