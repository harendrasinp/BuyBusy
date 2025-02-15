import React from 'react'
import cartStyle from "./Cart.module.css"
export const Cart = () => {
  return (
    <div className={cartStyle.container}>
      <div className={cartStyle.calculateBox}>
        <div className={cartStyle.calculateitems}>
          <div className={cartStyle.priceTag}>TotalPrice: &#8377;{25000} /-</div>
          <button>Purchase</button>
        </div>
      </div>
      <div className={cartStyle.cardContainer}>
        <div key={""} className={cartStyle.Card}>
          <img src="https://m.media-amazon.com/images/I/61Qe0euJJZL.jpg" alt='images' />
          <div className={cartStyle.productName}>{("product.data.title")}</div>
          <div className={cartStyle.priceAndPlusMinus}>
            <div>&#8377;650</div>
            <div className={cartStyle.PlusMinus}>
              <div><img src='https://cdn-icons-png.flaticon.com/128/10308/10308038.png' alt='add'/></div>
              <div><img src='https://cdn-icons-png.flaticon.com/128/11450/11450375.png' alt='add'/></div>
            </div>
          </div>
          <div className={cartStyle.submitBtnDiv}>
            <button type='submit'>Remove from Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
