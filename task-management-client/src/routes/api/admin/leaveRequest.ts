import { ENV } from '../../../config';

export const ADMIN_LEAVE_REQUEST_ROUTER = {
    index: `${ENV.apiUrl}/api/admin/leave-request`,
    show: `${ENV.apiUrl}/api/admin/leave-request/`,
    update: `${ENV.apiUrl}/api/admin/leave-request/`,
};
