import { createBrowserRouter, redirect } from "react-router-dom";

import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Payment from "./pages/payment/Payment";

function checkToken() {
  if (!localStorage.getItem("access_token")) {
    return redirect("/login");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (
        localStorage.getItem("access_token") &&
        localStorage.getItem("isMember")
      ) {
        return redirect("/");
      } else {
        return null;
      }
    },
  },
  {
    path: "/payment",
    element: <Payment />,
    loader: () => {
      if (localStorage.getItem("isMember") === true) {
        return redirect("/");
      } else if (!localStorage.getItem("access_token")) {
        return redirect("/login");
      } else {
        return null;
      }
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      if (
        localStorage.getItem("access_token") &&
        localStorage.getItem("isMember")
      ) {
        return redirect("/");
      } else {
        return redirect("/payment");
      }
    },
  },
  {
    path: "/",
    element: <Home />,
    loader: checkToken,
  },
]);

export default router;
