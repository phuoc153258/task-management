import * as React from 'react';
import { useState, useEffect } from 'react';
import DateTimePicker from '../../../components/DateTimePicker';

function CreateLeaveRequest({ showModal, setShowModal }: any) {
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
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-white m-0">
                            Add leave request
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
                        <div className="mb-6">
                            <label
                                htmlFor="large-input"
                                className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                            >
                                Mô tả về khóa học
                            </label>
                            <textarea
                                id="message"
                                rows={2}
                                className="block p-2 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Mô tả về khóa học..."
                            ></textarea>
                        </div>

                        <div className="mb-6 ">
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                            >
                                Khóa học Pro
                            </label>
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="1">Có</option>
                                <option value="2">Không</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <DateTimePicker />
                            <label
                                htmlFor="large-input"
                                className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
                            >
                                Giá
                            </label>
                            <input
                                type="text"
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                alt="Tên khóa học..."
                            />
                        </div>
                    </div>
                    {/* Modal footer */}
                    <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="text-gray-500 text-base bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200  font-medium px-5 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            className="text-white text-base bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Tạo khóa học
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateLeaveRequest;
