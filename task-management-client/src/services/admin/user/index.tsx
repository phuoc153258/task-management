import { fetch } from '../../../utils';
import { ADMIN_USER_ROUTER } from '../../../routes/api';

class UserService {
    static index(params: object, paginate: any) {
        let uri =
            ADMIN_USER_ROUTER.index +
            `?search=${paginate.search}&sort=${paginate.sort}&page=${paginate.page}&limit=${paginate.limit}`;
        return fetch.get(uri, params);
    }

    static show(params: object, id: any) {
        let uri =
            ADMIN_USER_ROUTER.show + id;
        return fetch.get(uri, params);
    }

    static create(params: object) {
        let uri =
            ADMIN_USER_ROUTER.index;
        return fetch.post(uri, params);
    }

    static update(params: any, id: any) {
        let uri =
            ADMIN_USER_ROUTER.show + id;
        return fetch.post(uri, params);
    }

    static delete(params: any, id: any) {
        let uri =
            ADMIN_USER_ROUTER.show + id;
        return fetch.delete(uri, params);
    }
}

export default UserService;
