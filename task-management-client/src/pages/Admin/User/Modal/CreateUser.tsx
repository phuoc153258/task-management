import * as React from 'react';
import { useState, useEffect } from 'react';
import UserService from '../../../../services/admin/user';
import { toast } from 'react-toastify';
import ModalHeading from '../../../../components/Modal/ModalHeading';
import FormLabel from '../../../../components/FormControl/FormLabel';
import FormInput from '../../../../components/FormControl/FormInput';
import { TYPE_EMAIL, TYPE_PASSWORD, TYPE_TEXT } from '../../../../constants/inputType';
import ModalButton from '../../../../components/Modal/ModalButton';
import Loading from '../../../../components/Loading';
import { getErrors } from '../../../../helpers';
import FormSelect from '../../../../components/FormControl/FormSelect';

function CreateUser({ setShowModal, isFetchData, setIsFetchData, roles }: any) {
    const [user, setUser] = useState({
        username: '',
        fullname: '',
        email: '',
        password: '',
        role_id: 1
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showLoading, setShowLoading] = useState(false)

    const handleCreateUser = async () => {
        setShowLoading(true)
        try {
            if (confirmPassword !== user.password) return toast('Create user failed');
            await UserService.create(user)
            setShowModal(false)
            setIsFetchData(!isFetchData)
            toast('Create user success');
        } catch (error: any) {
            const errors: any = getErrors(error.response.data.data)[0];
            toast(errors);
        }
        setShowLoading(false)
    }

    return (
        <>
            <ModalHeading title={'Add user'} callback={() => setShowModal(false)} />
            <div className="p-6 space-y-6">
                <div className="mb-6 w-full">
                    <FormLabel title={'Username'} />
                    <FormInput
                        type={TYPE_TEXT}
                        placeholder={'Username...'}
                        readOnly={false}
                        value={user.username}
                        callback={(e: any) => {
                            setUser({ ...user, username: e.target.value })
                        }} />
                </div>
                <div className="mb-6 w-full">
                    <FormLabel title={'Fullname'} />
                    <FormInput
                        type={TYPE_TEXT}
                        placeholder={'Fullname...'}
                        readOnly={false}
                        value={user.fullname}
                        callback={(e: any) => {
                            setUser({ ...user, fullname: e.target.value })
                        }} />
                </div>
                <div className="mb-6 w-full">
                    <FormLabel title={'Email'} />
                    <FormInput
                        type={TYPE_EMAIL}
                        placeholder={'Email...'}
                        readOnly={false}
                        value={user.email}
                        callback={(e: any) => {
                            setUser({ ...user, email: e.target.value })
                        }} />
                </div>
                <div className="mb-6 w-full">
                    <FormLabel title={'Password'} />
                    <FormInput
                        type={TYPE_PASSWORD}
                        placeholder={'Password...'}
                        readOnly={false}
                        value={user.password}
                        callback={(e: any) => {
                            setUser({ ...user, password: e.target.value })
                        }} />
                </div>
                <div className="mb-6 w-full">
                    <FormLabel title={'Confirm password'} />
                    <FormInput
                        type={TYPE_PASSWORD}
                        placeholder={'Confirm password...'}
                        readOnly={false}
                        value={confirmPassword}
                        callback={(e: any) => {
                            setConfirmPassword(e.target.value)
                        }} />
                </div>
                <div className="mb-6 ">
                    <FormLabel title={'Role'} />
                    <FormSelect
                        callback={(e: any) => {
                            setUser({ ...user, role_id: parseInt(e.target.value) })
                        }}
                        data={
                            <>
                                {
                                    roles.map((value: any, index: any) => {
                                        return <option key={index} value={value.id}>{value.name}</option>
                                    })
                                }
                            </>
                        } />
                </div>
            </div>
            <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <ModalButton title={`Cancel`} callback={() => setShowModal(false)} styles={`text-gray-500 bg-white hover:bg-gray-100 focus:ring-gray-200 border border-gray-200 px-5 py-2 hover:text-gray-900`} />
                <ModalButton title={<>{showLoading && <div className='absolute flex items-center left-1'><Loading /></div>}Create user</>} isDisabled={showLoading} callback={() => { handleCreateUser() }} styles={`px-8 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 relative`} />
            </div>
        </>
    );
}

export default CreateUser;
