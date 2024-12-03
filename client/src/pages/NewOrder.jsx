import React from "react";
import { Formik, Form } from "formik";
import SenderForm from "../components/SenderForm";
import ReceiverForm from "../components/ReceiverFrom";
import ProductForm from "../components/ProductForm";
import { newOrderSchema } from "../schemas";
import "../styles/NewOrder.scss";
import axios from '../api/axios';
import { useAuth } from "../context/AuthContext";

const NewOrder = () => {
  const { auth } = useAuth();

  const initialValues = {
    sender: {
      name: "Knoz",
      phone1: "01551448276",
      phone2: "",
      state: "Garbia",
      city: "Kafr El Zayat",
      area: "Ibyar",
      street: "Home",
    },
    receiver: {
      name: "",
      phone1: "",
      phone2: "",
      state: "",
      city: "",
      area: "",
      street: "",
    },
    product: { name: "", type: "", weight: "1.00", quantity: "1", price: "" },
    signedBy: auth?.user.name,
  };

  const handleSubmit = async (values, actions) => {
    console.log("Form Data:", values);
    const {sender, receiver, product, signedBy} = values;
      try {
        const response = await axios.post('/api/order/add-order', {
          sender, receiver, product, signedBy
        });
        console.log(response);
        actions.resetForm();
      } catch (error) {
        console.log(error)
      }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={newOrderSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className="new-order-page">
          <div className="new-order-page-box">
            <h2>Sender Info</h2>
            <SenderForm />
          </div>

          <div className="new-order-page-box">
            <h2>Receiver Info</h2>
            <ReceiverForm />
          </div>

          <div className="new-order-page-box product-order-box">
            <h2>Product Info</h2>
            <ProductForm />
          </div>

          <button type="submit" className="new-order-btn">
            Order
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default NewOrder;