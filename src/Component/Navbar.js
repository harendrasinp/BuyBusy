import React from 'react'
import Navstyle from "./Navbar.module.css"
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useUserContext } from '../userContext'
import { auth } from '../firebase/firebaseInit'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
export const Navbar = () => {
  const { userData } = useUserContext();
  const handleLogout= async()=>{
    try {
      await signOut(auth);
      toast.info("Logout Successfull !!!")
    } catch (error) {
      console.error('Logout Error:', error);
    }
  }
  return (
    <>
      <div className={Navstyle.container}>

        <div className={Navstyle.AppName}>
          <div>BuyBusy</div>
        </div>

        <div className={Navstyle.menuContainer}>
          <NavLink to="/" className={({ isActive }) => (isActive ? Navstyle.active : undefined)}><img src='https://cdn-icons-png.flaticon.com/128/2544/2544087.png' alt='home' />Home</NavLink>
          {userData ? (
            <>
              <NavLink to="/Orders" className={({ isActive }) => (isActive ? Navstyle.active : undefined)}><img src='https://cdn-icons-png.flaticon.com/128/3142/3142740.png' alt='order' />Orders</NavLink>
              <NavLink to="/Cart" className={({ isActive }) => (isActive ? Navstyle.active : undefined)}><img src='https://cdn-icons-png.flaticon.com/128/4290/4290854.png' alt='cart' />Cart</NavLink>
              {/* <div className={Navstyle.logout} onClick={handleLogout}><img src='https://cdn-icons-png.flaticon.com/128/11700/11700713.png' alt='login' /><span>Logout</span></div> */}
              <NavLink to="/Login" className={({ isActive }) => (isActive ? Navstyle.active : undefined)} onClick={handleLogout}><img src='https://cdn-icons-png.flaticon.com/128/11700/11700713.png' alt='logout' />Logout</NavLink>
            </>
          ) : (
            <NavLink to="/Login" className={({ isActive }) => (isActive ? Navstyle.active : undefined)}><img src='https://cdn-icons-png.flaticon.com/128/11700/11700713.png' alt='login' />Login</NavLink>
          )
          }
        </div>
      </div>
      <div className={Navstyle.bodyContainer}>
        <Outlet />
      </div>
    </>
  )
}
