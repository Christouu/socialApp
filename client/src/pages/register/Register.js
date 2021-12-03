import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const username = useRef();
  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomeValidity("Passwords don't match");
    }

    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    try {
      await axios.post("/auth/register", user);
      history("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">KPsocial</h3>
          <span className="loginDesc">
            Connect with friends and the world aroudn you with KPsocial
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              ref={username}
              className="loginInput"
              required
            />
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              placeholder="Passwrod"
              type="password"
              className="loginInput"
              ref={password}
              required
              minLength="5"
            />
            <input
              placeholder="Re-Password"
              type="password"
              className="loginInput"
              ref={passwordAgain}
              required
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>

            <Link to="/login">
              <button className="loginRegisterButton">Login</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
