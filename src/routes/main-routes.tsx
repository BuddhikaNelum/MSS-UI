import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from 'layout/app-layout';
import Loadable from 'components/Loadable';
import RouteRegistry from './route-registry';

const Inventory = Loadable(lazy(() => import('views/inventory')));
const Departments = Loadable(lazy(() => import('views/departments')));
const Orders = Loadable(lazy(() => import('views/orders')));
const Employees = Loadable(lazy(() => import('views/employees')));
const Jobs = Loadable(lazy(() => import('views/jobs')));

const DashboardRoutes = {
  path: '/app',
  element: <AppLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={RouteRegistry.app.paths.departments.path} />,
    },
    {
      path: RouteRegistry.app.paths.inventory.path,
      element: <Inventory />
    },
    {
      path: RouteRegistry.app.paths.departments.path,
      element: <Departments />
    },
    {
      path: RouteRegistry.app.paths.orders.path,
      element: <Orders />
    },
    {
      path: RouteRegistry.app.paths.employees.path,
      element: <Employees />
    },
    {
      path: RouteRegistry.app.paths.jobs.path,
      element: <Jobs />
    }
  ]
};

export default DashboardRoutes;
