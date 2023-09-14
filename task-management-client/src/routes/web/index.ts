import route from './route';

import { DefaultLayout } from '../../layouts';

import Home from '../../pages/Home';
import Login from '../../pages/Login';

const publicRoutes: any = [
    { path: route.home, component: Home, layout: DefaultLayout },
    { path: route.login, component: Login, layout: null }
];

const privateRoutes: any = [];

export { publicRoutes, privateRoutes };
