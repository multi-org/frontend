import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { Product } from './pages/Product'
import { ErrorPage } from './pages/Error'
import { User } from './pages/User'

export const defaultRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/produtos',
    element: <Products />,
  },
  {
    path: '/produtos/:id',
    element: <Product />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
  {
    path: '/user',
    element: <User />,
  }
])

// export const loggedUserRoutes = createBrowserRouter([])
