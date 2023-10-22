import * as React from 'react';
import { useState, useEffect } from 'react';
import FormInput from '../../components/FormControl/FormInput';
import Button from '../../components/Button';
import { useStore } from '../../hooks';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth';
import { isAuthenticate, setToken, setUser } from '../../utils';
import UserService from '../../services/user';
import { actions } from '../../store';
import Loading from '../../components/Loading';
import route from '../../routes/web/route';
import FormLabel from '../../components/FormControl/FormLabel';

function Login() {
    const [state, dispatch] = useStore();

    const navigate = useNavigate();
    const [username, setUserName] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [showError, setShowError] = useState<any>(false);
    const [showLoading, setShowLoading] = useState<any>(false);

    const handleLogin = async () => {
        setShowLoading(true)
        try {
            const responseAuth: any = await AuthService.login({
                username,
                password,
            });
            setToken(responseAuth?.data?.data.access_token);
            dispatch(
                actions.userLogIn(responseAuth?.data?.data.access_token),
            );

            const responseUser: any = await UserService.getMe({});
            setUser(JSON.stringify(responseUser?.data?.data));
            dispatch(
                actions.setCurrentUserInfo(responseUser?.data?.data),
            );
            return navigate(route.home);
        } catch (error) {
            setShowError(true);
        }
        setShowLoading(false)
    };

    useEffect(() => {
        const isAuth = isAuthenticate();
        if (isAuth) navigate(route.home);
    }, [navigate]);

    return (<>
        <div className="text-center my-6">
            <h1 className="text-3xl font-semibold text-gray-700">
                Login
            </h1>
            <p className="text-gray-500 text-base">
                Login to access your account
            </p>
        </div>    <div className="m-6">
            <form className="mb-4">
                <div className="mb-6">
                    <FormLabel title={'Username'} />
                    <FormInput
                        type={'text'}
                        placeholder={`Your username`}
                        value={username}
                        callback={(e: any) => {
                            setUserName(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-8">
                    <FormLabel title={'Password'} />
                    <FormInput
                        type={'password'}
                        placeholder={'Your password '}
                        value={password}
                        callback={(e: any) => {
                            setPassword(e.target.value);
                        }}
                    />
                    {showError && <p className="text-sm text-gray-400 pt-2">Username or password is incorrect!.</p>}
                </div>

                <div className="mb-6">
                    <Button
                        isDisabled={showLoading}
                        title={<div className='flex items-center justify-center gap-5'>
                            <span className='relative text-xl'>Login
                                {showLoading && <div className='absolute top-0 left-[-2rem]'><Loading /></div>}
                            </span>
                        </div>}
                        callback={() => {
                            handleLogin();
                        }}
                    />
                </div>
                <p className="text-sm text-center text-gray-400">
                    Don't have an account yet?
                    <Link
                        to={route.register}
                        className="font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline"
                    >
                        {' '}Sign up
                    </Link>
                </p>
            </form>
        </div>
    </>)
}

export default Login;
