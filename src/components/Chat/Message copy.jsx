import React from 'react'
import { baseImg } from '../../config/baseURL'
// import {format} from "timeago.js"

const Message = ({dir , e , ScrollRef}) => {
  
  return (
    <h2 ref={ScrollRef} className={`${dir&& "rtl"}`}> 
      <img src={baseImg+e?.sender?.profilePicture} /> 
      <div>
      <span> {e?.text}    </span>  
      {/* <p>{format(e?.createdAt)}</p> */}
      </div>
    </h2>
  )
}

export default Message