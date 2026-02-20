import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
    show:false,
    message:'',
    type:'success',
    duration:3000
}

const alertSlice = createSlice({
    name:"alert",
    initialState,
    reducers:{
        showAlert:(state,action)=>{
            const {show,message,type} = action.payload
            state.show = action.payload.show;
            state.message = message;
            state.type = type;
        },
        hideAlert:(state,action)=>{
            state.show=false;
            state.message='';
        }
    }
})
export const {showAlert,hideAlert} = alertSlice.actions;

export default alertSlice.reducer