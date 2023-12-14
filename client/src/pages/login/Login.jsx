import instanceURL from "../../config/instance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);
      const { email, password } = loginForm;

      const { data } = await instanceURL.post("/auth/login", {
        email,
        password,
      });
      localStorage.access_token = data.access_token;
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div>
        <h1>Loading ...</h1>
      </div>
    );
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Paksibuk</h3>
          <span className="loginDesc">
            Connect with friends and the world around you.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              name="email"
              onChange={handleInput}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              name="password"
              onChange={handleInput}
            />
            <button className="loginButton" type="submit">
              Log In
            </button>
            <button
              type="button"
              className="loginRegisterButton"
              onClick={() => navigate("/register")}
            >
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
