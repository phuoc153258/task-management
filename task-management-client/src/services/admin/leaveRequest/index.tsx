import { fetch } from '../../../utils';
import { ADMIN_LEAVE_REQUEST_ROUTER } from '../../../routes/api';

class LeaveRequestService {
    static index(params: object, paginate: any) {
        let uri =
            ADMIN_LEAVE_REQUEST_ROUTER.index +
            `?search=${paginate.search}&sort=${paginate.sort}&page=${paginate.page}&limit=${paginate.limit}`;
        return fetch.get(uri, params);
    }

    static update(params: object, id: any) {
        let uri =
            ADMIN_LEAVE_REQUEST_ROUTER.update + id;
        return fetch.put(uri, params);
    }

    static show(params: object, id: any) {
        let uri =
            ADMIN_LEAVE_REQUEST_ROUTER.show + id;
        return fetch.get(uri, params);
    }
}

export default LeaveRequestService;
