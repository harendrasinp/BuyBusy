import React from 'react'
import Navstyle from "./Navbar.module.css"
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
export const Navbar = () => {
  return (
    <>
      <div className={Navstyle.container}>

        <div className={Navstyle.AppName}>
          <div>BuyBusy</div>
        </div>

        <div className={Navstyle.menuContainer}>
          <NavLink to="/" className={({ isActive }) => (isActive ? Navstyle.active : undefined)}><img src='https://cdn-icons-png.flaticon.com/128/2544/2544087.png' alt='home' />Home</NavLink>
          <NavLink to="/Orders" className={({ isActive }) => (isActive ? Navstyle.active : undefined)}><img src='https://cdn-icons-png.flaticon.com/128/3142/3142740.png' alt='order' />Orders</NavLink>
          <NavLink to="/Cart" className={({ isActive }) => (isActive ? Navstyle.active : undefined)}><img src='https://cdn-icons-png.flaticon.com/128/4290/4290854.png' alt='cart' />Cart</NavLink>
          <NavLink to="/Login" className={({ isActive }) => (isActive ? Navstyle.active : undefined)}><img src='https://cdn-icons-png.flaticon.com/128/11700/11700713.png' alt='login' />Login</NavLink>
        </div>
      </div>
      <div className={Navstyle.bodyContainer}>
        <Outlet />
      </div>
    </>
  )
}


