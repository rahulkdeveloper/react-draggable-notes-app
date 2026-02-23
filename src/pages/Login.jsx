import React, { useEffect, useState } from 'react'
import AuthForm from '../components/AuthForm'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, resetStatusAndError } from '../features/Auth/AuthSlice';

const Login = () => {

    const dispatch = useDispatch();
    const {loginStatus,loginError,signupStatus} = useSelector((state)=> state.auth);
    const navigate = useNavigate()

    useEffect(()=>{
        if(loginStatus==='success'){
            navigate('/')
        }
        else if(loginStatus==='failed'){
            alert(loginError)
        }

    },[loginStatus,loginError])

    useEffect(()=>{
        return ()=>{
            dispatch(resetStatusAndError())
        }
    },[loginStatus,signupStatus,dispatch])

    const onSubmit = (payload)=>{
        dispatch(login(payload))
        
    }
    
    return (
        <div className='mt-5 auth-form'>
            <AuthForm type='login' fields={["email","password"]} onSubmit={onSubmit}/>
        </div>
    )
}

export default Login