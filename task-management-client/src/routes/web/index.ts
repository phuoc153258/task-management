import route from './route';

import { DefaultLayout, ProfileLayout } from '../../layouts';

import LeaveRequest from '../../pages/LeaveRequest';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Profile from '../../pages/Profile';
import Password from '../../pages/Password';
import Task from '../../pages/Task';
import TaskDetail from '../../pages/TaskDetail';
import AuthLayout from '../../layouts/AuthLayout';
import AdminLayout from '../../layouts/AdminLayout';
import Project from '../../pages/Project';
import ProjectDetail from '../../pages/ProjectDetail';
import AdminProject from '../../pages/Admin/Project'
import AdminProjectDetail from '../../pages/Admin/ProjectDetail'
import AdminSoftDeleteProject from '../../pages/Admin/SoftDeleteProject'
import AdminLeaveRequest from '../../pages/Admin/LeaveRequest';
import AdminAcceptLeaveRequest from '../../pages/Admin/AcceptLeaveRequest';
import AdminSoftDeleteLeaveRequest from '../../pages/Admin/SoftDeleteLeaveRequest';
import AdminUser from '../../pages/Admin/User';
import AdminSoftDeleteUser from '../../pages/Admin/SoftDeleteUser';
import AdminTaskDetail from '../../pages/Admin/TaskDetail';

const publicRoutes: any = [
    { path: route.leaveRequest, component: LeaveRequest, layout: DefaultLayout },
    { path: route.task, component: Task, layout: DefaultLayout },
    { path: route.taskDetail, component: TaskDetail, layout: DefaultLayout },
    { path: route.project, component: Project, layout: DefaultLayout },
    { path: route.projectDetail, component: ProjectDetail, layout: DefaultLayout },

    { path: route.login, component: Login, layout: AuthLayout },
    { path: route.register, component: Register, layout: AuthLayout },

    { path: route.profile, component: Profile, layout: ProfileLayout },
    { path: route.password, component: Password, layout: ProfileLayout },

    { path: route.admin.leaveRequest, component: AdminLeaveRequest, layout: AdminLayout },
    { path: route.admin.acceptLeaveRequest, component: AdminAcceptLeaveRequest, layout: AdminLayout },
    { path: route.admin.softDeleteLeaveRequest, component: AdminSoftDeleteLeaveRequest, layout: AdminLayout },

    { path: route.admin.user, component: AdminUser, layout: AdminLayout },
    { path: route.admin.softDeleteUser, component: AdminSoftDeleteUser, layout: AdminLayout },

    { path: route.admin.project, component: AdminProject, layout: AdminLayout },
    { path: route.admin.projectDetail, component: AdminProjectDetail, layout: AdminLayout },
    { path: route.admin.softDeleteProject, component: AdminSoftDeleteProject, layout: AdminLayout },

    { path: route.admin.taskDetail, component: AdminTaskDetail, layout: AdminLayout },

];

const privateRoutes: any = [];

export { publicRoutes, privateRoutes };
