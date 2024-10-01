import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/Home'
import { Products } from './pages/Products'

export const defaultRoutes = createBrowserRouter([
	{
		path: "/",
		element: <Home />
	},
	{
		path: "/products",
		element: <Products />
	}
])

// export const loggedUserRoutes = createBrowserRouter([])