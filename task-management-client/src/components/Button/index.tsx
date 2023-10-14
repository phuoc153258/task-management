import * as React from 'react';
import { useState, useEffect } from 'react';

function Button({ title, callback, isDisabled }: any) {
    return (
        <button disabled={isDisabled}
            type="button"
            onClick={callback}
            className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out"
        >
            {title}
        </button>
    );
}

export default Button;
