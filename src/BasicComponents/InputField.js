import React from "react";

function InputField(props) {
  return (
    <div>
      <div className="input-wrapper">
        <span className="label important">{props.lable}</span>
        <input
          required={props.required}
          type={props.type}
          placeholder={props.placeholder}
          title={props.title}
          id={props.id}
          className={`input-field ${props.className}`}
          name={props.name}
          onChange={props.onChange}
          step={props.step}
          value={props.value}
        />
      </div>
    </div>
  );
}

export default InputField;
