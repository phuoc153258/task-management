import { fetch } from '../../utils';
import { TASK_ROUTER } from '../../routes/api';

class TaskService {
    static index(paginate: any) {
        let uri =
            TASK_ROUTER.index +
            `?search=${paginate.search}&sort=${paginate.sort}&page=${paginate.page}&per_page=${paginate.per_page}&project_id=${paginate.project_id !== undefined ? paginate.project_id : ''}`;
        return fetch.get(uri);
    }

    static show(id: any) {
        let uri =
            TASK_ROUTER.show + id
        return fetch.get(uri);
    }
}

export default TaskService;
