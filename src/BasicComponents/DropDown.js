import React from "react";

function DropDown(props) {
  return (
    <div>
      <div className="input-wrapper">
        <span className="label important">{props.lable}</span>
        <select
          required={props.required}
          type={props.type}
          placeholder={props.placeholder}
          title={props.title}
          id={props.id}
          className={`input-field ${props.className}`}
          name={props.name}
          onChange={props.onChange}
          style={{ color: props.value === "-1" ? "gray" : "#101111 " }}
          value={props.value}
        >
          {props.option.map((e) => {
            return (
              <option value={e.value} key={e.value}>
                {e.displayText}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default DropDown;
