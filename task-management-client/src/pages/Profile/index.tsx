import * as React from 'react';
import { useState, useEffect } from 'react';
import { ENV } from '../../config';
import { useStore } from '../../hooks';
import UserService from '../../services/user';
import { actions } from '../../store';
import { setUser } from '../../utils';
import { toast } from 'react-toastify';
import FormLabel from '../../components/FormControl/FormLabel';
import FormInput from '../../components/FormControl/FormInput';
import { TYPE_TEXT } from '../../constants/inputType';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { getErrors } from '../../helpers';

function Profile() {
    const [state, dispatch] = useStore()
    const [userInfo, setUserInfo] = useState<any>(state.currentUser)
    const [file, setFile] = useState<any>(null);
    const [imagePreview, setImagePreview] = useState(ENV.apiUrl + "/" + userInfo.avatar)
    const [showLoading, setShowLoading] = useState(false)

    const handleUpdateUser = async () => {
        setShowLoading(true)
        try {
            const formData = new FormData();
            if (file !== null)
                formData.append("avatar", file);
            formData.append("fullname", userInfo.fullname);
            formData.append("email", userInfo.email);
            const responseUser: any = await UserService.update(formData);
            if (responseUser?.data?.data) {
                dispatch(actions.setCurrentUserInfo(undefined));
                dispatch(actions.setCurrentUserInfo(responseUser.data.data));
                setUser(JSON.stringify(responseUser.data.data));
                toast('Update user success')
            }
        } catch (error: any) {
            const errors: any = getErrors(error.response.data.data)[0];
            toast(errors);
        }
        setShowLoading(false)
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
            <div className="w-[60%]">
                <div className="mb-6">
                    <FormLabel title={'Username'} />
                    <FormInput type={TYPE_TEXT} placeholder={'Username...'} readOnly={true} value={userInfo.username} />

                </div>
                <div className="mb-6">
                    <FormLabel title={'Fullname'} />
                    <FormInput
                        type={TYPE_TEXT}
                        placeholder={'Fullname...'}
                        readOnly={false}
                        value={userInfo.fullname}
                        callback={(e: any) => {
                            setUserInfo({ ...userInfo, fullname: e.target.value })
                        }}
                    />
                </div>
                <div className="mb-6">
                    <FormLabel title={'Email'} />
                    <FormInput
                        type={TYPE_TEXT}
                        placeholder={'Email...'}
                        readOnly={false}
                        value={userInfo.email}
                        callback={(e: any) => {
                            setUserInfo({ ...userInfo, email: e.target.value })
                        }}
                    />
                </div>
                <div className='w-1/4 text-base'>
                    <Button isDisabled={showLoading}
                        title={<div className='flex items-center justify-center gap-5'>
                            <span className='relative text-base'>Update
                                {showLoading && <div className='absolute top-0 left-[-2rem]'><Loading /></div>}
                            </span>
                        </div>}
                        callback={() => {
                            handleUpdateUser()
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Profile;