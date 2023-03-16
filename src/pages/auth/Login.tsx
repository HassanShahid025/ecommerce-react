import React from "react";
import "./auth.scss";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import loginImg from "../../assets/login.png";

const Login = () => {
  return (
    <section className="container auth">
      <div className="img">
        <img src={loginImg} alt="Login" width="400" />
      </div>
      <div className="form">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button className="--btn --btn-primary --btn-block">Login</button>
          <div className="links">
            <Link to="/reset">Reset Password</Link>
          </div>
          <p>-- or --</p>
        </form>
        <button className="--btn --btn-danger --btn-block">
          <FaGoogle color="#fff" /> Login With Google
        </button>
        <span className="register">
          <p>Don't have a account?</p>
          <Link to="/register">Register</Link>
        </span>
      </div>
    </section>
  );
};

export default Login;
