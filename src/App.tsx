import { RouterProvider } from 'react-router-dom'
import { defaultRoutes } from './browserRouters'
import { Toaster } from './components/ui/toaster'


export function App() {
	return (
		<>	
			<RouterProvider router={defaultRoutes} />
			<Toaster></Toaster>
		</>
	)
}
