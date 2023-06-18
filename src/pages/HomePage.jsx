import React, { useState } from 'react'
import Nav from '../components/Nav'
import LeftHome from '../components/home/LeftHome'
import Home from '../components/home/Home'
import RightHome from '../components/home/RightHome'

const HomePage = () => {
  const [anyChange , setanyChange] = useState(true)
  return (
    <div className='Page_Home'>
      <Nav />
      <div className="home container">
        <LeftHome anyChange={anyChange} setanyChange={setanyChange} />
        <Home anyChange={anyChange} setanyChange={setanyChange} />
        <RightHome anyChange={anyChange} setanyChange={setanyChange} />
      </div>
    </div>
  )
}

export default HomePage