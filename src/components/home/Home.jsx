import React from 'react'
import {useState , useRef , useEffect} from "react"
import AddPost from './AddPost'
import Posts from './Posts.jsx'
import { useDispatch , useSelector } from 'react-redux'
import Stories from './Stories'
import AboutYourMind from './AboutYourMind'
import { GetUser } from '../../hooks/user/H_Getuser'
import { GetFollowingpost } from '../../toolkit/S_Posts'



const Home = ({anyChange , setanyChange}) => {
  const [showPost , setshowPost] = useState(false)
  const dispatch = useDispatch()
  const [user] = GetUser()

  useEffect(_=> {
    if(user?._id) dispatch(GetFollowingpost(user?._id)) 
  },[user , anyChange])
  const {post , isloading} = useSelector(e=> e.S_Posts)

  return (
    <div className='Home'> 
      {/* <Stories/> */}
      <AboutYourMind setshowPost={setshowPost} showPost={showPost}/>

      {
       post?.length >= 1 && post?.map((e,index)=> <Posts key={index} e={e} />)  
      }

      {showPost && <AddPost  showPost={showPost} setshowPost={setshowPost} />}
    </div>
  )
}

export default Home