import * as React from 'react';
import { useState, useEffect } from 'react';
import UserService from '../../../../services/admin/user';
import { toast } from 'react-toastify';
import { ENV } from '../../../../config';
import { useStore } from '../../../../hooks';
import { actions } from '../../../../store';

function DetailUser({ setShowModal, isFetchData, setIsFetchData, roles, user }: any) {
    const [state, dispatch] = useStore()
    const [userInfo, setUserInfo] = useState<any>({
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        role_id: user.roles[0].id
    })
    const [file, setFile] = useState<any>(null);
    const [imagePreview, setImagePreview] = useState(ENV.apiUrl + "/" + user.avatar)

    const handleUpdateUser = async () => {
        try {
            const formData = new FormData();
            formData.append("avatar", file);
            formData.append("username", userInfo.username);
            formData.append("fullname", userInfo.fullname);
            formData.append("email", userInfo.email);
            formData.append("role_id", userInfo.role_id);
            const responseUser: any = await UserService.update(formData, user.id);
            if (responseUser?.data?.data) {
                dispatch(actions.setCurrentUserInfo(undefined));
                dispatch(actions.setCurrentUserInfo(responseUser.data.data));
                setIsFetchData(!isFetchData)
                setShowModal(false)
                toast('Update user success')
            }
        } catch (error) {
            console.log(error)
            toast('Update user failed')
        }
    }

    const handleResetpassword = async () => {
        try {
            if (window.confirm('Reset password this user ?')) {
                await UserService.password({}, user.id)
                setIsFetchData(!isFetchData);
                toast('Reset password user success');
            }
        } catch (error) {
            toast('Reset password user failed')
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
                        <div className="flex">
                            <div className=" w-[40%] text-center">
                                <img className="w-52 mb-5 h-52 rounded-full block mx-auto" src={imagePreview} alt="Rounded avatar" />
                                <input type="file" id="myFile" className='hidden' onChange={(e: any) => {
                                    setFile(e.target.files[0])
                                    setImagePreview(URL.createObjectURL(e.target.files[0]))
                                }} />
                                <label htmlFor='myFile' className="text-white bg-indigo-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Upload avatar</label>
                            </div>
                            <div className=" w-[60%]">
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
                                        value={userInfo.username}
                                        onChange={(e) => {
                                            setUserInfo({ ...userInfo, username: e.target.value })
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
                                        alt="Fullname..."
                                        value={userInfo.fullname}
                                        onChange={(e) => {
                                            setUserInfo({ ...userInfo, fullname: e.target.value })
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
                                        alt="Email..."
                                        value={userInfo.email}
                                        onChange={(e) => {
                                            setUserInfo({ ...userInfo, email: e.target.value })
                                        }}
                                    />
                                </div>
                                <div className="mb-6 ">
                                    <label
                                        htmlFor="countries"
                                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                                    >
                                        Role
                                    </label>
                                    <select
                                        onChange={(e: any) => {
                                            setUserInfo({ ...userInfo, role_id: parseInt(e.target.value) })
                                        }}
                                        className="bg-gray-50 border text-base border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <>
                                            {
                                                roles.map((value: any, index: any) => {
                                                    return <option key={index} selected={userInfo.role_id === value.id} value={value.id}>{value.name}</option>
                                                })
                                            }
                                        </>
                                    </select>
                                </div>

                            </div>
                        </div>

                    </div>
                    {/* Modal footer */}
                    <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            type="button"
                            onClick={() => handleResetpassword()}
                            className='inline-flex items-center  px-5 py-2 text-base font-medium text-center text-white rounded-lg bg-lime-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'                        >
                            Reset password
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                handleUpdateUser()
                            }}
                            className="text-white text-base bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Update user
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailUser;
