import * as React from 'react';
import { useState, useEffect } from 'react';

function Button({ title, callback, isDisabled, styles = 'bg-indigo-500 rounded-md hover:bg-indigo-600' }: any) {
    return (
        <button disabled={isDisabled}
            type="button"
            onClick={callback}
            className={`w-full px-2 py-3 text-base text-white focus:outline-none duration-100 ease-in-out ${styles}`}
        >
            {title}
        </button>
    );
}

export default Button;
