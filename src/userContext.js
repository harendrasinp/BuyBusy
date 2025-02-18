import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { auth, db } from './firebase/firebaseInit';
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
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
    const [totalprice, setTotalPrice] = useState(0);
    const [orderbill, setOrderbill] = useState([]);
   
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
    }, [userData]);

    useEffect(()=>{
        if(userData){
            const billreff=collection(db,"users",userData.uid,"Bill");
            onSnapshot(billreff,(onSnap)=>{
                const bills=onSnap.docs.map((bill)=>{
                    return{
                        ...bill.data(),
                        id:bill.id
                    }
                });
                setOrderbill(bills);
            })
        }
    },[userData])
    //---------------------------------function-------------------------------------------------

    // ------------------------------add Cart function------------------------------------
    const addtoCart = async (cartData) => {
        try {
            const cartItemRef = doc(db, "users", userData.uid, "cart", cartData.id);
            const data = userCart.find((item) => item.id === cartData.id);
            if (data) {
                const upateQty = data.qty + 1;
                await setDoc(cartItemRef, {
                    title: cartData.title,
                    price: cartData.price,
                    image: cartData.image,
                    qty: upateQty

                }, { merge: true });
                toast.success("added successfully!");
            } else {
                await setDoc(cartItemRef, {
                    title: cartData.title,
                    price: cartData.price,
                    image: cartData.image,
                    qty: 1
                });
                toast.success("added successfully!");
            }
        } catch (error) {
            console.error("Error adding cart item: ", error);
        }
    }
    //-----------------------------------------deduct Cart function-------------------------------
    const deductCart = async (addedCart) => {
        const docReff = doc(db, "users", userData.uid, "cart", addedCart.id);
        const cartdata = await getDoc(docReff);
        const data = cartdata.data();
        if (data.qty > 0) {
            const updateqty = data.qty - 1;
            await setDoc(docReff, {
                qty: updateqty
            }, { merge: true })
            toast.info("Cart Deducted !!!");
        } else {
            await deleteDoc(docReff);
        }
    }
    // ----------------------------------Remove Function---------------------------------------------------
    const removeCart = async (cart) => {
        const docReff = doc(db, "users", userData.uid, "cart", cart.id);
        await deleteDoc(docReff);
        toast.info("Cart Deleted !!!");
    }

    const purchase = async () => {
        const orderRef = collection(db, "users", userData.uid, "Bill",);
        // const billdata=await getDoc(orderRef);
        await addDoc(orderRef, {
            product: userCart,
            total: totalprice,
            createdAt: new Date()
        });
        toast.info("bill Generated !!!");
    }
    // ------------------------------Return------------------------------------------------
    return (
        <userContext.Provider value={{
            loadFechedData,
            setLoadFetchedData,
            userData,
            addtoCart,
            userCart,
            deductCart,
            removeCart,
            totalprice,
            setTotalPrice,
            purchase,
            orderbill
        }}>
            {children}
        </userContext.Provider>
    )
}
export default UserContextProvider;