import React from "react";

export const ListItem = ({ id, children }) => {
  return (
    <li className="list-group-item" id={id}>
      {children}
    </li>
  )
};
