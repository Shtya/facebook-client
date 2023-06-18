import React ,{useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetIdUser } from '../../toolkit/S_Auth'

export const GetUser = ()=>{
    const [user , setuser] = useState([])
    useEffect(_=> setuser(JSON.parse(localStorage.getItem("facebook"))) , [])
    return [user]
  }

// export const GetUserReq = ()=>{
//   const dispatch = useDispatch()
//   const OwnUser = useSelector(e=> e.S_Auth.user) 
//   const [user]= GetUser()

//   useEffect(_=>{ if(user?._id){ dispatch(GetIdUser(user?._id))} } ,[])

//   return [OwnUser]
// }
