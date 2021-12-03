import React, { useRef, useContext } from "react";
import "./Login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function Login() {
  const { dispatch, isFetching } = useContext(AuthContext);

  const email = useRef();
  const password = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
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
            <button className="loginButton" disabled={isFetching} type="submit">
              {isFetching ? <CircularProgress color="white" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password ?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
