import * as React from 'react';
import { useState, useEffect } from 'react';

function ModalSelect({ callback, data }: any) {
    return (
        <select
            onChange={callback}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
            {data}
        </select>
    );
}

export default ModalSelect;