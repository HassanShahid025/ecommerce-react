import React from "react";
import "./auth.scss";
import forgotImg from "../../assets/forgot.png";
import { Link } from "react-router-dom";

const Reset = () => {
  return (
    <section className="container auth">
      <div className="img">
        <img src={forgotImg} alt="Reset" width="400" />
      </div>
      <div className="form">
        <h2>Reset Password</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button className="--btn --btn-primary --btn-block">
            Reset Password
          </button>
          <div className="links">
            <p>
              <Link to="/login">- Login</Link>
            </p>
            <p>
              <Link to="/register">- Register</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Reset;
