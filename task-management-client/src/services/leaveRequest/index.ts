import { fetch } from '../../utils';
import { LEAVE_REQUEST_ROUTER } from '../../routes/api';

class LeaveRequestService {
    static index(params: object, paginate: any) {
        let uri =
            LEAVE_REQUEST_ROUTER.index +
            `?search=${paginate.search}&page=${paginate.page}&limit=${paginate.limit}`;
        return fetch.get(uri, params);
    }
}

export default LeaveRequestService;
