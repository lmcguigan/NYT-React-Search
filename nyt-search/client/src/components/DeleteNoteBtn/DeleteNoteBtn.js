import React from "react";
import "./DeleteNoteBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const DeleteNoteBtn = props => (
  <button className="btn btn-primary delete-note-btn" {...props}>
    <i className="fa fa-trash"></i>
  </button>
);

export default DeleteNoteBtn;
