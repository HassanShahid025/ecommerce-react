import { useState } from "react";
import "./auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import loginImg from "../../assets/login.png";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = (e: any) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        toast.success("Login Successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setLoading(false);
  };

  const provider = new GoogleAuthProvider()
  const signInWithGoogle = () => {
    signInWithPopup(auth,provider)
    .then((result) => {
      const user = result.user
      toast.success("Login Successful")
      navigate('/')
    })
    .catch((error) => {
      toast.error(error.message)
    })
  }

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <section className="container auth">
        <div className="img">
          <img src={loginImg} alt="Login" width="400" />
        </div>
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={loginUser}>
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
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
            <div className="links">
              <Link to="/reset">Reset Password</Link>
            </div>
            <p>-- or --</p>
          </form>
          <button className="--btn --btn-danger --btn-block" onClick={signInWithGoogle}>
            <FaGoogle color="#fff" /> Login With Google
          </button>
          <span className="register">
            <p>Don't have a account?</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </section>
    </>
  );
};

export default Login;
