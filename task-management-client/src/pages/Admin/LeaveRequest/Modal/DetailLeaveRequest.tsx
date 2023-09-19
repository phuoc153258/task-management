import * as React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


function DetailLeaveRequest({ setShowModal, isFetchData, setIsFetchData, leaveRequest, handleUpdateStatus }: any) {

    return (
        <div
            id="extralarge-modal"
            tabIndex={-1}
            className={`z-[101] flex justify-center bg-gray-900 bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  w-full md:inset-0 h-modal md:h-full`}
        >
            <div className="mb-5 flex justify-center item-center  relative p-4 w-full h-max top-[50px]">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[900px]">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white m-0">
                            Details leave request
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => setShowModal(false)}
                        >
                            <svg
                                aria-hidden="true"
                                className="w-10 h-10"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-6 space-y-6">
                        <div className="mb-6 w-full">
                            <label
                                htmlFor="large-input"
                                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                            >
                                Leave request type
                            </label>
                            <input
                                type="text"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                alt="Leave request type..."
                                value={leaveRequest.leave_request_type_id}
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <label
                                htmlFor="large-input"
                                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                            >
                                Start date
                            </label>
                            <input
                                type="text"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                alt="Start date..."
                                value={leaveRequest.start_date}
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <label
                                htmlFor="large-input"
                                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                            >
                                End date
                            </label>
                            <input
                                type="text"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                alt="End date..."
                                value={leaveRequest.end_date}
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <label
                                htmlFor="large-input"
                                className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                            >
                                Content
                            </label>
                            <textarea
                                id="message"
                                rows={2}
                                className="block p-2 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Content..."
                                value={leaveRequest.content}
                            ></textarea>
                        </div>
                    </div>
                    {/* Modal footer */}
                    <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            type="button"
                            onClick={() => {
                                handleUpdateStatus(leaveRequest.id, 1)
                                setShowModal(false)
                            }}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-lime-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path
                                    fillRule="evenodd"
                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Accept
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                handleUpdateStatus(leaveRequest.id, 2)
                                setShowModal(false)
                            }}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailLeaveRequest;
