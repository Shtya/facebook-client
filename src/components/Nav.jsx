import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { GetUser } from '../hooks/user/H_Getuser';
import { baseImg } from '../config/baseURL';


const Nav = () => {
    const [show , setshow] = useState(false)
    const [showUL , setshowUL] = useState(false)
    const [user] = GetUser()

    const handleOut = ()=>{
      localStorage.removeItem('facebook')
      window.location.href = "/"
    }
    return (
    <div className='nav'  >
        <div className="left">
            <img style={{cursor:"pointer"}} src="./images/facebook1.png" alt="" />
            <div>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder='Search ..' />
            </div>
        </div>

        <div className="right">
          <Link to={`/home`}>  <svg viewBox="0 0 28 28" className="x1lliihq x1k90msu x2h7rmj x1qfuztq x5e5rjt" fill="currentColor" height="28" width="28"><path d="M25.825 12.29C25.824 12.289 25.823 12.288 25.821 12.286L15.027 2.937C14.752 2.675 14.392 2.527 13.989 2.521 13.608 2.527 13.248 2.675 13.001 2.912L2.175 12.29C1.756 12.658 1.629 13.245 1.868 13.759 2.079 14.215 2.567 14.479 3.069 14.479L5 14.479 5 23.729C5 24.695 5.784 25.479 6.75 25.479L11 25.479C11.552 25.479 12 25.031 12 24.479L12 18.309C12 18.126 12.148 17.979 12.33 17.979L15.67 17.979C15.852 17.979 16 18.126 16 18.309L16 24.479C16 25.031 16.448 25.479 17 25.479L21.25 25.479C22.217 25.479 23 24.695 23 23.729L23 14.479 24.931 14.479C25.433 14.479 25.921 14.215 26.132 13.759 26.371 13.245 26.244 12.658 25.825 12.29"></path></svg> </Link>
           <Link to="/chat"> <svg viewBox="0 0 28 28" alt="" className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0" fill="currentColor" height="20" width="20"><path d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z"></path></svg>        </Link>
           <div onClick={_=>setshowUL(!showUL)} className="boxright"><Link to=""> <img  src={`${baseImg}${user?.profilePicture}`} className="custom" /></Link> <i className="fa-solid fa-caret-down"></i></div>
            
            <ul className={`${showUL && "showUl"}`}>
              <div className="box"> <div> <img src={`${baseImg}${user?.profilePicture}`} className="custom" />  <span> {user?.firstname + " " + user?.lastname} </span></div> <p>see you profile</p></div>
              <li><i className="fa-solid fa-question"></i> Help & support</li>
              <li> <i className="fa-solid fa-gear"></i> Settings & privacy</li>
              <li> <i className="fa-solid fa-moon"></i> Display & accessiblility </li>
              <li onClick={handleOut}> <i className="fa-solid fa-right-from-bracket"></i> Log Out</li>
              <span><a href=""> Privacy</a>  · <a href=""> Terms  </a> <a href=""> Advertising</a>  <a href=""> Ad Choices </a><a href=""> Cookies</a>   <a href=""> Meta © 2023</a> </span>
            </ul>
        </div>
    </div>
  )
}

export default Nav