import { ENV } from '../../../config';

export const ADMIN_USER_ROUTER = {
    index: `${ENV.apiUrl}/api/admin/user`,
    show: `${ENV.apiUrl}/api/admin/user/`,
};
