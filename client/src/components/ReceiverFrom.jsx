import React from "react";
import InputField from "./InputField";

const ReceiverForm = () => {
  return (
    <div className="single-form">
      
      <InputField name='receiver.name' labelName='Receiver Name' requird='true' />
      <InputField name='receiver.phone1' labelName='Receiver Phone' requird='true' />
      <InputField name='receiver.phone2' labelName='Receiver Phone 2' />
      <InputField name='receiver.state' labelName='Receiver State' requird='true' />
      <InputField name='receiver.city' labelName='Receiver City' requird='true' />
      <InputField name='receiver.area' labelName='Receiver Area' requird='true' />
      <InputField name='receiver.street' labelName='Receiver Street' requird='true' />
     
    </div>
  );
};

export default ReceiverForm;
