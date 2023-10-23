import * as React from 'react';
import { useState, useEffect } from 'react';

function FormTextArea({ placeholder, callback, value, rows = 2, readOnly = false }: any) {
    return (
        <textarea
            rows={rows}
            className="block p-2 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeholder}
            onChange={callback}
            value={value}
            readOnly={readOnly}
        >
        </textarea>
    );
}

export default FormTextArea;