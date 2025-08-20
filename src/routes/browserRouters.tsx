import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Products } from '../pages/Products'
import { Product } from '../pages/Product'
import { ErrorPage } from '../pages/Error'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/index'
import { User } from '../pages/User'
import { UserProtectedRoute } from './UserProtectedRoute'

export const defaultRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/produtos/:id',
    element: <Product />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <Register />,
  },
  {
    path: '/user',
    element: (
      <UserProtectedRoute>
        <User />
      </UserProtectedRoute>
    ),
  }
])

// export const loggedUserRoutes = createBrowserRouter([])
