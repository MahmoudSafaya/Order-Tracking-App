import { Field, ErrorMessage } from "formik";

const InputField = ({ name, labelName, requird }) => {
    return (
      <div className="form-input-box">
        <label htmlFor={name}>{requird ? <span className="requird-tag">*</span> : ""}{labelName}:</label>
        <Field name={name} id={name} placeholder={labelName} />
        <ErrorMessage
          name={name}
          component="div"
          style={{ color: "red" }}
        />
      </div>
    );
  };
  
  export default InputField;
  