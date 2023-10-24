import { fetch } from '../../utils';
import { TASK_REPORT_ROUTER } from '../../routes/api';

class TaskReportService {
    static index(paginate: any, task_id: any) {
        let uri =
            TASK_REPORT_ROUTER.index +
            `?search=${paginate.search}&sort=${paginate.sort}&page=${paginate.page}&per_page=${paginate.per_page}&task_id=${task_id !== undefined ? task_id : ''}`;
        return fetch.get(uri);
    }

    static show(id: any) {
        let uri =
            TASK_REPORT_ROUTER.show + id
        return fetch.get(uri);
    }

    static update(id: any, params: any) {
        let uri =
            TASK_REPORT_ROUTER.show + id
        return fetch.put(uri, params);
    }

    static create(params: any) {
        let uri =
            TASK_REPORT_ROUTER.index
        return fetch.post(uri, params);
    }

    static delete(id: any) {
        let uri =
            TASK_REPORT_ROUTER.show + id
        return fetch.delete(uri);
    }
}

export default TaskReportService;
