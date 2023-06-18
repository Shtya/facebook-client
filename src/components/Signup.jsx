import React, { useState , useEffect } from 'react'
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {PostLogin} from "../toolkit/S_Auth"
import {Error , success} from "../components/notification"

import {Spin} from "antd"
const Signup = ({setshowSignUp , showSignUp}) => {
  
  const [email , setemail] = useState("")
  const [password , setpassword] = useState("")
  const {user , isloading}= useSelector(state=> state.S_Auth)
  const [isLoad , setisLoad] = useState(true)
  const dispatch = useDispatch()

  const handelSub = async(e)=>{
    e.preventDefault()
    if(email == "") return Error("E-mail Is Required")
    if(password == "") return Error("Password Is Required")

    setisLoad(true)
    await dispatch(PostLogin({email , password}) )
    setisLoad(false)
  }
  
  useEffect(_=> {
    if(isLoad === false){      
     if(user?.Error)  Error(user?.Error.message)
     else if(user?.Error)  Error(user?.Error[0].msg)
      else {
        success("You have been registered successfully")
        localStorage.setItem("facebook" , JSON.stringify(user?.data))
        localStorage.setItem("facebooktoken" , JSON.stringify(user?.token))
        setTimeout(() => {
          window.location.reload(false)
          window.location.href="/home"
        }, 1000);
      }
    }
  } ,[isLoad])



  return (
    <div className={`Signup ${showSignUp ? "over" : ""}`}>
      <div className="content ">
        <input value={email} onChange={e=>setemail(e.target.value)} type="email"  id="email" />
        <label className={`${email !== "" ? "showlabel" : ""}`} htmlFor="email" >Email address or phone number</label>
      </div>
      
      <div className="content">
        <input value={password} onChange={e=>setpassword(e.target.value)} type="password"  id="password" />
        <label className={`${password !== "" ? "showlabel" : ""}`} htmlFor="password">password </label>
      </div>

{
  isloading === false ?  <input className='submit'  type="submit" value="Log in" onClick={handelSub}/> : <Spin  className="submit"></Spin>
}
      
      
      <Link>Forgotten password?</Link>

      <button onClick={_=>setshowSignUp(!showSignUp)}>Create new account</button>
    
      </div>
      
  )
}

export default Signup