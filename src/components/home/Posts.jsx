import React, {  useCallback, useEffect, useState } from 'react'
import { GetUser } from '../../hooks/user/H_Getuser'
import { useDispatch, useSelector } from 'react-redux'
import { LikePost, SetLike, deletepost } from '../../toolkit/S_Posts'
import { success } from '../notification'
import EditePost from './EditePost'
import { baseImg, baseUrl } from '../../config/baseURL'
import AddComment from './AddComment'
// import {format} from "timeago.js"

const Posts = ({e}) => {
  const dispatch = useDispatch()
  const [isload , setisload] = useState(true)
  const [showul , setshowul] = useState(false)
  const [ShowEdite , setShowEdite] = useState(false)
  const [showComment , setshowComment] = useState(false)
  const [user] = GetUser()
  

  const handelLike= async()=>{
    const data =  await baseUrl.put(`/api/v1/post/${e?._id}/like` ,{user : user?._id}).then(res => res.data).catch(err => err.response.data)
    dispatch(SetLike( data ))
  }

  const handleDelete = async()=>{
    setisload(true)
    await dispatch(deletepost(e?._id))
    setisload(false)
  }
  useEffect(_=>{
    if(isload === false) {
      success("Deleted Successsfully ..")}
  } ,[])

  const handleEdite = ()=>{
    setShowEdite(!ShowEdite)
    setshowul(!showul)
  }

  return (
    <div className='Posts' >
            <div className="top">


            <div className="title">
                <div className="content"><img className='custom' src={`${baseImg}${e?.user?.profilePicture}`} /></div>
                <div className="about">
                    <h1>{e?.user?.firstname}</h1>
                    <div><span>{e?.createdAt} </span>  <i className="fa-solid fa-earth-americas"></i></div>
                </div>
            </div>


            <div className="showMore">
                <i onClick={_=> setshowul(!showul)} style={{opacity: showul && ".6"}} className="fa-solid fa-ellipsis"></i>
                <ul className={`${showul && "show"}`}>
                  <li> <i className="fa-regular fa-bookmark"></i> <span> Save post</span></li>
                  { e?.user?._id == user?._id 
                  ?<> <li onClick={handleEdite}> <i className="fa-solid fa-pen"></i> <span> Edite Post</span></li>
                      <li onClick={handleDelete}> <i className="fa-regular fa-trash-can" ></i> <span> Delete Post</span></li>
                    </>  : null}
                </ul>
            </div>


            </div>


        <div className="text">{e?.desc}</div>
        <div className="cover"><img src={baseImg + e.image} alt="" /></div>



        <div className="interaction">
            {
              e?.likes &&e?.likes?.length >=1 && <>
              <i className="fa-solid fa-heart"></i>
            <i className="fa-solid fa-thumbs-up"></i></>
            }
              {e?.likes?.length>=1 ? e?.likes.length +" Likes" : "" } 
              {e?.comments?.length>=1 ? "    " + e?.comments.length +" Comments" : "" } 
        </div>


        <ul className="interation2">
            <li style={{color: e.likes?.includes(user?._id) ? "red" : "" }} onClick={handelLike}> <i className="fa-solid fa-heart" ></i> Love</li>
            <li onClick={_=> setshowComment(!showComment)}> <i className="fa-solid fa-message"></i>Comment</li>
            <li> <i className="fa-solid fa-share"></i> Share</li>
        </ul>

    {/* comments */}
    { e?.comments?.length>=1 && e?.comments.slice(0,2)?.map((comment , index)=>(
      <div className="titlecomment" key={index}>
            <div className="content"><img src={`${baseImg + comment?.user?.profilePicture}`} alt="" /></div>
            <div className="about">
              <h1>{comment?.user?.firstname +" " +  comment?.user?.lastname}</h1>
              <div>{comment.comment}</div>
          </div>
      </div>

      ))}


    {e?.comments?.length>=3 && <div className="showmorecomments" onClick={_=> setshowComment(!showComment)} >
    <div className="inner"> <span>Show More</span>  <i className="fa-solid fa-circle-chevron-down"></i></div>
    </div>}
              {showComment && <AddComment showComment={showComment} setshowComment={setshowComment} e={e} /> }
              {ShowEdite && <EditePost ShowEdite={ShowEdite} setShowEdite={setShowEdite}  e={e}  /> }
    </div>
  )
}

export default Posts