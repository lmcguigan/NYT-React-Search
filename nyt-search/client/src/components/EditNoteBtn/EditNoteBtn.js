import React from "react";
import "./EditNoteBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const EditNoteBtn = props => (
  <button className="btn edit-btn edit-note-btn" {...props}>
    <i className="fa fa-edit"></i>
  </button>
);

export default EditNoteBtn;
