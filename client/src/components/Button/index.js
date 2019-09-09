import React from "react";

import "./index.css";

function Button(props) {
  return (
    <button
      className="btn btn-orange btn-block"
      onClick={props.onClick}
      type={props.type}
    >
      {props.value}
    </button>
  );
}

export default Button;
