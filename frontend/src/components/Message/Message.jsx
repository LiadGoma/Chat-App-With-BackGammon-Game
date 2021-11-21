import React, {useEffect} from 'react';
import "./Message.css";
import {format} from "timeago.js";





function Message({sentAt,text,own}, ref) {

    useEffect(()=>{

        if(ref && ref.current){
            ref.current.scrollIntoView({smooth:true});
        }
    },[])
    return (
        <div className={own? "message own" : "message"} ref={ref}>
            <div className="messageTop">
                <img className="messageImg"
                alt=""
                src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png">
                </img>
                <div className="messageText">{text}</div>
            </div>
            <div className="messageBottom">{format(sentAt)}</div>
        </div>
    )
}
export const FowardMessage = React.forwardRef(Message)
export default Message
