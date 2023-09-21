import { fetch } from '../../../utils';
import { ADMIN_USER_ROUTER } from '../../../routes/api';

class RoleService {
    static index(params: object) {
        let uri =
            ADMIN_USER_ROUTER.index;
        return fetch.get(uri, params);
    }
}

export default RoleService;
