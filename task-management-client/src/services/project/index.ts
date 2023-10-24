import { fetch } from '../../utils';
import { PROJECT_ROUTER } from '../../routes/api';

class ProjectService {
    static index(paginate: any) {
        let uri =
            PROJECT_ROUTER.index +
            `?search=${paginate.search}&sort=${paginate.sort}&page=${paginate.page}&per_page=${paginate.per_page}`;
        return fetch.get(uri);
    }
    static show(id: any) {
        let uri =
            PROJECT_ROUTER.show + id
        return fetch.get(uri);
    }
}

export default ProjectService;
