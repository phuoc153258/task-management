import route from './route';

import { DefaultLayout } from '../../layouts';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Register from '../../pages/Register';

const publicRoutes: any = [
    { path: route.home, component: Home, layout: DefaultLayout },
    { path: route.leaveRequest, component: Home, layout: DefaultLayout },
    { path: route.login, component: Login, layout: null },
    { path: route.register, component: Register, layout: null },
];

const privateRoutes: any = [];

export { publicRoutes, privateRoutes };
