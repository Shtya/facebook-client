import React, { useEffect, useState } from 'react'
import { baseImg, baseUrl } from '../../config/baseURL';
import { Link } from 'react-router-dom';


const LeftSide = ({conversation , ownUser , handleChats}) => {
    let users = null
    const [Friend , setFriend] = useState()

    // 1) get members in this user
     users = conversation&&conversation?.map(ele => ele.members.find(e=> e !== ownUser?._id))

    // 2) get data for all users
    useEffect(_=>{users && baseUrl.get("/api/v1/user?user="+users).then(res => setFriend(res.data))} ,[ownUser])
    

    return (
    <div className='LeftSide'>
    <h2>chats</h2>
    {
        Friend && Friend?.data?.map((e,index)=> (

            <Link onClick={_=>handleChats(e)}  className="box" key={index}>
                <img className='custom' src={baseImg+e?.profilePicture} alt="" />
                <span>{e?.firstname + " " + e?.lastname}</span>
            </Link>

        ))
    }
</div>
  )
}

export default LeftSide