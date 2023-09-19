import * as React from 'react';
import { useState, useEffect } from 'react';
import { ENV } from '../../config';
import { useStore } from '../../hooks';
import UserService from '../../services/user';
import { actions } from '../../store';
import { setUser } from '../../utils';
import { toast } from 'react-toastify';

function Profile() {
    const [state, dispatch] = useStore()
    const [userInfo, setUserInfo] = useState<any>(state.currentUser)
    const [file, setFile] = useState<any>(null);
    const [imagePreview, setImagePreview] = useState(ENV.apiUrl + "/" + userInfo.avatar)

    const handleUpdateUser = async () => {
        try {
            const formData = new FormData();
            formData.append("avatar", file);
            formData.append("fullname", userInfo.fullname);
            formData.append("email", userInfo.email);
            const responseUser: any = await UserService.update(formData);
            console.log(responseUser)
            if (responseUser?.data?.data) {
                dispatch(actions.setCurrentUserInfo(undefined));
                dispatch(actions.setCurrentUserInfo(responseUser.data.data));
                setUser(JSON.stringify(responseUser.data.data));
                toast('Update user success')
            }
        } catch (error) {
            console.log(error)
            toast('Update user failed')
        }
    }

    return (
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
                <div className="mb-6">
                    <label
                        htmlFor="large-input"
                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        alt="Username..."
                        readOnly
                        value={userInfo.username}
                    />
                </div>
                <div className="mb-6">
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
                <div className="mb-6">
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
                <div className="mb-6">
                    <label
                        htmlFor="large-input"
                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                        Created at
                    </label>
                    <input
                        type="text"
                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        alt="Created at..."
                        value={userInfo.created_at}
                        onChange={(e) => {
                            setUserInfo({ ...userInfo, created_at: e.target.value })
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
        </div>
    );
}

export default Profile;