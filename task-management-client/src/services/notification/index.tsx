import { fetch } from '../../utils';
import { NOTIFICATION_ROUTER } from '../../routes/api';

class NotificationService {
    static index() {
        let uri = NOTIFICATION_ROUTER.index;
        return fetch.get(uri);
    }
    static update(id: any) {
        let uri = NOTIFICATION_ROUTER.index + '/' + id;
        return fetch.patch(uri);
    }
}

export default NotificationService;
