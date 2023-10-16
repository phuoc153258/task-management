import * as React from 'react';
import { useState, useEffect } from 'react';

function PaginateFooter({ paginate, setPaginate, isFetchData, setIsFetchData }: any) {
    return (
        <>
            <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center mb-4 sm:mb-0">
                    <button
                        onClick={async () => {
                            if (paginate.page > 1) {
                                setIsFetchData(!isFetchData);
                                setPaginate({
                                    ...paginate,
                                    page: paginate.page - 1,
                                });
                            }
                        }}
                        className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={async () => {
                            if (paginate.page < paginate.last_page) {
                                setIsFetchData(!isFetchData);
                                setPaginate({
                                    ...paginate,
                                    page: paginate.page + 1,
                                });
                            }
                        }}
                        className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Showing page <span className="font-semibold text-gray-900 dark:text-white">
                            {paginate.page}
                        </span> of <span className="font-semibold text-gray-900 dark:text-white">
                            {paginate.last_page}
                        </span> - Total <span className="font-semibold text-gray-900 dark:text-white">
                            {paginate.total}
                        </span> records
                    </span>
                </div>
            </div>
        </>
    );
}

export default PaginateFooter;