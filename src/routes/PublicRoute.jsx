import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const location = useLocation();
    const reduxToken = useSelector((state) => state.auth.token);
    const token = reduxToken || localStorage.getItem("token");
    if(token){
        
        return <Navigate to={location.state?.from || "/"} replace/>
    }

    return children
}

export default PublicRoute;