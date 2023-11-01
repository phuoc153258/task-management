import { fetch } from '../../../utils';
import { ADMIN_TASK_ROUTER } from '../../../routes/api';

class TaskService {
    static index(paginate: any, id: any) {
        let uri =
            ADMIN_TASK_ROUTER.index + '/project/' + id +
            `?search=${paginate.search}&sort=${paginate.sort}&page=${paginate.page}&per_page=${paginate.per_page}&project_id=${paginate.project_id !== undefined ? paginate.project_id : ''}`;
        return fetch.get(uri);
    }

    static show(id: any) {
        let uri =
            ADMIN_TASK_ROUTER.show + id
        return fetch.get(uri);
    }

    static update(id: any, task: any) {
        let uri =
            ADMIN_TASK_ROUTER.show + id
        return fetch.put(uri, task);
    }

    static create(task: any) {
        let uri =
            ADMIN_TASK_ROUTER.index
        return fetch.post(uri, task);
    }

    static delete(id: any) {
        let uri =
            ADMIN_TASK_ROUTER.show + id
        return fetch.delete(uri);
    }
}

export default TaskService;
