import { RouterProvider } from 'react-router-dom'
import { defaultRoutes } from './routes/browserRouters'
import { Toaster } from './components/ui/toaster'


export function App() {
	return (
		<>	
			<RouterProvider router={defaultRoutes} />
			<Toaster></Toaster>
		</>
	)
}
