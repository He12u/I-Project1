import React from "react";
import instanceURL from "../../config/instance";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./register.css";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formInput, setFormCreate] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setFormCreate({ ...formInput, [name]: value });
  }

  async function handleSubmit(e) {
    console.log("jalan handleSubmit");
    e.preventDefault();
    try {
      setLoading(true);
      const { username, email, password } = formInput;

      await instanceURL.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
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
        <h1>Loading ....</h1>
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
              placeholder="Username"
              required
              className="loginInput"
              name="username"
              onChange={handleInput}
            />
            <input
              placeholder="Email"
              required
              className="loginInput"
              type="email"
              name="email"
              onChange={handleInput}
            />
            <input
              placeholder="Password"
              required
              className="loginInput"
              type="password"
              minLength="6"
              name="password"
              onChange={handleInput}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button
              type="button"
              className="loginRegisterButton"
              onClick={() => navigate("/login")}
            >
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
