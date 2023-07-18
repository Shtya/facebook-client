import { createAsyncThunk , createSlice} from "@reduxjs/toolkit"
import {baseUrl} from "../config/baseURL"

const config = {headers: {"Content-Type": "multipart/form-data" }}

export const PostLogin  = createAsyncThunk("Login",async(data)=>{
  return baseUrl.post( "/api/v1/auth/login", data  ).then(res=> res.data).catch(err=> err.response.data)
})

export const Register  = createAsyncThunk("register",async(data)=>{
  return baseUrl.post( "/api/v1/auth/register", data , config ).then(res=> res.data).catch(err=> err.response.data)
})

export const GetIdUser  = createAsyncThunk("get/user",async(id)=>{
  return baseUrl.get(`/api/v1/user/${id}` ).then(res=> res.data).catch(err=> err.response.data)
})

export const FollowId  = createAsyncThunk("get/user",async(id)=>{
  return baseUrl.get(`/api/v1/user/${id}` ).then(res=> res.data).catch(err=> err.response.data)
})

export const GetAllUser  = createAsyncThunk("get/user",async()=>{
  return baseUrl.get(`/api/v1/user` ).then(res=> res.data).catch(err=> err.response.data)
})

export const GetFollow  = createAsyncThunk("get/follow",async({Iduser , IdFollow})=>{
  return baseUrl.put(`/api/v1/user/${Iduser}/follow` , {WannaFollowThisId : IdFollow} ).then(res=> res.data).catch(err=> err.response.data)
})

const S_Auth = createSlice({
    name:"user",
    initialState:{isloading : false, post:[], user:null, token:null , error:[]},
    reducers: {
        setLogin: (state, action) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
        },
        setLogout: (state) => {
          state.user = null;
          state.token = null;
        },
        setFriends: (state, action) => {
          if (state.user) {
            state.user.friends = action.payload.friends;
          } else {
            console.error("user friends non-existent :(");
          }
        },
        setPosts: (state, action) => {
          state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
          const updatedPosts = state.posts.map((post) => {
            if (post._id === action.payload.post._id) return action.payload.post;
            return post;
          });
          state.posts = updatedPosts;
        },
        SetFollow : (state , action)=>{
          console.log(action);
          // state.user = action.payload
        }
      },

    extraReducers:{
      [PostLogin.pending]:(state)=> {state.isloading = true},
      [PostLogin.fulfilled]:(state , action)=> {
        state.isloading = false
        state.user = action.payload},

      [Register.pending]:(state)=> {state.isloading = true},
      [Register.fulfilled]:(state , action)=> {
        state.isloading = false
        state.user = action.payload},


      [GetIdUser.pending]:(state)=> {state.isloading = true},
      [GetIdUser.fulfilled]:(state , action)=> {
        state.isloading = false
        state.user = action.payload},


      [FollowId.pending]:(state)=> {state.isloading = true},
      [FollowId.fulfilled]:(state , action)=> {
        state.isloadingFollow = false
        state.userFollow = action.payload},


      [GetAllUser.pending]:(state)=> {state.isloading = true},
      [GetAllUser.fulfilled]:(state , action)=> {
        state.isloading = false
        state.user = action.payload},


    }
})

export const { setFriends , setLogin , setLogout , setPost , setPosts , SetFollow} = S_Auth.actions
export default  S_Auth.reducer