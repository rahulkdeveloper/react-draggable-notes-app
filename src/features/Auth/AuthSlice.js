import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
    token: localStorage.getItem('token'),
    user:localStorage.getItem('user'),
    signupError:null,
    signupStatus:'idle',
    loginError:null,
    loginStatus:'idle'
}

export const singnup = createAsyncThunk('auth/signup',async(data,thunkAPI)=>{
    
    try {
        const res = await axiosInstance.post("auth/signup",data);
        return res.data
        
        
    } catch (error) {
        throw new Error("Signup API failed!")
        
    }
})

export const login = createAsyncThunk('auth/login',async(data,thunkAPI)=>{    
    try {
        const res = await axiosInstance.post("auth/login",data);
        return res.data
        
        
    } catch (error) {
        console.log("Error in login api===",error);
        throw new Error("Login API failed!")
        
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state,action)=>{
            state.user=null;
            state.token=null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');            
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(singnup.pending,(state,action)=>{
            state.signupStatus='pending'
        })
        .addCase(singnup.fulfilled,(state,action)=>{            
            const {token,user} = action.payload
            localStorage.setItem('token',token);
            localStorage.setItem('user',user);
            state.user=user;
            state.token=token;
            state.signupStatus='success';
        })
        .addCase(singnup.rejected,(state,action)=>{
            state.signupStatus='failed'
            state.signupError=action.error.message
        })
        .addCase(login.pending,(state,action)=>{
            state.loginStatus='pending'
        })
        .addCase(login.fulfilled,(state,action)=>{
            const {token,user} = action.payload
            localStorage.setItem('token',token);
            localStorage.setItem('user',user);
            state.user=user;
            state.token=token;
            state.loginStatus='success';
        })
        .addCase(login.rejected,(state,action)=>{
            state.loginStatus='failed'
            state.loginError=action.error.message
        })
    }

})

export const {logout} = authSlice.actions;

export default authSlice.reducer