import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({children}){
const location=useLocation();

const token=
localStorage.getItem("token");

if(!token){

return <Navigate to="/login" state={{ message:"Please login first to continue.", from:location.pathname }} replace/>

}

return children;

}

export default ProtectedRoute;