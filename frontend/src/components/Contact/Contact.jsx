import React from 'react';
import "./Contact.css";

const Contact = ({user,status, click}) => {
    return (

        <div className="contact" onClick={()=> click(user)}>

            <div className="contact">
                <img src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" alt="avatar" className="avatar" />
                <div className="about">
                    <div className="name">{user.name}</div>
                    <div className="status">
                        <i className={`fa fa-circle ${status}`}></i>{status}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
