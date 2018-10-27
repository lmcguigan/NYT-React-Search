import React from "react";
import "./Col.css";

export const Col = ({ size, clName, children }) => (
  <div className={size.split(" ").map(size => "col-" + size).join(" ") + " " + clName} >
    {children}
  </div>
);
