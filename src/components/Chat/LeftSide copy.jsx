import React, { useEffect, useState } from 'react'
import { baseImg, baseUrl } from '../../config/baseURL';
import { Link } from 'react-router-dom';
import { GetUser } from '../../hooks/user/H_Getuser';


const LeftSideCopy = ({members , handelChat , anyChange , setanyChange}) => {
    const [user] = GetUser()
    const [search , setsearch ] = useState("")
    const [reasult , setreasult ] = useState(null)
    useEffect(_=>{ search!== "" ? baseUrl.get(`/api/v1/user?keyword=${search}`) .then(res =>setreasult(res.data) ) : setreasult(null)},[search])

    // Create Conversation
    const handleAddChat =async (e)=>{
        await baseUrl.post(`/api/v1/conversation` , {receiver: e?._id , sender:user?._id})
        setreasult(null)
        setanyChange(!anyChange)
        setsearch("")
    }


    return (
    <div className='LeftSide'>
        <h2>chats</h2>
        <div className="boxtop">
            <input type="text" value={search} onChange={e=> setsearch(e.target.value)} placeholder='Find someone to start a conversation ' />

            <div className={`showSearch ${reasult?.data?.length>=1 ? "show" : ""}`}>
                {
                    reasult?.data?.map((e,index)=>(

                    <div onClick={_=> handleAddChat(e)} className="box1" key={index}>
                        <img className='custom' src={baseImg+e.profilePicture} alt="" />
                        <span> {e?.firstname + " " + e?.lastname}</span>
                    </div>
                    ))
                }
                    </div>
        </div>


        {
            members && members?.map((e,index)=> (

                <Link onClick={_=>handelChat(e)}  className="box" key={index}>
                    <img className='custom' src={baseImg+e?.profilePicture} alt="" />
                    <span>{e?.firstname + " " + e?.lastname}</span>
                </Link>

            ))
        }

        
</div>
  )
}

export default LeftSideCopy