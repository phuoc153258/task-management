import * as React from 'react';
import { useState, useEffect } from 'react';

function TableHeader({ name }: any) {
    return (<th
        scope="col"
        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
    >
        {name}
    </th>);
}

export default TableHeader;