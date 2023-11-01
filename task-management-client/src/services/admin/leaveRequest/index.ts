import { fetch } from '../../../utils';
import { ADMIN_LEAVE_REQUEST_ROUTER } from '../../../routes/api';

class LeaveRequestService {
    static index(params: object, paginate: any) {
        let uri =
            ADMIN_LEAVE_REQUEST_ROUTER.index +
            `?search=${paginate.search}&sort=${paginate.sort}&page=${paginate.page}&per_page=${paginate.per_page}&leave_request_status=${paginate.leave_request_status}&soft_delete=${paginate.soft_delete}`;
        return fetch.get(uri);
    }

    static update(params: object, id: any) {
        let uri =
            ADMIN_LEAVE_REQUEST_ROUTER.update + id;
        return fetch.put(uri, params);
    }

    static accept(params: object, id: any) {
        let uri =
            ADMIN_LEAVE_REQUEST_ROUTER.update + id + '/accept';
        return fetch.patch(uri, params);
    }

    static show(params: object, id: any) {
        let uri =
            ADMIN_LEAVE_REQUEST_ROUTER.show + id;
        return fetch.get(uri, params);
    }

    static create(params: object) {
        let uri =
            ADMIN_LEAVE_REQUEST_ROUTER.index;
        return fetch.post(uri, params);
    }

    static delete(params: object, id: any) {
        let uri =
            ADMIN_LEAVE_REQUEST_ROUTER.show + id;
        return fetch.delete(uri, params);
    }

    static restore(id: any) {
        let uri =
            ADMIN_LEAVE_REQUEST_ROUTER.show + id + '/restore';
        return fetch.patch(uri);
    }

    static force(id: any) {
        let uri =
            ADMIN_LEAVE_REQUEST_ROUTER.show + id + '/force';
        return fetch.delete(uri);
    }
}

export default LeaveRequestService;
