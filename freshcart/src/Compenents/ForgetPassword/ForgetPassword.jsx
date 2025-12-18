import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import toast from "react-hot-toast";
import { Rings } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
 const [load,setLoad] =useState(false)
   const navigate= useNavigate();
    const user={
        email:""
    }

   async function forgetPassword(values){
    setLoad(true)
try {
      const{data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values);
      
  if(data.statusMsg==="success"){
    localStorage.setItem("resetEmail", values.email);
    toast.success(data.message,{
      duration:2000
    });
    setTimeout(()=>{
navigate("/verify");
    },500)
  }
} catch (error) {
  toast.error(
    error.response?.data?.message || 
    "Server error, try again later"
  );
}
setLoad(false);
}
  const myFormik=useFormik({
    initialValues:user,
    onSubmit:forgetPassword,
    validate:(values)=>{
    const errors={};
         if(values.email.length==0){
  errors.email="Email is required"
} 
else if(!(values.email.includes("@") && values.email.includes("."))){
  errors.email="Enter a valid email"
}
return errors
    }
  })
  return <>
<div className="container">
    <div className="row">
        <div className="col-md-6 mx-auto">
            <div style={{backgroundColor:"#fff"}} className="theDiv px-3 py-4 rounded-3 mt-5 shadow">
                  <h3 className="h2">Forget Password</h3>
<form onSubmit={myFormik.handleSubmit}>
    <label style={{  fontWeight: "500",
  fontSize: "15px",
  marginBottom: "6px",
  display: "block",
  color: "#444"}}  className='mt-3 fs-5 ms-1' htmlFor="email">Email:
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
    <input style={{
padding:" 12px 16px 12px 45px",
  borderRadius: "100vh",
  border: "1px solid #dcdcdc",
  outline: "none"
    }} type="email" id="email"placeholder="Enter your email" className="form-control"
    onChange={myFormik.handleChange}
    value={myFormik.values.email}
    name="email"
    onBlur={myFormik.handleBlur}
    />
</div>
    <small className='text-danger fw-bold'>{myFormik.errors && myFormik.touched.email? myFormik.errors.email :" "}</small>

    <button style={{backgroundColor:"#56c21b",fontSize:"15px",fontWeight:"500"}}
     type="submit"
      className="btn mt-3 w-25 d-block ms-auto text-white d-flex justify-content-center"> 
      {load?<Rings visible={true}
      height="25"
      width="25"
      color="#fff"
      ariaLabel="rings-loading"/> :  "Send Code"}
       </button>
</form>
            </div>
        </div>
    </div>
</div>

  
  
  </>
}
