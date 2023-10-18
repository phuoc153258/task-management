import { fetch } from '../../../utils';
import { ADMIN_ROLE_ROUTER } from '../../../routes/api';

class RoleService {
    static index(params: object) {
        let uri =
            ADMIN_ROLE_ROUTER.index;
        return fetch.get(uri);
    }
}

export default RoleService;
