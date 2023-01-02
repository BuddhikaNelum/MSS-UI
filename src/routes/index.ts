import { useRoutes } from 'react-router-dom';

import DashboardRoutes from './main-routes';
import AuthenticationRoutes from './authentication-routes';
import GeneralRoutes from './general-routes';

export default function AppRoutes() {
    return useRoutes([GeneralRoutes, AuthenticationRoutes, DashboardRoutes]);
}
