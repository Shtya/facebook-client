
import React,{useState , useRef , useEffect } from 'react'

const H_Stories = () => {
    const imgs = Array.from(Array(7).keys())
    const [width , setwidth] = useState(0)
    const carouselRef = useRef()
    useEffect(_=> setwidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth) ,[])
    
    return [imgs , width , setwidth , carouselRef]
}

export default H_Stories