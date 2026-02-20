import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/Auth/AuthSlice';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {

    const dispatch =  useDispatch();
    const [authToken,setAuthToken] = useState(localStorage.getItem("token"))
    const {token} = useSelector((state)=>state.auth);
    const [themeColor,setThemeColor] = useState('light')
    
    const navigate = useNavigate();

    const enableColorMode = ()=>{
        if(themeColor==='light'){
            document.body.style.backgroundColor='black'
            document.body.style.color='white'
            setThemeColor('dark')
        }
        else {
         document.body.style.backgroundColor='white'   
         document.body.style.color='black'
         setThemeColor('light')
        }
    }


    return (
        <div className='container d-flex'>
            <h1 className='p-3 flex-grow-1 text-center'>Task Schedular</h1>

            <div className='p-3 '>

            <button className={`btn btn-${themeColor}`}
            onClick={enableColorMode}
            >Enable {themeColor==='light'?'dark':'light'} Mode</button>

            {(authToken || token)&& <button className='btn btn-danger m-2'
            onClick={()=> dispatch(logout())}
            >Logout</button>}
            </div>

            
        </div>
            
    )
}
