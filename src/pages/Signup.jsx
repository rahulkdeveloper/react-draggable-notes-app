import React, { useEffect, useState } from 'react'
import AuthForm from '../components/AuthForm'
import { useDispatch, useSelector } from 'react-redux'
import { singnup } from '../features/Auth/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const dispatch = useDispatch();
    const {signupStatus,signupError} = useSelector((state)=> state.auth);
    const navigate = useNavigate()

    useEffect(()=>{
        if(signupStatus==='success'){
            navigate('/')
        }
        else if(signupStatus==='failed'){
            alert(signupError)
        }

    },[signupStatus,signupError])

    const onSubmit = (payload)=>{
        dispatch(singnup(payload))
        
    }
    
    return (
        <div className='auth-form mt-5'>
            <AuthForm type='signup' fields={["email","name","password"]} onSubmit={onSubmit}/>
        </div>
    )
}

export default Signup