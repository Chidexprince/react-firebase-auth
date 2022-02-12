import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./firebase-util";
import { query, collection, getDocs, where } from "firebase/firestore";

import './dashboard.css';

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const fetchUserDetails = async () => {
        try {
          const querySnapshot = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(querySnapshot);
          const data = doc.docs[0].data();
          setName(data.name);
        } catch (err) {
          console.error(err);
        }
      };

      useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserDetails();
      }, [user, loading]);
    return (
        <div className="dashboard-container">
            <div className="inner">
                <h4>Welcome, {name}</h4> <br />
                <button className="logout" onClick={logout}>Log out</button>
            </div> 
        </div>
    )
 }

 export default Dashboard