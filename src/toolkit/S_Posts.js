import { createAsyncThunk , createSlice} from "@reduxjs/toolkit"
import { baseUrl } from "../config/baseURL"
const config = {headers: {"Content-Type": "multipart/form-data" }}


export const Getpost = createAsyncThunk("get/post" , async()=>{
  const data = await baseUrl.get("/api/v1/post" )
  return data.data
})

export const GetFollowingpost = createAsyncThunk("get/FollowingPost" , async(id)=>{
  const data = await baseUrl.get(`/api/v1/post/${id}/GetPostBasedOnUserFollowing` )
  return data.data
})

export const Postpost = createAsyncThunk("post/post" , async(data)=>{
  return baseUrl.post("/api/v1/post", data , config ).then(res => res.data ).catch(err => err.response.data)
})

export const deletepost = createAsyncThunk("delete/post" , async(id)=>{
  return baseUrl.delete(`/api/v1/post/${id}`  ).then(res => res.data ).catch(err => err.response.data)
})


export const Editepost = createAsyncThunk("Edite/post" , async({id ,data})=>{
  return baseUrl.put(`/api/v1/post/${id}` ,data , config ).then(res => res.data ).catch(err => err.response.data)
})


export const LikePost = createAsyncThunk("post/Like" , async({IdPost ,IdUser})=>{
  return baseUrl.put(`/api/v1/post/${IdPost}/like` ,IdUser  ).then(res => res.data ).catch(err => err.response.data)
})


export const getMyPosts = createAsyncThunk("get/post" , async(IdUser)=>{
  return baseUrl.get(`/api/v1/post?search=${IdUser}`   ).then(res =>res.data ).catch(err => err.response.data)
})


const S_Posts = createSlice({
    name:"posts",
    initialState:{isloading : false , post:[]},
    reducers:{

      SetLike:(state , action)=>{
        state.post.map(e=> {
          if(e._id == action.payload._id){
            e.likes = action.payload.likes
          }})
      },

      SetComment:(state , action)=>{
        state.post.map(e=> {
          if(e._id === action.payload._id){
            e.comments = action.payload.comments
          }})
      }


    },
    extraReducers:{
      [Getpost.pending]:(state)=> {state.isloading = true},
      [Getpost.fulfilled]:(state , action)=> {
        state.isloading = false
        state.post = action.payload.data},

      [Postpost.pending]:(state)=> {state.isloading = true},
      [Postpost.fulfilled]:(state , action)=> {
        state.isloading = false
        state.post.unshift(action.payload)},
    

      [getMyPosts.pending]:(state)=> {state.isloading = true},
      [getMyPosts.fulfilled]:(state , action)=> {
        state.isloading = false
        state.myPosts = action.payload},
    

      [GetFollowingpost.pending]:(state)=> {state.isloading = true},
      [GetFollowingpost.fulfilled]:(state , action)=> {
        state.isloading = false
        state.post = action.payload.data },

      [deletepost.pending]:(state)=> {state.isloading = true},
      [deletepost.fulfilled]:(state , action)=> {
        state.isloading = false
        const filter = state.post.filter(e=> e._id != action.payload._id)
        state.post = filter  
      },

      [Editepost.pending]:(state)=> {state.isloading = true},
      [Editepost.fulfilled]:(state , action)=> {
        state.isloading = false
        state.post.map(e=>{
           if(e._id === action.payload._id){
            e.desc = action.payload.desc
            e.image = action.payload.image
            e.user = action.payload.user
           }}) 
        },

        [LikePost.pending]:(state)=> {state.isloading = true},
        [LikePost.fulfilled]:(state , action)=> {
          state.isloading = false
          state.post.map(e=>{
            if(e._id === action.payload._id){
             e.likes = action.payload.likes
            }}) 
        },
  
    }
})



export const {  setPost , setPosts , SetLike , SetComment} = S_Posts.actions
export default  S_Posts.reducer