import React from "react";

import "./Modal.css";
import loading from "../../images/Ripple-1s-200px.svg"

const Modal = props => {
    console.log(props)
    return (
        <div className="aModal" style={props.modalStyle} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Loading...</h5>
                    </div>
                    <div className="modal-body">
                        <img src={loading} />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Modal;