import { fetch } from '../../../utils';
import { ADMIN_USER_ROUTER } from '../../../routes/api';

class UserService {
    static index(params: object, paginate: any) {
        let uri =
            ADMIN_USER_ROUTER.index +
            `?search=${paginate.search}&sort=${paginate.sort}&page=${paginate.page}&per_page=${paginate.per_page}&soft_delete=${paginate.soft_delete}`;
        return fetch.get(uri);
    }

    static show(id: any) {
        let uri =
            ADMIN_USER_ROUTER.show + id;
        return fetch.get(uri);
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

    static password(params: any, id: any) {
        let uri =
            ADMIN_USER_ROUTER.show + id + '/password';
        return fetch.put(uri, params);
    }

    static delete(params: any, id: any) {
        let uri =
            ADMIN_USER_ROUTER.show + id;
        return fetch.delete(uri, params);
    }

    static list() {
        let uri =
            ADMIN_USER_ROUTER.show + 'list';
        return fetch.get(uri);
    }

    static restore(id: any) {
        let uri =
            ADMIN_USER_ROUTER.show + id + '/restore'
        return fetch.patch(uri);
    }

    static force(id: any) {
        let uri =
            ADMIN_USER_ROUTER.show + id + '/force'
        return fetch.delete(uri);
    }

}

export default UserService;
