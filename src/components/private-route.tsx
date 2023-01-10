import { Navigate } from 'react-router-dom';
import RouteRegistry from 'routes/route-registry';
import { useAppSelector } from 'hooks/hooks';
import { useCallback } from 'react';
import { UserType } from 'enums/userType';
import { selectCurrUser } from 'features/app-slice';

interface IPrivateRouteProps {
  component: any;
  roles?: UserType[];
}

export function PrivateRoute({ component, roles }: IPrivateRouteProps) {
  const user = useAppSelector(selectCurrUser);

  const isAuthenticated = useCallback(() => {
    return !!user?.id;
  }, [user]);

  const isAuthorized = useCallback((roles) => {
    return true;
    // return roles.includes(user?.userType);
  }, [user]);

  // return isAuthenticated() && isAuthorized(roles) ? component :  <Navigate to={RouteRegistry.auth.paths.signIn.path} />;

  if (isAuthenticated()) {
    if (!roles || isAuthorized(roles)) {
      return component;
    } else {
      return <Navigate to={RouteRegistry.app.paths.root.path} />;
    }
  } else {
    return <Navigate to={RouteRegistry.user.paths.signIn.path} />;
  }
}
