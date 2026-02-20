import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children})=>{
    const location = useLocation()
    const token = useSelector((state)=>state.auth.token)
    return token ? children : (<Navigate to={"/login"} replace state={{from:location.pathname}}/>);
}

export default PrivateRoute;