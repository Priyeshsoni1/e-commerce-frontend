import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Protected from "./features/auth/Protected";

import { CartPage } from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";

import SignupPage from "./pages/SignupPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./features/auth/authSlice";
import { PageNotFound } from "./pages/PageNotFound";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";

import UserOrderPage from "./pages/UserOrderPage";

import { UserProfilePage } from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/UserSlice";
import { Logout } from "./features/auth/components/Logout";

import ForgotPasswordPage from "./pages/ForgotPasswordPage";

import AdminHome from "./pages/AdminHome";

import AdminProductDetailPage from "./pages/AdminProductDetailPage";

import AdminProductFormPage from "./pages/AdminProductFormPage";

import AdminOrdersPage from "./pages/AdminOrders";
import StripeCheckout from "./pages/StripeCheckout";
import ProtectedAdmin from "./features/auth/ProtectedAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/orders",
    element: <UserOrderPage></UserOrderPage>,
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "/stripe-checkout/",
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPasswordPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);
  return (
    <div className="App">
      {userChecked && (
        <>
          <RouterProvider router={router} />
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
