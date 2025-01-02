import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Protected from "./features/auth/protected";

import { CartPage } from "./pages/CartPage";
import Checkout from "./pages/Checkout";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";

import SignupPage from "./pages/SignupPage";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { useEffect } from "react";
import { fetchItemsByUserId } from "./features/cart/cartAPI";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { PageNotFound } from "./pages/PageNotFound";
import { OrderSuccessPage } from "./pages/orderSuccessPage";
import UserOrder from "./features/user/components/UserOrder";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfile from "./features/user/components/UserProfile";
import { UserProfilePage } from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/UserSlice";

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
    path: "/orders",
    element: <UserOrderPage></UserOrderPage>,
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user?.id));
      dispatch(fetchLoggedInUserAsync(user?.id));
    }
  }, [dispatch, user]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
