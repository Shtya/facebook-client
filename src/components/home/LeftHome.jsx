import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { baseImg, baseUrl } from '../../config/baseURL'
import { GetUser, GetUserReq } from '../../hooks/user/H_Getuser'
import {useDispatch, useSelector} from "react-redux"
import { GetAllUser, GetFollow, SetFollow } from '../../toolkit/S_Auth'
import {success} from "../notification"

const LeftHome = ({anyChange , setanyChange}) => {

  const [user] = GetUser()
  const dispatch = useDispatch()

  const [suggestions , setsuggestions ] = useState()

  useEffect(_=> {  user?._id &&baseUrl.get(`/api/v1/user/${user?._id}/suggestion` ).then(res=>setsuggestions( res.data))},[user , anyChange])
  

  const handleFirend = async(e)=>{
    const data = await baseUrl.put(`/api/v1/user/${user?._id}/follow` , {WannaFollowThisId : e?._id} ).then(res=> res.data).catch(err=> err.response.data)
    
    await dispatch(SetFollow(data))
    success(`${e?.firstname} followed`)
    setanyChange(!anyChange)
  }
  return (
    <div className='LeftHome'>

    <div className="box">
      <span>Suggestions </span>
      <span>People You May Know </span>
      {
        suggestions?.data?.map((e,index)=> (

      <div className="friend" key={index}>
        <img className='custom' src={`${baseImg}${e?.profilePicture}`} alt="" />
        <div className="about">
          <h2>{e?.firstname + " " + e?.lastname}</h2>
          <button onClick={_=>handleFirend(e)} >{
             "Follow"
          }</button>
        </div>
      </div>
        ))
      }

    </div>
    </div>
  )
}

export default LeftHome