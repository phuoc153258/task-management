import { fetch } from '../../../utils';
import { ADMIN_USER_PROJECT_ROUTER } from '../../../routes/api';

class UserProjectService {
    static index(paginate: any, project_id: any) {
        let uri =
            ADMIN_USER_PROJECT_ROUTER.index + '/project/' + project_id +
            `?search=${paginate.search}&sort=${paginate.sort}&page=${paginate.page}&per_page=${paginate.per_page}&project_id=${paginate.project_id !== undefined ? paginate.project_id : ''}`;
        return fetch.get(uri);
    }

    static list(project_id: any) {
        let uri =
            ADMIN_USER_PROJECT_ROUTER.index + '/project/' + project_id + '/list';
        return fetch.get(uri);
    }

    static create(userProject: any) {
        let uri =
            ADMIN_USER_PROJECT_ROUTER.index + '/project/' + userProject.project_id + '/user/' + userProject.user_id
        return fetch.post(uri);
    }

    static delete(userProject: any) {
        let uri =
            ADMIN_USER_PROJECT_ROUTER.index + '/project/' + userProject.project_id + '/user/' + userProject.user_id
        return fetch.delete(uri);
    }
}

export default UserProjectService;
