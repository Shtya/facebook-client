import React, { useEffect, useState } from 'react'
import {GetUser} from "../../hooks/user/H_Getuser"
import { useDispatch, useSelector } from 'react-redux'
import { Editepost, Postpost } from '../../toolkit/S_Posts'
import {Error, success} from "../notification"
import {Spin} from "antd"


const EditePost = ({ShowEdite , setShowEdite , e  }) => {

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
        await dispatch(Editepost({data:{desc , image , user: user?._id} , id:e?._id }))
        setisload(false)
    }
    useEffect(_=>{
        if(isload === false){
            success("post Edite successfully")
            setTimeout(() => {
                setShowEdite(!ShowEdite)
            }, 1000);
        }
    } ,[isload])


      return (
    <div className='EditePost'>
        <div className="overlay">
            <div className="action">
            <h2>Edite post</h2>
            
            <i onClick={_=> setShowEdite(!ShowEdite)} className="fa-solid fa-xmark"></i>
            </div>

            <div className="title">
                <img src="./images/facebook1.png" alt="" />
                <div className="name">
                    <h2>Ahmed</h2>
                    <div className="status">
                        <i className="fa-solid fa-earth-americas"></i>
                        public
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                </div>
            </div>

                <textarea onChange={e=> setdesc(e.target.value)} value={desc} placeholder="Edite your post , Ahmed"></textarea>
                <div className="all">
                    <p>Edite your post</p>
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

export default EditePost