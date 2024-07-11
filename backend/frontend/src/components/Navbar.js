import React, { useContext } from "react";
import logo from "../img/logo.png";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { LoginContext } from "../context/LoginContext";

export default function Navbar({ login }) {
  const { setModalOpen } = useContext(LoginContext);
  const navigate = useNavigate(); // Initialize navigate hook

  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return (
        <>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/createPost">Create Post</Link>
          <Link style={{ marginLeft: "20px" }} to="/followingpost">
            My Following
          </Link>
          <Link to={""}>
            <button className="primaryBtn" onClick={() => setModalOpen(true)}>
              Log Out
            </button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>
      );
    }
  };

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the home page ("/")
  };

  return (
    <div className="navbar">
      {/* Handle logo click */}
      <img src={logo} alt="Logo" onClick={handleLogoClick} className="logo-img" />
      <ul className="nav-menu">{loginStatus()}</ul>
    </div>
  );
}
