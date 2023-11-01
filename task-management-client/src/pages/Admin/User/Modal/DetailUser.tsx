import * as React from 'react';
import { useState, useEffect } from 'react';
import UserService from '../../../../services/admin/user';
import { toast } from 'react-toastify';
import { ENV } from '../../../../config';
import { useStore } from '../../../../hooks';
import { actions } from '../../../../store';
import FormSelect from '../../../../components/FormControl/FormSelect';
import { getErrors } from '../../../../helpers';
import ModalHeading from '../../../../components/Modal/ModalHeading';
import FormImage from '../../../../components/FormControl/FormImage';
import FormLabel from '../../../../components/FormControl/FormLabel';
import FormInput from '../../../../components/FormControl/FormInput';
import { TYPE_EMAIL, TYPE_TEXT } from '../../../../constants/inputType';
import ModalButton from '../../../../components/Modal/ModalButton';

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
    const [showLoading, setShowLoading] = useState(false);

    const handleUpdateUser = async () => {
        setShowLoading(true);
        try {
            const formData = new FormData();
            if (file !== null)
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
        } catch (error: any) {
            const errors: any = getErrors(error.response.data.data)[0];
            toast(errors);
        }
        setShowLoading(false)
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
        <>
            <ModalHeading title={'Detail user'} callback={() => setShowModal(false)} />

            <div className="p-6 space-y-6">
                <div className="flex">
                    <div className="w-[40%] text-center">
                        <FormImage setFile={setFile} imagePreview={imagePreview} setImagePreview={setImagePreview} />
                    </div>
                    <div className="w-[60%]">
                        <div className="mb-6 w-full">
                            <FormLabel title={'Username*'} />
                            <FormInput
                                type={TYPE_TEXT}
                                placeholder={'Username...'}
                                readOnly={false}
                                value={userInfo.username}
                                callback={(e: any) => {
                                    setUserInfo({ ...userInfo, username: e.target.value })
                                }}
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <FormLabel title={'Fullname*'} />
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
                        <div className="mb-6 w-full">
                            <FormLabel title={'Email*'} />
                            <FormInput
                                type={TYPE_EMAIL}
                                placeholder={'Email...'}
                                readOnly={false}
                                value={userInfo.email}
                                callback={(e: any) => {
                                    setUserInfo({ ...userInfo, email: e.target.value })
                                }}
                            />
                        </div>
                        <div className="mb-6 ">
                            <FormLabel title={'Role'} />
                            <FormSelect
                                callback={(e: any) => {
                                    setUserInfo({ ...userInfo, role_id: parseInt(e.target.value) })
                                }}
                                data={<>
                                    {
                                        roles.map((value: any, index: any) => {
                                            return <option key={index} value={value.id}>{value.name}</option>
                                        })
                                    }
                                </>}
                                defaultValue={userInfo.role_id}
                            />
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <ModalButton
                    callback={() => handleResetpassword()}
                    styles={'bg-lime-500 hover:bg-primary-800 focus:ring-primary-300 px-3 py-2 text-white'}
                    title={
                        'Reset password'}
                    isDisabled={false}
                />
                <ModalButton
                    callback={() => {
                        handleUpdateUser()
                    }} styles={'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 px-3 py-2'}
                    title={
                        'Update user'}
                    isDisabled={false}
                />
            </div>
        </>

    );
}

export default DetailUser;
