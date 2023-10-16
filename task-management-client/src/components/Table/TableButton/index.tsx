import * as React from 'react';
import { useState, useEffect } from 'react';

function TableButton({ styles, callback, svg, title }: any) {
    return (<>
        <button
            type="button"
            onClick={callback}
            className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 ${styles}`}
        >
            {svg}
            {title}
        </button>
    </>);
}

export default TableButton;