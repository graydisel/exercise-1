import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ErrorBoundary} from "./pages/ErrorBoundary.tsx";
import {Layout} from "./components/layout/Layout.tsx";
import {routes} from "./components/routes.tsx";
import {NotFound} from "./pages/NotFound.tsx";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorBoundary/>,
      element: <Layout/>,
      children: [
          ...routes,
        {
          path: "*",
          Component: NotFound,
        }
      ]
    }
  ])

  return (
       <RouterProvider router={router}/>
  )
}

export default App
