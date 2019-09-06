import React from "react";

function Button(props) {
  return (
    <button
      className="btn btn-primary btn-block"
      onClick={props.onClick}
      type={props.type}
    >
      {props.value}
    </button>
  );
}

export default Button;
