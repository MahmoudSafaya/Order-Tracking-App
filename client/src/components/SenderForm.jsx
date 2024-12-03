import React from "react";
import InputField from "./InputField";

const SenderForm = () => {
  return (
    <div className="single-form">
      
      <InputField name='sender.name' labelName='Sender Name' requird='true' />
      <InputField name='sender.phone1' labelName='Sender Phone' requird='true' />
      <InputField name='sender.phone2' labelName='Sender Phone 2' />
      <InputField name='sender.state' labelName='Sender State' requird='true' />
      <InputField name='sender.city' labelName='Sender City' requird='true' />
      <InputField name='sender.area' labelName='Sender Area' requird='true' />
      <InputField name='sender.street' labelName='Sender Street' requird='true' />
     
    </div>
  );
};

export default SenderForm;
