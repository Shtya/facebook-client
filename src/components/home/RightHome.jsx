import React, { useEffect } from 'react'
import { GetUser } from '../../hooks/user/H_Getuser'
import { useDispatch, useSelector } from 'react-redux'
import { GetIdUser, SetFollow } from '../../toolkit/S_Auth'
import { baseImg, baseUrl } from '../../config/baseURL'
import { success } from '../notification'

const RightHome = ({anyChange , setanyChange}) => {
  const dispatch = useDispatch()
  const [user] = GetUser()
  useEffect(_=>{if(user?._id) dispatch(GetIdUser(user?._id))} ,[user , anyChange])
  const MyData = useSelector(e=>e.S_Auth.user )


  const handleFirend = async(e)=>{
    const data = await baseUrl.put(`/api/v1/user/${user?._id}/follow` , {WannaFollowThisId : e?._id} ).then(res=> res.data).catch(err=> err.response.data)
    
    await dispatch(SetFollow(data))
    success(`${e?.firstname} UnFollowed`)
    setanyChange(!anyChange)
  }

  return (
    <div className='RightHome'>
    
      <div className="contact">
      <p>Following</p>
        <div className="icons">
        <i className="fa-solid fa-video"></i>
        <i className="fa-solid fa-magnifying-glass"></i>
        <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>

      <ul>
        {
          MyData?.following?.map((e,index)=>(

            // <li> <div className="cover"> <img src={baseImg+e.profilePicture} alt="" /></div> <p>{e?.firstname + " " + e?.lastname}</p> </li>
            <div className="friend" key={index}>
            <img className='custom' src={`${baseImg}${e?.profilePicture}`} alt="" />
            <div className="about">
              <h2>{e?.firstname + " " + e?.lastname}</h2>
              <button onClick={_=>handleFirend(e)} >UnFollow</button>
            </div>
          </div>
          ))
        }
      </ul>

      
    </div>
  )
}

export default RightHome