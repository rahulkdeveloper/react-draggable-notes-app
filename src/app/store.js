import { configureStore } from "@reduxjs/toolkit";
import NotesReducer from '../features/todo/NotesSlice';
import AuthReducer from '../features/Auth/AuthSlice';
import AlertReducer from '../features/Alert/AlertSlice';

export const store = configureStore({
    reducer:{
        notes:NotesReducer,
        auth:AuthReducer,
        alert:AlertReducer
    }
})