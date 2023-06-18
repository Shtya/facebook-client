import React, { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import {io} from "socket.io-client"
import LeftSideCopy from '../components/Chat/LeftSide copy'
import MiddleSideCopy from '../components/Chat/MiddleSide copy'
import { GetUser } from '../hooks/user/H_Getuser'
import { baseUrl } from '../config/baseURL'
const ChatPageCopy = () => {
  const [anyChange , setanyChange] = useState(true)

  // 1) Get User
  const [user ] = GetUser()
  const [Mydata , setMydata] = useState()
  useEffect(_=> { user?._id&& baseUrl.get(`/api/v1/user/${user?._id}`).then(res => setMydata(res.data)) },[user?._id , anyChange])
  
  
  // 2) get all members in Chats 
  let [Conversation , setConversation] = useState()
  useEffect(_=> { user?._id&& baseUrl.get(`/api/v1/conversation/${user?._id}`).then(res =>setConversation(res.data))},[user?._id , anyChange])
  

  // 3) get allusers members 
  let [showChat , setshowChat] = useState(false)
  let [members  , setmembers]  = useState()
  useEffect(_=> { user?._id&& baseUrl.get(`/api/v1/conversation/user/${user?._id}`).then(res =>setmembers(res.data.usersMembers))},[user?._id , anyChange])
  
  
  // 4 ) Get Chat based user 
  const [messages , setmessages] = useState([])
  const [text , settext] = useState("")
  const [conversationId , setconversationId] = useState()
  const [dataSender , setdataSender ] = useState()

  const handelChat = (e)=>{
    setdataSender(e)
    let conversationId = Conversation?.filter(ele => ele.members.includes(e?._id))
    setconversationId(conversationId)
    setshowChat(true)
    baseUrl.get(`/api/v1/conversation/message/${conversationId[0]?._id}`).then(res => setmessages(res.data))
  }


  const ScrollRef = useRef()

  const handleMessage = async()=>{
    if(text === "") return
    let data = await baseUrl.post(`/api/v1/conversation/message` ,{conversationId:conversationId[0]?._id , sender:user?._id , text })
    setmessages(prev => [...prev , data.data])
    settext("")
    socket.current.emit("SendMessage" , {senderId :dataSender?._id , userId : user?._id , text })
   
  }

  useEffect(_=> { ScrollRef.current?.scrollIntoView({behavior:"smooth"})} ,[text])

  // Socket 
  const socket = useRef(io("ws://localhost:8000"))
  const [ArrMessage , setArrMessage] = useState()

  useEffect(_=> {
    socket.current = io("ws://localhost:8000")
  },[messages])

  useEffect(_=> {    socket.current.on("getMessage" , data =>{
    setArrMessage({senderId:data.senderId  , text:data.text , createdAt:Date.now()  })
  })},[messages])

  // Update Messages 
  useEffect(_=>{
    ArrMessage && conversationId[0]?._id === ArrMessage?.conversationId[0].includes(ArrMessage.senderId) && setmessages(prev => [...prev , ArrMessage])
  } ,[ArrMessage])


  useEffect(_=>{
    if(user?._id ){
      socket.current.emit("addUsers" , user?._id)
    // socket.current.on("getUsers" , e => console.log(e))
  }
  } ,[user?._id , socket])




  return (
    <div>
        <Nav/>
        <div className="chat ">

        <LeftSideCopy members={members} handelChat={handelChat} anyChange={anyChange}  setanyChange={setanyChange} />

      {
        showChat === false 
        ? <h2 className='MiddleSide start'> Open a conversation to start a chat</h2> 
        :<MiddleSideCopy ScrollRef={ScrollRef} handleMessage={handleMessage} text={text} settext={settext} dataSender={dataSender} messages={messages} /> 
      }
        

        
        </div>
    </div>
  )
}

export default ChatPageCopy







    // const [Conversation , setConversation] = useState(false)
    // const [user] = GetUser()

    // const dispatch = useDispatch()
    // const ownUser = useSelector(e=> e.S_Auth.user)

    // useEffect(_=> { if(user?._id) dispatch(GetIdUser(user?._id))} ,[user])
    // useEffect(_=>{
    //     const getConver = async()=>{

    //         try{
    //             const res = await baseUrl.get(`/api/v1/conversation/${user?._id}`)
    //             setConversation(res.data)
    //         }catch(err){console.log(err)}
    //     }
    //     getConver()
    // } ,[user?._id])


    // const [ConversationId , setConversationId] = useState()
    // const [chat , setchat] = useState()
    // const handleChats = async(e)=>{

    //     try{
    //         const getChats = await baseUrl.get(`/api/v1/conversation/${e?._id}`)
    //         await setConversationId(getChats.data)
    //     }catch(err){console.log(err)} 

    //     const data = await baseUrl.get(`/api/v1/conversation/message/${ConversationId?._id}`)
    //         setchat(data.data)
    // }

    // // useEffect(_=>{
    // //     if(ConversationId?._id){
    // //     const get = async()=>{
            
    // //     }
    // //     get()}
    // // } ,[handleChats])
    // console.log(chat);