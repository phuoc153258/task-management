import * as React from 'react';
import { useState, useEffect } from 'react';

function TableData({ data }: any) {
    return (<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data}
    </td>);
}

export default TableData;