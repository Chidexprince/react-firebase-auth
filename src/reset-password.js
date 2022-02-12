
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sendPasswordReset } from "./firebase-util";
import "./account.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
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
            <h3>Reset Password</h3>
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
            </form>
          </div>
          <div className="buttons">
            <button className="btn-one" onClick={() => sendPasswordReset(email)}>Reset Password</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ResetPassword