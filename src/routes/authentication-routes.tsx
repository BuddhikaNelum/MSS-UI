import { lazy } from 'react';
import Loadable from 'components/Loadable';
import UserLayout from 'layout/user-layout';
import RouteRegistry from './route-registry';

const SignIn = Loadable(lazy(() => import('views/user/sign-in')));
const SignUp = Loadable(lazy(() => import('views/user/sign-up')));

const AuthenticationRoutes = {
  path: '/auth',
  element: <UserLayout />,
  children: [
    {
      path: RouteRegistry.user.paths.signIn.path,
      element: <SignIn />
    },
    {
      path: RouteRegistry.user.paths.signUp.path,
      element: <SignUp />
    }
  ]
};

export default AuthenticationRoutes;
