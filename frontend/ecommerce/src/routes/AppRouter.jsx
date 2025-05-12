import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import SingleProduct from "../pages/SingleProduct.jsx";
import AllCategories from "../pages/AllCategories.jsx";
import Checkout from "../pages/Checkout.jsx";


export const AppRouter=createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        children:[
                {
                    path:"/",
                    element:<Home></Home>
                },
                {
                    path:"/categories",
                    element:<SingleProduct/>
                },
                {
                    path:"/allcategories",
                    element:<AllCategories/>
                },
                {
                    path:"/checkout",
                    element:<Checkout/>
                }
        ]
    }
])