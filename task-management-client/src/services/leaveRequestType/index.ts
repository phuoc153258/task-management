import { fetch } from '../../utils';
import { LEAVE_REQUEST_TYPE_ROUTER } from '../../routes/api';

class LeaveRequestTypeService {
    static index(params: object) {
        let uri = LEAVE_REQUEST_TYPE_ROUTER.index;
        return fetch.get(uri, params);
    }
}

export default LeaveRequestTypeService;
