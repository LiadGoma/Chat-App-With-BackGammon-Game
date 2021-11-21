import "./Modal.css";
import React from 'react'
import Popup from 'reactjs-popup';
import "./Modal.css";
import 'reactjs-popup/dist/index.css';

function Modal2({ text, open, acceptMethod, rejectMethod }) {
    return (
        <Popup className="pop" open={open}>
            <div className="popup" >
                <div>{text}</div>
                <div className="footer">
                    {acceptMethod && <button className="accept" onClick={acceptMethod}>Accept</button>}
                    {rejectMethod && <button className="reject" onClick={rejectMethod}>Reject</button>}
                </div>
            </div>
        </Popup >
    )
}

export default Modal2
