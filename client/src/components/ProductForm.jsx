import React from "react";
import InputField from "./InputField";

const ProductForm = () => {
  return (
    <div className="single-form">
      
      <InputField name='product.name' labelName='Product Name' />
      <InputField name='product.type' labelName='Product Type' />
      <InputField name='product.weight' labelName='Product Weight' requird='true' />
      <InputField name='product.quantity' labelName='Product Quantity' requird='true' />
      <InputField name='product.price' labelName='Product Price' requird='true' />
     
    </div>
  );
};

export default ProductForm;
