import { ENV } from '../../config';

export const AUTH_ROUTER = {
    login: `${ENV.apiUrl}/api/auth/login`,
    register: `${ENV.apiUrl}/api/auth/register`,
    verify: `${ENV.apiUrl}/api/auth/verify`,
    resetPassword: `${ENV.apiUrl}/api/auth/reset-password`,
};
