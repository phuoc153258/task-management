import * as React from 'react';
import { useState, useEffect } from 'react';

function PaginateSearch({ callback }: any) {
    return (
        <>
            <div className="sm:pr-3">
                <label
                    htmlFor="products-search"
                    className="sr-only"
                >
                    Search
                </label>
                <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                    <input
                        type="text"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search..."
                        onChange={callback}
                    />
                </div>
            </div>
        </>
    );
}

export default PaginateSearch;