import instanceURL from "../../config/instance";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "830963084603-l6s7rfn3r0inlolmlsount0ah8duesv7.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

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
      localStorage.isMember = data.isMember;

      if (data.isMember) {
        navigate("/");
      } else {
        navigate("/payment");
      }
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
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleCredentialResponse = async ({ credential }) => {
    try {
      setLoading(true);

      const { data } = await instanceURL.post(
        "/googleLogin",
        {},
        { headers: { ["google-token"]: credential } }
      );
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
  };

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
            <div className="d-flex flex-column align-items-center">
              <div id="buttonDiv"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
