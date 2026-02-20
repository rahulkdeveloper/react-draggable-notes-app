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
        <div className='container d-flex justify-content-center align-items-center'>
            <h1 className='p-3'>Task Schedular</h1>

            <button className={`btn btn-${themeColor}`}
            onClick={enableColorMode}
            >Enable {themeColor==='light'?'dark':'light'} Mode</button>

            {(authToken || token)&& <button className='btn btn-danger m-2'
            onClick={()=> dispatch(logout())}
            >Logout</button>}

            {/* {!authToken && <button className='btn btn-danger'
            onClick={()=> dispatch(logout())}
            >Login</button>} */}
            
        </div>
            // {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
            //     <div class="container-fluid">
            //         <a class="navbar-brand" href="#">Task Schedular</a>
            //         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            //             <span class="navbar-toggler-icon"></span>
            //         </button>
            //         <div class="collapse navbar-collapse" id="navbarSupportedContent">
            //             <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            //                 <li class="nav-item">
            //                     <a class="nav-link active" aria-current="page" href="#">Home</a>
            //                 </li>
            //                 <li class="nav-item">
            //                     <a class="nav-link" href="#">Link</a>
            //                 </li>
            //                 <li class="nav-item dropdown">
            //                     <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            //                         Dropdown
            //                     </a>
            //                     <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            //                         <li><a class="dropdown-item" href="#">Action</a></li>
            //                         <li><a class="dropdown-item" href="#">Another action</a></li>
            //                         <li><hr class="dropdown-divider"/></li>
            //                         <li><a class="dropdown-item" href="#">Something else here</a></li>
            //                     </ul>
            //                 </li>
            //                 <li class="nav-item">
            //                     <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            //                 </li>
            //             </ul>
            //             <form class="d-flex">
            //                 <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            //                     <button class="btn btn-outline-success" type="submit">Search</button>
            //             </form>
            //         </div>
            //     </div>
            // </nav> */}
            
    )
}
