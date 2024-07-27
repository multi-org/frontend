import { RouterProvider } from "react-router-dom"

import { defaultRoutes } from "./browserRouters"

export function App() {
	
	
	return (
		<>
			<RouterProvider router={defaultRoutes} />			
		</>
	)
}
