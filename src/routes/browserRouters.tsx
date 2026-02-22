import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Products } from '../pages/Products'
import { ErrorPage } from '../pages/Error'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/index'
import { User } from '../pages/User'
import { UserProtectedRoute } from './UserProtectedRoute'
import { RootLayout } from './RootLayout'

export const defaultRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <Register />,
      },
      {
        path: "user",
        element: (
          <UserProtectedRoute>
            <User />
          </UserProtectedRoute>
        ),
      },
    ],
  },
])
