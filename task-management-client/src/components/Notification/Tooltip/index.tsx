import * as React from 'react';
import { useState, useEffect } from 'react';
import TooltipHeading from './TooltipHeading';
import TooltipFooter from './TooltipFooter';
import TooltipItem from './TooltipItem';
import NotificationService from '../../../services/notification';
import Loading from '../../Loading';

function Tooltip({ show }: any) {
    const [isFetchData, setIsFetchData] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const notificationResponse: any =
                await NotificationService.index();
            setNotifications(notificationResponse.data.data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetchData]);

    return (
        <>
            <div
                tabIndex={-1}
                className={`absolute top-[2.5rem] w-[25rem] right-0 z-10  rounded-xl divide-y divide-gray-100 shadow transition-opacity duration-100 border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white ${!show && 'invisible opacity-0'}`}>
                <div className="rounded-xl text-sm text-gray-700 dark:text-gray-200">
                    <ul>
                        <div className="max-w-[24rem]">
                            <TooltipHeading />
                            <div className='overflow-auto h-[24rem]'>
                                {
                                    notifications.map((item: any, index: any) => {
                                        return <TooltipItem setIsFetchData={setIsFetchData} isFetchData={isFetchData} key={index} notification={{ ...item, data: item.data }} />
                                    })
                                }
                                {isLoading && <div className="flex items-center justify-center py-5 h-full"><Loading /></div>}
                            </div>
                            <TooltipFooter />
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Tooltip;