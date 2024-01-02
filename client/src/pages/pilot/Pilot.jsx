import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./pilot.module.css";
const linkstyle = {
  textDecoration: "none",
  color: "inherit",
};
function Pilot() {
  return (
    <div>
      <h1>Simple Session-Authentication using Express and React</h1>
      <div className={styles.logandregBtns}>
        <Link style={linkstyle} to="/login">
          <button>Login</button>
        </Link>
        <Link style={linkstyle} to="/register">
          <button className={styles.registerBtn}>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Pilot;
