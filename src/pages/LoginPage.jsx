import React, { useState } from 'react'
import Signup from '../components/Signup.jsx'
import Login from '../components/Login.jsx'

const LoginPage = () => {
  const [showSignUp , setshowSignUp] = useState(false)

  return (
    <div className='LoginPage '>

      <div className={`box1 ${showSignUp ? "over" : ""}`}>
        <img src="./images/facebook.svg" alt="" />
        <h2>Facebook helps you connect and share with the people in your life.</h2>
      </div>

      <Signup showSignUp={showSignUp} setshowSignUp={setshowSignUp}/>
      {
        showSignUp &&<div className="Top">
        <Login  showSignUp={showSignUp} setshowSignUp={setshowSignUp} />
      </div>
      }
    </div>
  )
}

export default LoginPage