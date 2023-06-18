import React, { useEffect, useState } from 'react'
import Posts from '../components/home/Posts'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPosts } from '../toolkit/S_Posts'
import { useParams } from 'react-router-dom'
import { GetUser } from '../hooks/user/H_Getuser'
import { baseImg } from '../config/baseURL'

const ProfilePage = () => {
    const someFriends = Array.from(Array(8).keys())
    const [showMore , setshowMore] = useState(false)

    const dispatch = useDispatch()
    const {userId} = useParams()

    useEffect(_=> { dispatch(getMyPosts(userId))} ,[])
    const {myPosts} = useSelector(e=> e.S_Posts)
    const [user] = GetUser()

    const handleImageCover = ()=>{

    }
  return (
    <div className="profile">
    <div className='Page_Profile container'>
        <div className="images">
            <div className="imgs">
                <img src="images/mosque.jpg" alt="" />
                <div className="profilePic">
                        <img onClick={handleImageCover} src={baseImg+user?.profilePicture} alt="" />
                        <i className="fa-solid fa-camera"></i>
                        <div className="editeCoverFoto">
                        <i className="fa-solid fa-camera"></i>
                            <h3>Edite cover photo</h3>
                        </div>
                    </div>
            </div>

            <div className="bottom">
                <div className="center">
                    <h2>Ahmed Abdelrhman</h2>
                    <div className="friend"> 553 friends</div>
                    <div className="contain">{someFriends.map((e,index)=> <img key={index} className='some-people' src='./image/A.jpg' /> )}</div>
                </div>
                <div className="right">
                    <button> <i className="fa-solid fa-plus"></i> Add to story</button>
                    <button> <i className="fa-solid fa-pencil"></i> Edite profile </button>
                    <i className="fa-solid fa-angle-down"></i>
                </div>
            </div>

            <div className="links">
            <ul>
                <li>posts</li>
                <li>About</li>
                <li>Friends</li>
                <li>photos</li>
                <li>Videos</li>
                <li>Reels</li>
                <li onClick={_=> setshowMore(!showMore)} style={showMore ? {color:"blue"}:{color:"black"}} className='showMore'>More <i  className="fa-solid fa-caret-down"></i></li>
                { showMore&&
                    <ul>
                    <li>Check-ins</li>
                    <li>Sports</li>
                    <li>Movies</li>
                    <li>TV shows</li>
                    <li>Books</li>
                    <li>Links</li>
                    <li>Events</li>
                    <li>Questions</li>
                </ul>
                }
            </ul>
            <i className="fa-solid fa-ellipsis"></i>
            </div>
        </div>

    </div>
        <div className="container postsAll">
            {
                myPosts&& myPosts?.data?.map((e,index) => ( <Posts key={index} e={e} />))
            }

        </div>

    </div> 
  )
}

export default ProfilePage