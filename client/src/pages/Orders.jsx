import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Orders.scss";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Orders = () => {
  const { orders, setOrders, getOrders, deleteOrder } = useAuth();
  const [category, setCategory] = useState([
    "All",
    "Unprinted",
    "Printed",
    "Signed",
    "Returned",
    "Cancelled",
  ]);
  const [selection, setSelection] = useState("All");

  // Sorting logic
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const sortData = (column) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);

    const sortedData = [...orders].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setOrders(sortedData);
  };

  useEffect(() => {
    getOrders();
    console.log(orders);
  }, []);

  return (
    // <div style={{position: 'relative'}}>
    //   <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Orders</h2>
    //   <div className="orders-category-selection">
    //     {category.map(item => {
    //         return (
    //           <button className={selection === item ? 'orders-category-btn active' : 'orders-category-btn'} key={item} value={item} onClick={e => setSelection(e.target.value)}>
    //             {item}
    //           </button>
    //         );
    //       }
    //     )}
    //   </div>
    //   <div className="orders-display-container">
    //     <table border="1" className="orders-table">
    //       <tr>
    //         <th>#</th>
    //         <th colSpan="7">Receiver Info</th>
    //         <th colSpan="4">Product Info</th>
    //         <th colSpan="2">Sender Info</th>
    //       </tr>
    //       <tr className="set-bolder">
    //         <td></td>
    //         <td>Name</td>
    //         <td>Phone1</td>
    //         <td>Phone2</td>
    //         <td>State</td>
    //         <td>City</td>
    //         <td>Area</td>
    //         <td>Street</td>
    //         <td>P_name</td>
    //         <td>P_type</td>
    //         <td>P_qunatity</td>
    //         <td>P_price</td>
    //         <td>S_name</td>
    //         <td>signedBy</td>
    //       </tr>

    //       {orders &&
    //         orders.filter(item => {
    //           if(selection === 'All') {
    //             return item;
    //           } else if(item.status === selection) {
    //             return item;
    //           }
    //         }).map((item, index) => {
    //           const { barcodeID, signedBy, status } = item;
    //           const { phone1, phone2, state, city, area, street } =
    //             item.receiver;
    //           const { type, quantity, weight, price } = item.product;
    //           return (
    //             <tr key={barcodeID}>
    //               <td>{index + 1}</td>
    //               <td>{item.receiver.name}</td>
    //               <td>{phone1}</td>
    //               <td>{phone2}</td>
    //               <td>{state}</td>
    //               <td>{city}</td>
    //               <td>{area}</td>
    //               <td>{street}</td>
    //               <td>{item.product.name}</td>
    //               <td>{type}</td>
    //               <td>{quantity}</td>
    //               <td>{price}</td>
    //               <td>{item.sender.name}</td>
    //               <td>{signedBy}</td>
    //               <td className="order-controllers">👁️</td>
    //             </tr>
    //           );
    //         })}
    //     </table>

    //   </div>
    // </div>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th onClick={() => sortData("receiver")}>Receiver</th>
            <th onClick={() => sortData("code")}>Code</th>
            <th onClick={() => sortData("status")}>Status</th>
            <th onClick={() => sortData("product")}>Product</th>
            <th onClick={() => sortData("price")}>Price</th>
            <th onClick={() => sortData("store")}>Store</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => {
            const { sender, receiver, product } = item;
            return (
              <tr key={index}>
                <td>{receiver.name}</td>
                <td>{item.barcodeID}</td>
                <td>{item.status}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{item.signedBy}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
