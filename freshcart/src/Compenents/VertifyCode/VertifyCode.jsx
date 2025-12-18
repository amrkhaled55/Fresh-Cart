import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import toast from "react-hot-toast";
import { Rings } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function VertifyCode() {
       const navigate= useNavigate();
     const [load,setLoad] =useState(false)
    async function verifyCode(values){
setLoad(true)
try {
    const {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values);    
      if(data.status==="Success"){
    toast.success("reset code is correct",{
        duration:2000
    });
    setTimeout(()=>{
navigate("/resetpassword");
    },500)
  }
} catch (error) {
 toast.error(error.response.data.message) 
}
setLoad(false)
    }
    const user={
       "resetCode":"" 
    }
    const myFormik=useFormik({
initialValues:user,
onSubmit:verifyCode,
validate:(values)=>{
let errors={}
if(values.resetCode.length<=5 ){
errors.resetCode="Code should be at least 5 characters"
}
return errors;
}
    });
  return<>
  <div className="container">
    <div className="row">
        <div className="col-md-6 mx-auto">
            <div style={{backgroundColor:"#fff"}} className="theDiv px-3 py-4 rounded-3 mt-5 shadow">
                  <h3 className="h2">Verify Your Code</h3>
<form onSubmit={myFormik.handleSubmit}>
    <label style={{  fontWeight: "500",
  fontSize: "15px",
  marginBottom: "6px",
  display: "block",
  color: "#444"}}  className='mt-3 fs-5 ms-1' htmlFor="resetCode">Code:
  </label>
<div className="position-relative">
      <i style={{
      position: "absolute",
  left: "16px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#999",
  fontSize: "15px"
}} className="fa-regular fa-envelope"></i>
    <input  name="resetCode" style={{
padding:" 12px 16px 12px 45px",
  borderRadius: "100vh",
  border: "1px solid #dcdcdc",
  outline: "none"}} 
  type="text" id="resetCode"placeholder="Enter Verification Code"
    onChange={myFormik.handleChange}
    onBlur={myFormik.handleBlur}
    value={myFormik.values.resetCode}
     className="form-control"/>
</div>
<small className='text-danger fw-bold'>{myFormik.errors && myFormik.touched.resetCode? myFormik.errors.resetCode :" "}</small> 
    <button  style={{backgroundColor:"#56c21b",fontSize:"14px",fontWeight:"600"}}
     type="submit"
      className="btn mt-3 w-25 d-block ms-auto text-white d-flex justify-content-center">
    {load?<Rings visible={true}
      height="25"
      width="25"
      color="#fff"
      ariaLabel="rings-loading"/> :  "Verify Code"} </button>
</form>
            </div>
        </div>
    </div>
</div>
  
  </>
}
