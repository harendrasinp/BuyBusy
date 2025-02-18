import React, { useState } from 'react'
import loginStyle from "./LoginPage.module.css"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseInit';
import { toast } from 'react-toastify';


export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // --------------------------function----------------------------------
  const checkAuth = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      // setIsLoggedIn(true);
      console.log(userCredential)
      toast.success("Loging Successfull !!!")
    } catch {
      setEmail("");
      setPassword("");
      toast.error("Authentication Faill !!!")
    }
  }
  return (
    <div className={loginStyle.container}>
      <div className={loginStyle.loginBox}>
        <div className={loginStyle.heading}>Login</div>
        <form className={loginStyle.loginForm} onSubmit={checkAuth}>
          <input placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit'>Login</button>
          <Link to="signup">Or SignUp Insted</Link>
        </form>
      </div>
      <Outlet />
    </div>
  )
}

