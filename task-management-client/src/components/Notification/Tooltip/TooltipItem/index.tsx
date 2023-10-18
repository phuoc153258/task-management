import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ENV } from '../../../../config';
import { NOTIFICATION_ADMIN_CREATE_LEAVE_REQUEST, NOTIFICATION_ADMIN_REGISTER_USER, NOTIFICATION_CREATE_LEAVE_REQUEST, NOTIFICATION_REGISTER_USER } from '../../../../constants/notification';
import { convertToDate } from '../../../../helpers';
import NotificationService from '../../../../services/notification';

function TooltipItem({ notification, setIsFetchData, isFetchData }: any) {
    const [isReadNoti, setIsReadNoti] = useState(notification.read_at !== null)

    const handleReadNotification = async (id: any) => {
        try {
            setIsReadNoti(true)
            await NotificationService.update(id);
            setIsFetchData(!isFetchData)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className={`flex border-y py-3 px-4 hover:bg-gray-100 cursor-pointer ${!isReadNoti ? 'bg-gray-100' : ''}`}
                onClick={() => {
                    handleReadNotification(notification.id)
                }}>
                <div className="shrink-0">
                    <img alt="" src={ENV.apiUrl + '/' + notification.data.user.avatar} className="h-11 w-11 rounded-full" />
                </div>
                <div className="w-full pl-3">
                    {
                        notification.type === NOTIFICATION_REGISTER_USER &&
                        <div className={`mb-1.5 text-base font-normal text-gray-800`}>
                            Welcome {notification.data.user.username} registered site
                        </div>
                    }

                    {
                        notification.type === NOTIFICATION_ADMIN_REGISTER_USER &&
                        <div className={`mb-1.5 text-base font-normal text-gray-800`}>
                            User {notification.data.user_register.username} has just registered an account
                        </div>
                    }

                    {
                        notification.type === NOTIFICATION_CREATE_LEAVE_REQUEST &&
                        <div className={`mb-1.5 text-base font-normal text-gray-800`}>
                            You has just created a leave request #{notification.data.leave_request.id}
                        </div>
                    }

                    {
                        notification.type === NOTIFICATION_ADMIN_CREATE_LEAVE_REQUEST &&
                        <div className={`mb-1.5 text-base font-normal text-gray-800`}>
                            User {notification.data.user.username} has just created a leave request #{notification.data.leave_request.id}
                        </div>
                    }

                    <div className="text-sm font-medium text-primary-700 dark:text-primary-400">{convertToDate(notification.created_at)}</div>
                </div >
            </div >
        </>
    );
}

export default TooltipItem;