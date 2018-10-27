import React from "react";
import "./FormBtn.css";

export const FormBtn = props => (
  <button {...props} className="btn form-btn">
    {props.children}
  </button>
);
