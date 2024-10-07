import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/Home";

export const defaultRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

// export const loggedUserRoutes = createBrowserRouter([])
