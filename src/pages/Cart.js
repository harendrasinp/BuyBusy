import React, { useEffect, useState } from 'react'
import cartStyle from "./Cart.module.css"
import { useUserContext } from '../userContext'
export const Cart = () => {
  const { userCart,addtoCart,deductCart,removeCart } = useUserContext();
  const[totalprice,setTotalPrice]=useState(0);

  useEffect(()=>{
     if(userCart && userCart.length>0){
       const updatePrice=userCart.reduce((acc,item)=>acc+(item.price*item.qty),0)
       console.log(updatePrice)
       setTotalPrice(updatePrice)
     }
     else{
      setTotalPrice(0)
     }
     
  },[userCart])
  // ---------------------------------Return-------------------------------
  return (
    <div className={cartStyle.container}>
      <div className={cartStyle.calculateBox}>
        <div className={cartStyle.calculateitems}>
          <div className={cartStyle.priceTag}>TotalPrice: &#8377;{totalprice} /-</div>
          <button>Purchase</button>
        </div>
      </div>
      <div className={cartStyle.cardContainer}>
        {userCart?userCart.map((cart) => (
          <div key={cart.id} className={cartStyle.Card}>
            <img src={cart.image} alt='images' />
            <div className={cartStyle.productName}>{cart.title}</div>
            <div className={cartStyle.priceAndPlusMinus}>
              <div>&#8377;{cart.price}</div>
              <div className={cartStyle.PlusMinusQty}>
                <div><img src='https://cdn-icons-png.flaticon.com/128/10308/10308038.png' alt='add' onClick={()=>addtoCart(cart)}  /></div>
                <div>{cart.qty}</div>
                <div><img src='https://cdn-icons-png.flaticon.com/128/11450/11450375.png' alt='add' onClick={()=>deductCart(cart)}/></div>
              </div>
            </div>
            <div className={cartStyle.submitBtnDiv}>
              <button type='submit' onClick={()=>removeCart(cart)}>Remove from Cart</button>
            </div>
          </div>
        )):<h2>No any Cart</h2>}
      </div>
    </div>
  )
}
