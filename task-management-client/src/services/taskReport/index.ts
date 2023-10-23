import { fetch } from '../../utils';
import { TASK_REPORT_ROUTER } from '../../routes/api';

class TaskReportService {
    static index(paginate: any, task_id: any) {
        let uri =
            TASK_REPORT_ROUTER.index +
            `?search=${paginate.search}&sort=${paginate.sort}&page=${paginate.page}&per_page=${paginate.per_page}&task_id=${task_id !== undefined ? task_id : ''}`;
        return fetch.get(uri);
    }
}

export default TaskReportService;
