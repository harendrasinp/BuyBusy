import React, { useState } from 'react'
import signupStyle from "./Signup.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseInit';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { GridLoader } from 'react-spinners';

export const Signup = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [spinnerStatus, setSpinnerStatus] = useState(false);
  const Navigate=useNavigate()
  // ---------------------functions------------------------

  const handleForm = async (e) => {
    e.preventDefault();
    setSpinnerStatus(true)
    const response = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
    await setDoc(doc(db, "users", response.user.uid), { usename: userName, email: userEmail, password: userPassword });
    setSpinnerStatus(false)
    toast.success("SignUp Successfull !!!")
    Navigate("/");
    setUserName("");
    setUserEmail("");
    setUserPassword("");
  }
  return (
    <div className={signupStyle.container}>
      {spinnerStatus?<div><GridLoader loading={spinnerStatus} color="#2e86c1"/></div>
          : <div className={signupStyle.loginBox}>
          <div className={signupStyle.heading}>SignUp</div>
          <form className={signupStyle.loginForm} onSubmit={handleForm}>
            <input placeholder='Enter Name' value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input placeholder='Enter Email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
            <input type='password' placeholder='Enter Password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
            <button type='submit'>Signup</button>
            <Link to="/Login">Or Login Insted</Link>
          </form>
        </div>
    }
      
     
    </div>
  )
}
