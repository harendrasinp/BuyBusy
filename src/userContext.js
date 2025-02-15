import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { auth } from './firebase/firebaseInit';

//----------------------creat Context for user------------------------
const userContext=createContext();

// Custome hook for user can use any component------------------------
export  const useUserContext=()=>{
    const value=useContext(userContext);
    return value;
}
//--Context Provider for to make the boundry of children(Ex.App)---
const UserContextProvider=({children})=>{
    const[userData,setUserData]=useState(null);
    useEffect(()=>{
        const unsuscrib=onAuthStateChanged(auth,(currentUser)=>{
            if(currentUser){
                setUserData(currentUser);
            }
            else{
                setUserData(null)
            }
        })
        return ()=>{
            unsuscrib();
        }
    },[]);
    console.log(userData)
    return(
        <userContext.Provider value={{userData}}>
            {children}
        </userContext.Provider>
    )
}
export default UserContextProvider;