import { fetch } from '../../utils';
import { USER_ROUTER } from '../../routes/api';

class UserService {
    static getMe(params: object) {
        let uri = USER_ROUTER.GET_ME;
        return fetch.post(uri, params);
    }
}

export default UserService;
