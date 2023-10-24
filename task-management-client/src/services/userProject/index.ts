import { fetch } from '../../utils';
import { USER_PROJECT_ROUTER } from '../../routes/api';

class UserProjectService {
    static index(paginate: any, project_id: any) {
        let uri =
            USER_PROJECT_ROUTER.index + '/project/' + project_id +
            `?search=${paginate.search}&sort=${paginate.sort}&page=${paginate.page}&per_page=${paginate.per_page}&project_id=${paginate.project_id !== undefined ? paginate.project_id : ''}`;
        return fetch.get(uri);
    }
}

export default UserProjectService;
