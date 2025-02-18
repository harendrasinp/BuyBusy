import React from 'react'
import orderStyle from "./Orders.module.css"
import { useUserContext } from '../userContext'
export const Orders = () => {
  const { orderbill } = useUserContext()
  console.log(orderbill)

  const formatDate = (timestamp) => {
    if (timestamp?.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
    return "No date";
  };

  return (
    <div className={orderStyle.container}>
      <div className={orderStyle.tableDiv}>
        {orderbill.map((bill) => (
          <table className={orderStyle.table}>
            <div>
              <div className={orderStyle.orderTitleDiv}>
                <div className={orderStyle.yourOrderTitle}>Your Orders</div>
                <div className={orderStyle.date}>Order On: {formatDate(bill.createdAt)}</div>
              </div>
              {/* -----------------table heading------------------------------------------- */}
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              {/* --------------------------table body-------------------------------------- */}
              {bill.product.map((item) => (
                <tbody>
                  <tr>
                    <td>{item.title}</td>
                    <td className="text-center align-middle">{item.qty}</td>
                    <td className="text-center align-middle">&#8377;{item.price}</td>
                  </tr>
                </tbody>
              ))}
              <tfoot>
                <tr>
                  <td ></td>
                  <td ></td>
                  <td className="text-center align-middle">&#8377;{bill.total}</td>
                </tr>
              </tfoot>
            </div>
          </table>
        ))}
      </div>
    </div>
  )
}

