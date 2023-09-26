import route from './route';

import { DefaultLayout, ProfileLayout } from '../../layouts';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Profile from '../../pages/Profile';
import Password from '../../pages/Password';
import LeaveRequest from '../../pages/Admin/LeaveRequest';
import User from '../../pages/Admin/User';
import Task from '../../pages/Task';

const publicRoutes: any = [
    { path: route.home, component: Home, layout: DefaultLayout },
    { path: route.leaveRequest, component: Home, layout: DefaultLayout },
    { path: route.login, component: Login, layout: null },
    { path: route.register, component: Register, layout: null },
    { path: route.profile, component: Profile, layout: ProfileLayout },
    { path: route.password, component: Password, layout: ProfileLayout },
    { path: route.acceptLeaveRequest, component: LeaveRequest, layout: DefaultLayout },
    { path: route.user, component: User, layout: DefaultLayout },
    { path: route.task, component: Task, layout: DefaultLayout },
];

const privateRoutes: any = [];

export { publicRoutes, privateRoutes };
