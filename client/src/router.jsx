import { createBrowserRouter, redirect } from "react-router-dom";

import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

function checkToken() {
  if (!localStorage.getItem("access_token")) {
    return redirect("/");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/home");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/home");
      }
      return null;
    },
  },
]);

export default router;
