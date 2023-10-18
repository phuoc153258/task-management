import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import route from '../../../../routes/web/route';
import { Logout, isHaveRole } from '../../../../utils';
import { useStore } from '../../../../hooks';
import { actions } from '../../../../store';
import Item from './Item';
import { ROLE_ADMIN, ROLE_LEADER, ROLE_MANAGER } from '../../../../constants/user';

function Dropdown({ show }: any) {
    const navigate = useNavigate();
    const [state, dispatch] = useStore();

    return (
        <>
            <div
                className={`absolute ${!show && 'hidden'} top-5 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
            >
                <div className="px-4 py-3" role="none">
                    <p
                        className="text-sm text-gray-900 dark:text-white"
                        role="none"
                    >
                        {state.currentUser.fullname}
                    </p>
                    <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                    >
                        {state.currentUser.email}
                    </p>
                </div>
                <ul className="py-1" role="none">
                    {isHaveRole([ROLE_ADMIN]) && <Item route={route.admin.leaveRequest} title={'Dashboard'} />}
                    <Item route={route.profile} title={'Profile'} />
                    <Item title={<span
                        className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                            Logout();
                            dispatch(
                                actions.userLogIn(''),
                            );
                            dispatch(
                                actions.setCurrentUserInfo(
                                    undefined,
                                ),
                            );
                            navigate('/login');
                        }}
                    >
                        Logout
                    </span>} />
                </ul>
            </div>
        </>
    );
}

export default Dropdown;