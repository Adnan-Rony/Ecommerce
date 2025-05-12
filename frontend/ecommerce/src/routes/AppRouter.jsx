import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout.jsx";
import Home from "../pages/Home.jsx";


export const AppRouter=createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        children:[
                {
                    path:"/",
                    element:<Home></Home>
                }
        ]
    }
])