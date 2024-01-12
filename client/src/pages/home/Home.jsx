import React, { useState, useEffect } from "react";
import styles from "./home.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://authnest.onrender.com/home");
      setUserData(response.data[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const logoutHandler = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/logout").then((res) => {
      if (res.data.allow) {
        navigate("/");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Hello! {userData.name}</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia neque
        sit quas. Obcaecati accusamus numquam magni quam suscipit iste libero
        enim facere totam repellendus voluptates quo perspiciatis culpa, ut
        voluptatibus.
      </p>
      <div>
        <b>Email</b>: {userData.email}
      </div>

      <button className={styles.logoutBtn} onClick={logoutHandler}>
        Logout
      </button>
      <br />
      <button>
        <a style={{ textDecoration: "none" }} href="/">
          Back
        </a>
      </button>
    </div>
  );
}

export default Home;
