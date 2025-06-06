import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import SingleProduct from "../pages/SingleProduct.jsx";
import AllCategories from "../pages/AllCategories.jsx";
import Checkout from "../pages/Checkout.jsx";
import Login from "../pages/Login.jsx";

import SingUp from "../pages/SingUp.jsx";

import AdminDashboard from "../pages/AdminDashboard.jsx";
import MyOrderOverview from "../pages/MyOrderOverview.jsx";
import WishlistPage from "../pages/WishlistPage.jsx";


export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/allcategories",
        element: <AllCategories />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/myorder",
        element: <MyOrderOverview />,
      },
      {
        path: "/wishlist",
        element: <WishlistPage />,
      },
      
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/SingUp",
    element: <SingUp />,
  },

  {
    path: "/dashboard",
    element: <AdminDashboard />,
    children: [
      
    ],
  },
]);
