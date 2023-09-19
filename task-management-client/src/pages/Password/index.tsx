import * as React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import UserService from '../../services/user';

function Password() {
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleUpdateUser = async () => {
        try {
            if (password !== confirmPassword)
                return toast('Invalid information')
            const userResponse = await UserService.password({ old_password: oldPassword, password })
            console.log(userResponse)
            toast('Change password success')
        } catch (error) {
            console.log(error)
            toast('Invalid information')
        }
    }

    return (
        <div className="">
            <div className="mb-6 w-full">
                <label
                    htmlFor="large-input"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                    Old password
                </label>
                <input
                    type="password"
                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    alt="Old password..."
                    value={oldPassword}
                    onChange={(e) => {
                        setOldPassword(e.target.value)
                    }}
                />
            </div>
            <div className="mb-6 w-full">
                <label
                    htmlFor="large-input"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                    New password
                </label>
                <input
                    type="password"
                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    alt="New password..."
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
            </div>
            <div className="mb-6 w-full">
                <label
                    htmlFor="large-input"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                    Confim password
                </label>
                <input
                    type="password"
                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    alt="Confim password..."
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }}
                />
            </div>
            <button
                onClick={() => {
                    handleUpdateUser()
                }}
                className="text-white bg-indigo-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                Update
            </button>
        </div>
    );
}

export default Password;