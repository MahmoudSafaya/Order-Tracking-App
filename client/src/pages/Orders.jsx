import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Orders.scss";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import OrderInfo from "../components/OrderInfo";
import NewOrder from "./NewOrder";
import BillOfLading from "../components/BillOfLading";

const Orders = () => {
  const { orders, setOrders, getOrders, deleteOrder } = useAuth();
  const [selection, setSelection] = useState("All");
  const [dotsBox, setDotsBox] = useState("");
  const [orderPopup, setOrderPopup] = useState({
    display: false,
    editing: false,
    info: {},
  });

  const categories = [
    "All",
    "Unprinted",
    "Printed",
    "Signed",
    "Returned",
    "Cancelled",
  ];

  const handleOrderPopup = (data) => {
    setOrderPopup({ ...orderPopup, ...data });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="orders-page">
      <div>
        <BillOfLading
          orders={
            orders && orders.filter((item) => item.status === "Unprinted")
          }
        />
      </div>
      <div className="category-selection">
        {categories.map((item) => {
          return (
            <div
              key={item}
              className={item === selection ? "active" : ""}
              onClick={() => setSelection(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Status</th>
              <th>Receiver</th>
              <th>State</th>
              <th>City</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Brand</th>
              <th>Store</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.filter(item => selection === 'All' ? item : item.status === selection).map((item, index) => {
                const { barcodeID, sender, receiver, product } = item;
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td
                      onClick={() =>
                        setOrderPopup({
                          display: true,
                          editing: false,
                          info: item,
                        })
                      }
                      className="barcode-id"
                    >
                      {barcodeID}
                    </td>
                    <td>{item.status}</td>
                    <td>{receiver.name}</td>
                    <td>{receiver.state}</td>
                    <td>{receiver.city}</td>
                    <td>{product.name || "-"}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{sender.name}</td>
                    <td>{item.signedBy}</td>
                    <td
                      className="order-dots"
                      onClick={() => setDotsBox(barcodeID)}
                    >
                      <HiOutlineDotsHorizontal />
                      {dotsBox === barcodeID && (
                        <div className="dots-box">
                          <p
                            onClick={() =>
                              setOrderPopup({
                                display: false,
                                editing: true,
                                info: item,
                              })
                            }
                          >
                            Edit <FaEdit />
                          </p>
                          <p onClick={() => deleteOrder(item._id)}>
                            Delete <MdDelete />
                          </p>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {orderPopup.display && <OrderInfo info={orderPopup.info} />}
        {orderPopup.editing && (
          <div className="editing-order-box">
            <div className="inside-it">
              <div className="inside-header">
                <h2>
                  Edit Order:{" "}
                  <span
                    onClick={() =>
                      navigator.clipboard.writeText(orderPopup.info.barcodeID)
                    }
                  >
                    {orderPopup.info.barcodeID}
                  </span>
                </h2>
                <span
                  className="close-icon"
                  onClick={() =>
                    setOrderPopup({ ...orderPopup, editing: false })
                  }
                >
                  <IoClose />
                </span>
              </div>
              <NewOrder
                editMode={orderPopup.editing}
                info={orderPopup.info}
                handleOrderPopup={handleOrderPopup}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
