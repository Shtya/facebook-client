import React, { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import LeftSide from '../components/Chat/LeftSide'
import MiddleSide from '../components/Chat/MiddleSide'
import { GetUser } from '../hooks/user/H_Getuser'
import {  baseUrl } from '../config/baseURL'
import {io} from "socket.io-client"
const ChatPage = () => {
  // 1) get own user
  const [ownUser , setOwnUser] = useState()
  const [user] = GetUser()
  useEffect(_=>{ user?._id && baseUrl.get(`http://127.0.0.1:4000/api/v1/user/${user?._id}`).then(res => setOwnUser(res.data) ) } ,[user])



  // 2) Get Conversation For E-mail 
  const [conversation , setconversation]= useState()
  useEffect(_=>{ user?._id &&baseUrl.get(`/api/v1/conversation/${user?._id}`).then(res => setconversation(res.data))} ,[user])
  
  
  
    // 3) chat for everyone
    const [startCh , setStartCh] = useState(false) // For show MiddleSide
    const [message , setmessage]= useState()
    const [sender , setsender] = useState()
    const handleChats = (e)=>{
        setsender(e)
        const members = conversation.filter(ele=> ele.members.find(el => el === e?._id ))
        baseUrl.get(`/api/v1/conversation/message/${members[0]?._id}`).then(res => setmessage(res.data))
        setStartCh(true)
    }


    

      // 4) Socket 
      const [arriavMessage , setarriavMessage] = useState(null)
      const socket = useRef(io("ws://localhost:8000"))
      const [addmessage , setaddmessage] = useState("")

      //==> Get and active socket
      useEffect(_=> {
         socket.current = io("ws://localhost:8000")
         socket.current.on("getMessage" , e => {
          setarriavMessage({
            sender :e.senderId,
            text : e.text ,
            createdAt :Date.now()

          })
         })
        } ,[])

      //==> get users on server active 
      useEffect(_=>{
          socket.current.emit("addUser" , user?._id) 
          socket.current.on("getUsers" , user=> console.log(user))
     },[user])


     const callSocket = ()=>{
       socket.current.emit("sendMessage" , {senderId : user?._id  , receiverId : sender?._id , text :addmessage})
     }





  return (
    <div>
        <Nav/>
        <div className="chat ">

        <LeftSide setStartCh={setStartCh} conversation={conversation} ownUser={ownUser} handleChats={handleChats}  />

      {
        startCh === false 
        ? <h2 className='MiddleSide start'> Open a conversation to start a chat</h2> 
        :<MiddleSide callSocket={callSocket} conversation={conversation} message={message} sender={sender} addmessage={addmessage} setaddmessage={setaddmessage} arriavMessage={arriavMessage} setarriavMessage={setarriavMessage} setmessage={setmessage} /> 
      }
        

        
        </div>
    </div>
  )
}

export default ChatPage







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