import React, { useState } from "react";
import styles from "./login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [valid, setvalid] = useState(true);
  const [values, setvalues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const inputHandler = (e) => {
    setvalues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const loginhandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.post("http://localhost:8000/login", values).then((res) => {
      if (res.data.allow) {
        navigate("/home");
      } else {
        setvalid(false);
      }
    });
  };
  return (
    <div>
      <div className={styles.boxContainer}>
        <div className={styles.title}>Login</div>
        <form onSubmit={loginhandler}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            onChange={inputHandler}
            required
            spellCheck="false"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={inputHandler}
            required
          />
          {!valid ? (
            <p
              style={{
                color: "red",
                margin: "0",
                padding: "0",
              }}
            >
              Invalid Credentials
            </p>
          ) : (
            <></>
          )}
          <button className={styles.loginBtn} type="submit">
            Login
          </button>
        </form>
        <div className={styles.registerDiv}>
          Don't have an account?{" "}
          <span>
            <a href="/register">Register</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
