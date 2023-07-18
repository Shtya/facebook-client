import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import LeftHome from '../components/home/LeftHome'
import Home from '../components/home/Home'
import RightHome from '../components/home/RightHome'
import { useDispatch, useSelector } from 'react-redux'
import { GetUser } from '../hooks/user/H_Getuser'
import { GetIdUser } from '../toolkit/S_Auth'


const HomePage = () => {
  const [anyChange , setanyChange] = useState(true)
  const dispatch = useDispatch()
  const [user] = GetUser()
  useEffect(_=>{if(user?._id) dispatch(GetIdUser(user?._id))} ,[user , anyChange])
  const MyData = useSelector(e=>e.S_Auth.user )

  return (
    <div className='Page_Home'>
      <Nav />

      <div className="home container">
        <LeftHome anyChange={anyChange} setanyChange={setanyChange} />
        <Home anyChange={anyChange} setanyChange={setanyChange} />
        {
          MyData?.following?.length !== 0  &&<RightHome anyChange={anyChange} setanyChange={setanyChange} MyData={MyData} />
        }
        
      </div> 
    </div>
  )
}

export default HomePage