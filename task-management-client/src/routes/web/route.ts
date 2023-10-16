const route = {
    home: '/',
    leaveRequest: '/leave-request',
    acceptLeaveRequest: '/leave-request/accept',
    login: '/login',
    register: '/register',
    profile: '/profile',
    password: '/password',
    user: '/user',
    task: '/task',
};

export const leaveRequestGroup = [route.leaveRequest, route.acceptLeaveRequest]
export const userGroup = [route.user]
export const taskGroup = [route.task]

export default route;
