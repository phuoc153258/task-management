import { ADMIN_TASK_REPORT_ROUTER } from "../../../routes/api";
import { fetch } from "../../../utils";


class TaskReportService {
    static index(paginate: any, task_id: any) {
        let uri =
            ADMIN_TASK_REPORT_ROUTER.index +
            `/task/${task_id}?search = ${paginate.search}& sort=${paginate.sort}& page=${paginate.page}& per_page=${paginate.per_page}`;
        return fetch.get(uri);
    }

    static show(id: any) {
        let uri =
            ADMIN_TASK_REPORT_ROUTER.show + id
        return fetch.get(uri);
    }

    static update(id: any, params: any) {
        let uri =
            ADMIN_TASK_REPORT_ROUTER.show + id
        return fetch.put(uri, params);
    }

    static create(params: any) {
        let uri =
            ADMIN_TASK_REPORT_ROUTER.index
        return fetch.post(uri, params);
    }

    static delete(id: any) {
        let uri =
            ADMIN_TASK_REPORT_ROUTER.show + id
        return fetch.delete(uri);
    }
}

export default TaskReportService;
