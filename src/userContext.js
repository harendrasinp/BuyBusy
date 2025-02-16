import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { auth, db } from './firebase/firebaseInit';
import { collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
//----------------------creat Context for user------------------------
const userContext = createContext();

// Custome hook for user can use any component------------------------
export const useUserContext = () => {
    const value = useContext(userContext);
    return value;
}
//--Context Provider for to make the boundry of children(Ex.App)---
const UserContextProvider = ({ children }) => {
    const [loadFechedData, setLoadFetchedData] = useState([]);
    const [userData, setUserData] = useState(null);
    const [userCart, setUserCart] = useState([]);
    // ---------------------hooks------------------------------------
    useEffect(() => {
        const unsuscrib = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUserData(currentUser);
            }
            else {
                setUserData(null)
            }
        })
        return () => {
            unsuscrib();
        }
    }, []);

    useEffect(() => {
        if (userData) {
            const cartItemRef = collection(db, "users", userData.uid, "cart");
            onSnapshot(cartItemRef, (docSnap) => {
                const cart = docSnap.docs.map((cart) => {
                    return {
                        id: cart.id,
                        ...cart.data()
                    }
                });
                setUserCart(cart)
            });
        }
    },[userData]);
    //---------------------------------function-------------------------------------------------
    const addtoCart = async (cartData) => {
        try {
            const cartItemRef = doc(db, "users", userData.uid, "cart", cartData.id);
            const data = userCart.find((item) => item.id === cartData.id);
            if (data) {
                const upateQty = data.qty + 1;
                await setDoc(cartItemRef, {
                    title: cartData.data.title,
                    price: cartData.data.price,
                    image: cartData.data.image,
                    qty: upateQty

                }, { merge: true });
                toast.success("added successfully!");
            } else {
                await setDoc(cartItemRef, {
                    title: cartData.data.title,
                    price: cartData.data.price,
                    image: cartData.data.image,
                    qty: 1
                });
                toast.success("added successfully!");
            }

        } catch (error) {
            console.error("Error adding cart item: ", error);
        }

    }
    console.log(userCart)
    return (
        <userContext.Provider value={{ loadFechedData, setLoadFetchedData, userData, addtoCart, userCart }}>
            {children}
        </userContext.Provider>
    )
}
export default UserContextProvider;