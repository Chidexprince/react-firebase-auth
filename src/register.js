import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  signupWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase-util";
import { Link, useNavigate } from "react-router-dom";

import "./account.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const registerUser = () => {
    if (!name || !email || !password) {
      alert("Please enter all details");
      return;
    } 
    signupWithEmailAndPassword(name, email, password);
  };

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
            <p>Register</p>
          </div>
          <div className="inp">
            <form >
              <label htmlFor="name" className="name">Name </label>
              <input
                className="inp-left"
                type="text"
                placeholder="John Doe"
                id="name"
                name="displayName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
            </form>
          </div>
          <div className="buttons">
            <button className="btn-one" onClick={registerUser}>Register</button>
            <button className="btn-two" onClick={signInWithGoogle}>
              Sign up with google
            </button>
          </div>
          <div className="down">
            <p>Already have an account?</p>
            <Link to='/'> Log in </Link>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Register