import React from "react";
import "./ArticleHolder.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const ArticleHolder = ({type, children}) => (
    <div className="card">
        <div className="card-header">
            <h3>{type}</h3>
        </div>
        {children}
    </div>
);

export default ArticleHolder;