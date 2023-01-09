const RouteRegistry = {
  landing: {
    path: '/',
  },
  app: {
    paths: {
      root: {
        path: '/app'
      },
      dashboard: {
        path: '/app/dashboard'
      },
      jobs: {
        path: '/app/jobs'
      },
      departments: {
        path: '/app/departments'
      },
      orders: {
        path: '/app/orders'
      },
      inventory: {
        path: '/app/inventory'
      },
      employees: {
        path: '/app/employees'
      },
    }
  },
  user: {
    paths: {
      signIn: {
        path: '/auth/signin'
      },
      signUp: {
        path: '/auth/signup'
      }
    }
  },
  error: {
    path: '/error',
  }
}

export default RouteRegistry;