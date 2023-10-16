import { fetch } from '../../utils';
import { LEAVE_REQUEST_ROUTER } from '../../routes/api';

class LeaveRequestService {
    static index(params: object, paginate: any) {
        let uri =
            LEAVE_REQUEST_ROUTER.index +
            `?search=${paginate.search}&sort=${paginate.sort}&page=${paginate.page}&per_page=${paginate.per_page}`;
        return fetch.get(uri, params);
    }

    static create(params: object) {
        let uri =
            LEAVE_REQUEST_ROUTER.create;
        return fetch.post(uri, params);
    }

    static update(params: object, id: any) {
        let uri =
            LEAVE_REQUEST_ROUTER.update + id;
        return fetch.put(uri, params);
    }

    static delete(params: object, id: any) {
        let uri =
            LEAVE_REQUEST_ROUTER.update + id;
        return fetch.delete(uri, params);
    }

    static show(params: object, id: any) {
        let uri =
            LEAVE_REQUEST_ROUTER.show + id;
        return fetch.get(uri, params);
    }
}

export default LeaveRequestService;
