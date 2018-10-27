import React from "react";
import "./AddNoteBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const AddNoteBtn = props => (
  <button className="btn add-btn" {...props}>
    Add Note
  </button>
);

export default AddNoteBtn;