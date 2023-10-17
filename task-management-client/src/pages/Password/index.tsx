import * as React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import UserService from '../../services/user';
import Button from '../../components/Button';
import { getErrors } from '../../helpers';
import Loading from '../../components/Loading';
import FormLabel from '../../components/FormControl/FormLabel';
import FormInput from '../../components/GlobalStyle/FormInput';
import { TYPE_PASSWORD } from '../../constants/inputType';

function Password() {
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showLoading, setShowLoading] = useState(false)

    const handleUpdateUser = async () => {
        setShowLoading(true)
        try {
            if (password !== confirmPassword)
                toast(' Passwords do not match')
            else {
                await UserService.password({ old_password: oldPassword, password })
                toast('Change password success')
            }
        } catch (error: any) {
            const errors: any = getErrors(error.response.data.errors)[0];
            toast(errors);
        }
        setShowLoading(false)
    }

    return (
        <div className="">
            <div className="mb-6 w-full">
                <FormLabel title={'Old password'} />
                <FormInput
                    type={TYPE_PASSWORD}
                    placeholder={'Old password...'}
                    value={oldPassword}
                    callback={(e: any) => {
                        setOldPassword(e.target.value)
                    }} />
            </div>
            <div className="mb-6 w-full">
                <FormLabel title={'New password'} />
                <FormInput
                    type={TYPE_PASSWORD}
                    placeholder={'New password...'}
                    value={password}
                    callback={(e: any) => {
                        setPassword(e.target.value)
                    }} />
            </div>
            <div className="mb-6 w-full">
                <FormLabel title={'Confim password'} />
                <FormInput
                    type={TYPE_PASSWORD}
                    placeholder={'Confim password...'}
                    value={confirmPassword}
                    callback={(e: any) => {
                        setConfirmPassword(e.target.value)
                    }} />
            </div>
            <div className='w-1/6 text-base'>
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
    );
}

export default Password;