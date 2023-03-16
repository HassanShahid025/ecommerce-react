import { useState } from "react";
import "./auth.scss";
import registerImg from "../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isPasswordValid = password.length >= 6;
  const navigate = useNavigate();

  const registerUser = (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords donot match.");
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          setLoading(false);
          toast.success("Registration Successfull");
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <section className="container auth">
        <div className="form">
          <h2>Register</h2>
          <form onSubmit={registerUser}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p
              className={
                password.length <= 5 && password.length > 0
                  ? "warning-text"
                  : "hide"
              }
            >
              Minimum 6 characters.
            </p>
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="--btn --btn-primary --btn-block"
              disabled={!isPasswordValid}
            >
              Register
            </button>
          </form>
          <span className="register">
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
        <div className="img">
          <img src={registerImg} alt="Register" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;
