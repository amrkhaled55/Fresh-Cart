import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { theContext } from "../AthunicatContext/AthunticatContext";
import { TailSpin } from "react-loader-spinner";

export default function ProtectedRoute({children}) {
    const {token,loading,setLoading} =useContext(theContext);
    if(loading){
    return <div className="d-flex justify-content-center align-items-center vh-100 bg-black bg-opacity-50">
    <TailSpin
visible={true}
height="60"
width="60"
color="#4fa94d"
ariaLabel="tail-spin-loading"
radius="1"
wrapperStyle={{}}
wrapperClass=""
/>
    
    </div>
 }
    if(!token){
setLoading(false)
return <Navigate to='/login'/>
    }
  return (
  <>
  {children}
  </>
  )
}
