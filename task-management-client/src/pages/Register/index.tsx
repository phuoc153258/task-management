import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import FormInput from '../../components/FormControl/FormInput';
import AuthService from '../../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticate } from '../../utils';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import { getErrors } from '../../helpers';
import route from '../../routes/web/route';
import FormLabel from '../../components/FormControl/FormLabel';

function Register() {
    const [userInfo, setUserInfo] = useState({
        username: '',
        fullname: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async () => {
        setShowLoading(true)
        try {
            if (userInfo.password === confirmPassword) {
                const responseAuth: any = await AuthService.register(userInfo);
                if (responseAuth?.data?.data)
                    return navigate('/login');
            } else toast("Password is not correct");
        } catch (error: any) {
            const errors: any = getErrors(error.response.data.data)[0];
            toast(errors);
        }
        setShowLoading(false)
    };

    useEffect(() => {
        const isAuth = isAuthenticate();
        if (isAuth) navigate(route.home);
    }, [navigate]);

    return (
        <>
            <div className="text-center my-6">
                <h1 className="text-3xl font-semibold text-gray-700">
                    Register
                </h1>
            </div>
            <div className="m-6">
                <form className="mb-4">
                    <div className="mb-4">
                        <FormLabel title={'Username'} />
                        <FormInput
                            type={'text'}
                            placeholder={`Your username`}
                            value={userInfo.username}
                            callback={(e: any) => {
                                setUserInfo({
                                    ...userInfo,
                                    username: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <FormLabel title={'Username'} />
                        <FormInput
                            type={'email'}
                            placeholder={`Your email`}
                            value={userInfo.email}
                            callback={(e: any) => {
                                setUserInfo({
                                    ...userInfo,
                                    email: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <FormLabel title={'Fullname'} />
                        <FormInput
                            type={'text'}
                            placeholder={`Your fullname`}
                            value={userInfo.fullname}
                            callback={(e: any) => {
                                setUserInfo({
                                    ...userInfo,
                                    fullname: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <FormLabel title={'Password'} />
                        <FormInput
                            type={'password'}
                            placeholder={`Password...`}
                            value={userInfo.password}
                            callback={(e: any) => {
                                setUserInfo({
                                    ...userInfo,
                                    password: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <FormLabel title={'Confirm password'} />
                        <FormInput
                            type={'password'}
                            placeholder={`Confirm password...`}
                            value={confirmPassword}
                            callback={(e: any) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-6">
                        <Button
                            isDisabled={showLoading}
                            title={<div className='flex items-center justify-center gap-5'>
                                <span className='relative text-xl'>Register
                                    <>
                                        {
                                            showLoading && <div className='absolute top-0 left-[-2rem]'><Loading /></div>
                                        }
                                    </>
                                </span>
                            </div>}
                            callback={() => {
                                handleRegister();
                            }}
                        />
                    </div>
                    <p className="text-sm text-center text-gray-400">
                        You have account?
                        <Link
                            to={route.login}
                            className="font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline"
                        >
                            {' '}Login
                        </Link>
                        .
                    </p>
                </form>
            </div>
        </>
    );
}

export default Register;
