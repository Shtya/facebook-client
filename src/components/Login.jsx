import React, { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Register } from '../toolkit/S_Auth';
import { Error , success } from './notification';
import { Spin } from 'antd/lib';
const Login = ({showSignUp, setshowSignUp}) => {
 
  


  const nums = Array.from(Array(31).keys())
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const year = []
  for(let i = 1990 ; i< 2024 ; i++) year.push(i)


  const [fname , setfname] = useState("")
  const [lname , setlname] = useState("")
  const [email , setemail] = useState("")
  const [password , setpassword] = useState("")
  const [passwordConfirm , setpasswordConfirm] = useState("")
  const [image , setimage] = useState("")
  const {user , isloading}= useSelector(e=> e.S_Auth)
  const [isLoad , setisLoad] = useState(true)
  const dispatch = useDispatch()

  const handleImage = (e)=>{
    if(e.target.files && e.target.files[0]){
      setimage(e.target.files[0])
    }
  }

  const handelSub = async(e)=>{
    e.preventDefault()
    if(fname == "") return Error("First name Is Required")
    if(lname == "") return Error("Last name Is Required")
    if(email == "") return Error("E-mail Is Required")
    if(password == "") return Error("Password Is Required")
    if(passwordConfirm == "") return Error("Password confirm  Is Required")
    if(image == "") return Error("image profile  Is Required")

    setisLoad(true)
    await dispatch(Register({email , password , firstname : fname , lastname : lname , passwordConfirm  , profilePicture:image}))
    setisLoad(false)
  }
  
  useEffect(_=>{
    if(isLoad === false){
      if(user?.Error) Error(user.Error[0].msg)
      else {
        success("You have been registered successfully")
        localStorage.setItem("facebook" , JSON.stringify(user))
        setTimeout(() => {
          setshowSignUp(!showSignUp)
        }, 500);
      }
    }
  } ,[isLoad])




  return (

    <div >
      <div className="x">
        <h2>Sign Up</h2>
        <img src="./images/x.png" alt="" onClick={_=> setshowSignUp(!showSignUp)} />
      </div>
      <p>It's quick and easy</p>

      <form onSubmit={handelSub}>
        <div className="content1">
          <input value={fname} onChange={e=> setfname(e.target.value)}  type="text" placeholder='First name' />
          <input value={lname} onChange={e=> setlname(e.target.value)}  type="text" placeholder='Surname'    />
        </div>

          <input value={email} onChange={e=> setemail(e.target.value)}  type="email" placeholder='Mobile number or email address'  />
          <input value={password} onChange={e=> setpassword(e.target.value)}  type="password" placeholder='password'  />
          <input value={passwordConfirm} onChange={e=> setpasswordConfirm(e.target.value)}  type="password" placeholder='confirm password'  />
          <input  onChange={handleImage}  type="file"   />
          


        <p>Date of birth <i className="fa-solid fa-question"></i> </p>
        <div className="content2">
          <select >
            {nums.slice(1).map((e,index)=> <option key={index} value={e}>{e}</option>)}
          </select>
          
          <select >
            {month.map((e,index)=> <option key={index} value={e}>{e}</option>)}
          </select>
          
          
          <select >
            {year.map((e,index)=> <option key={index} value={e}>{e}</option>)}
          </select>
          
          
        </div>

        <p>Gender <i className="fa-solid fa-question"></i> </p>
        <div className="content3">
         
         <label className="gender" id='Female'>
            <label htmlFor="Female">Female</label>
            <input  type="checkbox" name="" id="Female" />
          </label> 
         
         <label className="gender" id='Male'>
            <label htmlFor="Male">Male</label>
            <input  type="checkbox" name="" id="Male" />
          </label> 
         
         <label className="gender" id='Custom'>
            <label htmlFor="Custom">Custom</label>
            <input  type="checkbox" name="" id="Custom" />
          </label> 
          
        </div>


        {
          isloading === false 
          ? <input type="submit" style={{opacity:isloading ? ".6" : "1" , border:"none"}} className='submit' value="Sign Up" />
          : <Spin className="submit"></Spin>
        }

      </form>
    </div>
  )
}

export default Login