import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase-util";
import { useAuthState } from "react-firebase-hooks/auth";

import "./account.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="container">

      <div className="container-left">
        <div className="wrapper-left">
          <div className="part-one">
            <h3>Get started</h3>
            <p>Login</p>
          </div>
          <div className="inp">
            <form >
              <label htmlFor="email" className="email">E-mail </label>
              <input
                className="inp-left"
                type="email"
                placeholder="example@gmail.com"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password" className="pass">Password </label>
              <input
                className="inp-left"
                type="password"
                placeholder="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link className="text-align-right"  to='/reset-password'>Forgot password?</Link>
            </form>
          </div>
          <div className="buttons">
            <button className="btn-one" onClick={() => logInWithEmailAndPassword(email, password)}>Login</button>
            <button className="btn-two" onClick={signInWithGoogle}>
              Sign in with google
            </button>
          </div>
          <div className="down">
            <p>Don't have an account?</p>
            <Link to='/register'> Create your account </Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login