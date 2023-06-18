// import React,{useState , useEffect, useRef} from 'react'
// import {useDispatch, useSelector} from "react-redux"
// import {Error, success} from "../../components/notification"
// import { PostPosts, Register } from '../../toolkit/S_user'




// export const  H_AddNewPost = ()=>{
//     const [desc , setdesc] = useState("")
//     const [userId , setuserId] = useState("")
//     const [image , setimage] = useState("")
//     const {user , isloading}= useSelector(e=> e.S_user)
//     const [isLoad , setisLoad] = useState(true)
    
//     useEffect(_=> setuserId(JSON.parse(localStorage?.getItem("facebook"))) ,[])
//     const dispatch = useDispatch()
//     const handleImg =(e) => {
//         if (e.target.files && e.target.files[0]) {
//           setimage(e.target.files[0])
//         }
//       }
  
//     const handelSub = async(e)=>{
//       e.preventDefault()
//       if(desc === "") return Error("Description post is required ")
//       if(image === "") return Error("Image post is required ")
//       setisLoad(true)
//       await dispatch(PostPosts({user : userId._id ,desc ,image}))
//       setisLoad(false)
//     }
    
//     useEffect(_=>{
//       if(isLoad === false){

//           success("The post has been created")
//           // setTimeout(() => {
//           //   window.location.reload(false)
//           // }, 1000);
//       }
//     } ,[isLoad])
//    return [ desc , setdesc , userId , isloading , image , setimage ,handelSub , handleImg]
// }