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
        user: '/admin/user',
        task: '/admin/task',
    }

};

export const leaveRequestGroup = [route.leaveRequest, route.admin.leaveRequest, route.admin.acceptLeaveRequest]

export const taskGroup = [route.task, route.admin.task]

export const userGroup = [route.admin.user]

export default route;
