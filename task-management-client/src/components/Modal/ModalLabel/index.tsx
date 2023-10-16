import * as React from 'react';
import { useState, useEffect } from 'react';

function ModalLabel({ title }: any) {
    return (
        <label
            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
            {title}
        </label>
    );
}

export default ModalLabel;