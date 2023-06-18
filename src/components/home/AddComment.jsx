import React, {  useCallback, useEffect, useState } from 'react'
import { GetUser } from '../../hooks/user/H_Getuser'
import { useDispatch, useSelector } from 'react-redux'
import {  SetComment, SetLike } from '../../toolkit/S_Posts'
import { Error, success } from '../notification'
import EditePost from './EditePost'
import { baseUrl } from '../../config/baseURL'


const AddComment = ({showComment , setshowComment ,e}) => {
  const baseImg = "http://127.0.0.1:4000/posts/"
  const [comment , setcomment] = useState("")
  const dispatch = useDispatch()

  const [user] = GetUser()

  const handelLike= async()=>{
    const data =  await baseUrl.put(`/api/v1/post/${e?._id}/like` ,{user : user?._id}).then(res => res.data).catch(err => err.response.data)
    dispatch(SetLike( data ))
  }
  const handelComment = async()=>{
    if(comment === "") return Error("Write a comment ")
    const data =  await baseUrl.put(`/api/v1/post/${e?._id}/comment` ,{user : user , comment}).then(res => res.data).catch(err => err.response.data)
    await dispatch(SetComment(data))
    setcomment("")
    success("your comment has been added successfully ")
    setTimeout(() => {
      setshowComment(!showComment)
    }, 500);
  }


  return (
    <div className='AddComment' >
<div className="overlay">
<div className="top">


  <div className="title">
      <div className="content"><img src="./images/facebook1.png" alt="" /></div>
      <div className="about">
          <h1>{e?.user?.firstname}</h1>
          <div><span>{new Date(e?.createdAt).toLocaleString().split(",")[1]?.slice(0,6)} m</span>  <i className="fa-solid fa-earth-americas"></i></div>
      </div>
  </div>

  <i onClick={_=> setshowComment(!showComment)} className="x fa-solid fa-xmark"></i>


</div>

<div className="text">{e?.desc}</div>
<div className="cover"><img src={`${baseImg + e.image}`} alt="" /></div>


  <div className="interaction">
    {
      e?.likes?.length >=1 && <>
      <i className="fa-solid fa-heart"></i>
      <i className="fa-solid fa-thumbs-up"></i></>
    }
    {   e?.likes?.length>=1 ? e?.likes?.length +" Likes" : "" } 
  </div>


  <ul className="interation2">
    <li style={{color: e?.likes?.includes(user?._id) ? "red" : "" }} onClick={handelLike}> <i className="fa-solid fa-heart" ></i> Love</li>
    <li> <i className="fa-solid fa-message"></i>Comment</li>
    <li> <i className="fa-solid fa-share"></i> Share</li>
  </ul>

    <>
    {
      e?.comments?.length>=1 && e?.comments?.map((comment , index)=>(

      <div className="titlecomment" key={index}>
            <div className="content"><img src={`${baseImg + comment?.user?.profilePicture}`} alt="" /></div>
            <div className="about">
              <h1>{comment?.user?.firstname +" " +  comment?.user?.lastname}</h1>
              <div>{comment.comment}</div>
          </div>
      </div>

      ))
    }


  <div className="addcomment">
  <div className="content"><img src={baseImg+user?.profilePicture} alt="" /></div>
    <input value={comment} onChange={e=> setcomment(e.target.value)} type="text" placeholder='Write a comment' />
    <i onClick={handelComment} className="fa-regular fa-paper-plane"></i>
    </div>
  </>
</div>

    </div>
  )
}

export default AddComment