import "./form-input.styles.scss";

// a generic form input with label and a span for the mandatory flag which is a *
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
          {<span className="mandatory-asterisk"> *</span>}
        </label>
      )}
    </div>
  );
};

export default FormInput;
