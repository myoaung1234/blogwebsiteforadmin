import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    let location = useLocation();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    if(!user) {
        return <Navigate to="/auth/login" state={{ from: location}} replace />
    }
    return children
};

export default ProtectedRoute;