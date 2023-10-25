import { ADMIN_PROJECT_ROUTER } from "../../../routes/api";
import { fetch } from "../../../utils";


class ProjectService {
    static index(paginate: any) {
        let uri =
            ADMIN_PROJECT_ROUTER.index +
            `?search=${paginate.search}&sort=${paginate.sort}&page=${paginate.page}&per_page=${paginate.per_page}&soft_delete=${paginate.soft_delete}`;
        return fetch.get(uri);
    }

    static show(id: any) {
        let uri =
            ADMIN_PROJECT_ROUTER.show + id
        return fetch.get(uri);
    }

    static create(params: any) {
        let uri =
            ADMIN_PROJECT_ROUTER.index
        return fetch.post(uri, params);
    }

    static delete(id: any) {
        let uri =
            ADMIN_PROJECT_ROUTER.show + id
        return fetch.delete(uri);
    }

    static restore(id: any) {
        let uri =
            ADMIN_PROJECT_ROUTER.show + id + '/restore'
        return fetch.patch(uri);
    }

    static force(id: any) {
        let uri =
            ADMIN_PROJECT_ROUTER.show + id + '/force'
        return fetch.delete(uri);
    }
}

export default ProjectService;
