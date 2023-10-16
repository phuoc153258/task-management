import * as React from 'react';
import { useState, useEffect } from 'react';
import TableHeader from './TableHeader';
import TableData from './TableData';
import TableButton from './TableButton';

function Table({ tableHeaders, data }: any) {
    return (
        <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
            <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                    {
                        tableHeaders.map((item: any, index: any) => {
                            return <TableHeader name={item} key={index} />
                        })
                    }
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {data}
            </tbody>
        </table>);
}

export default Table;