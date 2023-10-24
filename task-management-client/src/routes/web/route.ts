const route = {
    home: '/',
    login: '/login',
    register: '/register',

    profile: '/profile',
    password: '/password',

    leaveRequest: '/leave-request',

    task: '/task',
    taskDetail: '/task/:id',
    project: '/project',
    projectDetail: '/project/:id',

    notification: '/notification',

    admin: {
        home: '/admin',

        leaveRequest: '/admin/leave-request',
        acceptLeaveRequest: '/admin/leave-request/accept',
        softDeleteLeaveRequest: '/admin/leave-request/soft-delete',

        user: '/admin/user',
        softDeleteUser: '/admin/user/soft-delete',

        task: '/admin/task',
    }

};

export const LEAVE_REQUEST = 'leave-request'
export const USER = 'user'
export const TASK = 'task'
export const PROJECT = 'project'

export default route;
