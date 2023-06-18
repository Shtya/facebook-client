import React from 'react'
import H_Addpost from '../../hooks/post/H_Addpost'
import H_Stories from '../../hooks/post/H_Stories'
import {motion} from "framer-motion"

const Stories = () => {
    const  [imgs , width , setwidth , carouselRef] = H_Stories()

  return (
    <div className="stories">

    <div className="arrow">
        <span></span>
        <span></span>
    </div>
    <motion.div ref={carouselRef} className='main'>
      <motion.div drag="x" dragConstraints={{right:0 ,left:-width}} className='branch'>
    <div className="box1">
      <img src="./image/post4.jpg" alt="" />
        <i className="fa-solid fa-plus"></i>
        <p>Create story</p>
    </div>
    {
      imgs.map((e,index)=>(
      <motion.div className="box2" key={index} whileTap={{ cursor :"grabbing"}} >
        <img className='owner' src="./images/facebook1.png" alt="" />
        <img className='imgpost' src="./image/post4.jpg" alt="" />
        <p> MOhammed Reda</p>
      </motion.div>

      ))
    }
    </motion.div>
    </motion.div>
    
   
   
  </div>
  )
}

export default Stories