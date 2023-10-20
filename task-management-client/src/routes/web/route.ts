const route = {
    home: '/',
    login: '/login',
    register: '/register',

    profile: '/profile',
    password: '/password',

    leaveRequest: '/leave-request',
    task: '/task',

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

export const leaveRequestGroup = [route.leaveRequest, route.admin.leaveRequest, route.admin.acceptLeaveRequest, route.admin.softDeleteLeaveRequest]

export const taskGroup = [route.task, route.admin.task]

export const userGroup = [route.admin.user, route.admin.softDeleteUser]

export default route;
