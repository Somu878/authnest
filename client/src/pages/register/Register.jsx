import React, { useState } from "react";
import styles from "./register.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [userExist, setuserExist] = useState(false);
  const [formvalues, setformvalues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inputHandler = (e) => {
    setformvalues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .post("https://authnest.onrender.com/register", formvalues)
      .then((res) => {
        if (res.data.allow) {
          navigate("/home");
        } else {
          setuserExist(true);
        }
      });
  };
  return (
    <div className={styles.containerBox}>
      <div className={styles.title}>Register</div>
      <form action="/register" method="post" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={inputHandler}
          spellCheck="false"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          onChange={inputHandler}
          spellCheck="false"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={inputHandler}
          required
        />
        {userExist ? (
          <p style={{ marginBottom: "10px", margin: "0", color: "red" }}>
            Email already exists!Please Login or Try a different email
          </p>
        ) : (
          <></>
        )}
        <button className={styles.registerBtn} type="submit">
          Register
        </button>
      </form>
      <div className={styles.loginDiv}>
        Already have an account?
        <span>
          <a href="/login">Login</a>
        </span>
      </div>
    </div>
  );
}

export default Register;
