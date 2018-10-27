import React from "react";
import "./Modal.css";

export const Modal = ({ children }) => {
    return (
        <div id="notemodal" className="modal">
            <div className="row justify-content-center">
                <div className="modal-content search-modal-content col-11 col-sm-11 col-md-9 col-lg-6 col-xl-5">
                    {children}
                </div>
            </div>
        </div>
    )
}