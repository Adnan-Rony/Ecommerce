import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout.jsx";
import Checkout from "../pages/Checkout.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import SingleProduct from "../pages/SingleProduct.jsx";

import SingUp from "../pages/SingUp.jsx";

import AdminDashboard from "../pages/AdminDashboard.jsx";
import BlogDetails from "../pages/BlogDetails.jsx";
import MyOrderOverview from "../pages/MyOrderOverview.jsx";
import AllCategories from "../pages/ProductsPage/AllCategories.jsx";
import WishlistPage from "../pages/WishlistPage.jsx";
import ContactUs from "../pages/ContactUs.jsx";

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
      {
        path: "/blogs/:id",
        element: <BlogDetails />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
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
    children: [],
  },
]);
