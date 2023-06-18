import React from 'react'
import { GetUser } from '../../hooks/user/H_Getuser'
import { baseImg } from '../../config/baseURL'

const AboutYourMind = ({setshowPost , showPost}) => {
  const [user] = GetUser()
  return (
    <div className="add-post" onClick={_=> setshowPost(!showPost)}>
        <div className="text">
          <img className='custom' src={baseImg+user?.profilePicture} alt="" />
          <p>what's on your mind, {user?.firstname} ?</p>
        </div>
        <ul>
          <li> <img src="./images/camira.png" alt="" /> <p>Live </p></li>
          <li> <img src="./images/image.png" alt="" /> <p>photo/video</p></li>
          <li> <img src="./images/feel.png" alt="" /> <p>Feeling/activity </p></li>
        </ul>
      </div>
  )
}

export default AboutYourMind