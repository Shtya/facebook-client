import React, { useEffect, useState } from 'react'
import {GetUser} from "../../hooks/user/H_Getuser"
import { useDispatch, useSelector } from 'react-redux'
import { Postpost } from '../../toolkit/S_Posts'
import {Error, success} from "../notification"
import {Spin} from "antd"
import { baseImg } from '../../config/baseURL'


const AddPost = ({showPost , setshowPost}) => {

    const [desc , setdesc] = useState("")
    const [image , setimage] = useState("")
    const [user]  = GetUser ()
    const [isload , setisload] = useState(true)
    const dispatch = useDispatch()


    const handleImg = (e)=>{ if(e.target.files && e.target.files[0]) setimage(e.target.files[0])}
    const {post , isloading} = useSelector(e=> e.S_Posts)
    const handelSub = async()=>{
        if(desc === "") return Error("Description Is Required ")
        if(image === "") return Error("Image post Is Required ")
        setisload(true)
        await dispatch(Postpost({desc , image , user: user?._id}))
        setisload(false)
    }
    useEffect(_=>{
        if(isload === false){
            success("post added successfully")
            setTimeout(() => {
                setshowPost(!showPost)
                // window.location.reload(false)
            }, 1000);
        }
    } ,[isload])


      return (
    <div className='AddPost'>
        <div className="overlay">
            <div className="action">
            <h2>Create post</h2>
            
            <i onClick={_=> setshowPost(!showPost)} className="fa-solid fa-xmark"></i>
            </div>

            <div className="title">
                <img src={user ?  baseImg+user?.profilePicture : "./images/facebook1.png"} alt="" />
                <div className="name">
                    <h2>{user?.firstname}</h2>
                    <div className="status">
                        <i className="fa-solid fa-earth-americas"></i>
                        public
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                </div>
            </div>

                <textarea onChange={e=> setdesc(e.target.value)} value={desc} placeholder={`What's on your mind , ${user?.firstname}`}></textarea>
                <div className="all">
                    <p>Add to your post</p>
                    <ul>
                        <li> <label htmlFor="image"> <img src="./images/image.png" alt="" /></label></li>
                        <li> <label htmlFor="image"><img src="./images/tag.png" alt="" /></label></li>
                        <li> <label htmlFor="image"><img src="./images/feel.png" alt="" /></label></li>
                        <li> <label htmlFor="image"><img src="./images/map.png" alt="" /></label></li>
                        <li> <label htmlFor="image"><img src="./images/flag.png" alt="" /></label></li>
                        <input onChange={handleImg} type="file" style={{opacity:"0" ,position:"absolute" , zIndex:"-100000" }} id='image' />
                    </ul>
                </div>
                <button  onClick={handelSub}>{
                isloading === false  ?  "post"  : <Spin className="submit"></Spin>
                }</button> 
                
        </div>

    </div>
  )
}

export default AddPost