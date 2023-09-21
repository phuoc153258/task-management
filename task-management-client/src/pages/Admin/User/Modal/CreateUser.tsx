import * as React from 'react';
import { useState, useEffect } from 'react';
import UserService from '../../../../services/admin/user';
import { toast } from 'react-toastify';

function CreateUser({ setShowModal, isFetchData, setIsFetchData, roles }: any) {
    const [user, setUser] = useState({
        username: '',
        fullname: '',
        email: '',
        password: '',
        role_id: 1
    })
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleCreateUser = async () => {
        try {
            if (confirmPassword !== user.password) return toast('Create user failed');
            await UserService.create(user)
            setShowModal(false)
            setIsFetchData(!isFetchData)
            toast('Create user success');
        } catch (error) {
            toast('Create user failed');
            console.log(error);
        }
    }

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
                            Add user
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
                                Username
                            </label>
                            <input
                                type="text"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                alt="End date..."
                                value={user.username}
                                onChange={(e) => {
                                    setUser({ ...user, username: e.target.value })
                                }}
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <label
                                htmlFor="large-input"
                                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                            >
                                Fullname
                            </label>
                            <input
                                type="text"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                alt="End date..."
                                value={user.fullname}
                                onChange={(e) => {
                                    setUser({ ...user, fullname: e.target.value })
                                }}
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <label
                                htmlFor="large-input"
                                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                alt="End date..."
                                value={user.email}
                                onChange={(e) => {
                                    setUser({ ...user, email: e.target.value })
                                }}
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <label
                                htmlFor="large-input"
                                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                alt="Password..."
                                value={user.password}
                                onChange={(e) => {
                                    setUser({ ...user, password: e.target.value })
                                }}
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <label
                                htmlFor="large-input"
                                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                            >
                                Confirm password
                            </label>
                            <input
                                type="password"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                alt="Confirm password..."
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }}
                            />
                        </div>
                        <div className="mb-6 ">
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                            >
                                Role
                            </label>
                            <select
                                onChange={(e: any) => {
                                    setUser({ ...user, role_id: parseInt(e.target.value) })
                                }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <>
                                    {
                                        roles.map((value: any, index: any) => {
                                            return <option key={index} value={value.id}>{value.name}</option>
                                        })
                                    }
                                </>
                            </select>
                        </div>
                    </div>
                    {/* Modal footer */}
                    <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="text-gray-500 text-base bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200  font-medium px-5 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                handleCreateUser()
                            }}
                            className="text-white text-base bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Create user
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;
