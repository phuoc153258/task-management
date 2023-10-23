import * as React from 'react';
import { useState, useEffect } from 'react';
import SidebarItem from '../../components/Sidebar/SidebarItem';
import route, { LEAVE_REQUEST, TASK, USER } from '../../../routes/web/route';
import { useLocation } from 'react-router-dom';

function Sidebar() {
    let location: any = useLocation().pathname
    location = location.split('/');
    return (
        <>
            <aside
                className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0  w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width"
                aria-label="Sidebar"
            >
                <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            <ul className="pb-2 space-y-2">
                                <SidebarItem url={route.admin.leaveRequest} title={`Leave request`} active={location[2] === LEAVE_REQUEST} />
                                <SidebarItem url={route.admin.task} title={"Task"} active={location[2] === TASK} />
                                <SidebarItem url={route.admin.user} title={"User"} active={location[2] === USER} />
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;