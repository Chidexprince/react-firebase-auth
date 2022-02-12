import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDEL8MDH7oi44DkNrSU5tBXwOVpYxAEgh0",
    authDomain: "react-firebase-auth-c8d63.firebaseapp.com",
    projectId: "react-firebase-auth-c8d63",
    storageBucket: "react-firebase-auth-c8d63.appspot.com",
    messagingSenderId: "20591769640",
    appId: "1:20591769640:web:10c98e80d9b0e621411d1d"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    const user = response.user;
    const querySnapshot = query(collection(db, "users"), where("uid", "==", user.uid));
    const doc = await getDocs(querySnapshot);
    if (doc.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    console.log(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      console.log(err.message);
  }
};


const signupWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset link sent!");
  } catch (err) {
    console.error(err);
    console.log(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  signupWithEmailAndPassword,
  sendPasswordReset,
  logout,
};