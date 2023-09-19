import { fetch } from '../../utils';
import { USER_ROUTER } from '../../routes/api';

class UserService {
    static getMe(params: object) {
        let uri = USER_ROUTER.GET_ME;
        return fetch.post(uri, params);
    }
    static update(formData: any) {
        let uri = USER_ROUTER.UPDATE_CURRENT_USER;
        return fetch.postFile(uri, formData);
    }

    static password(params: any) {
        let uri = USER_ROUTER.CHANGE_PASSWORD_USER;
        return fetch.put(uri, params);
    }
}

export default UserService;
