import { useFormik } from 'formik';
import LoginCss from '../../assets/images/signin-g.svg'
import loginCss from "./login.module.css"
import {  useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import {  Rings } from 'react-loader-spinner';
import { theContext } from '../AthunicatContext/AthunticatContext';
export default function Login() {
const[loader,setLoader]= useState(false);
const navigate=useNavigate();
const {token,setToken}= useContext(theContext);

  const user={
    email:"",
    password:"",
  }
 async function loginApi(valus){
      setLoader(true)
try{
    const {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",valus);
if(data.message==="success"){
  setToken(data.token);
  localStorage.setItem("tkn",data.token);
    toast.success(data.message)
  setLoader(false) 
setTimeout(()=>{
    navigate("/home")
},500)
}
}
catch(erro){
  console.log(erro);
  
  toast.error(erro.response.data.message)
setLoader(false)
}
  }
const myFormik= useFormik({
  initialValues:user,
  onSubmit:loginApi,
  validate:function(values){
const errors={};
 if(values.email.length==0){
  errors.email="Email is required"
} 
else if(!(values.email.includes("@") && values.email.includes("."))){
  errors.email="Enter a valid email"
}
 if(values.password.length==0){
  errors.password="password is required"
 }
 else if(values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{6,}$/)===null)
{errors.password=`Password should contain At least one lowercase letter ,At least one uppercase letter,At least one number ,At least one special character
Minimum 6 characters of the allowed `
}
return errors
  }
})

  return (
    <>
      <div className={loginCss.formWrapper + " shadow-lg bg-white mx-auto mt-5"}>
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-sm-6">
              <img src={LoginCss} alt="register" className="w-100" />
            </div>
            <div className="col-sm-6">
              <h2>Login Now</h2>
            <form onSubmit={myFormik.handleSubmit}>
                <div className={loginCss.formInputs}>
                {/* Email */}
                <label className='mt-3' htmlFor="email">Email</label>
                <div className="position-relative">
                  <i className={"fa-regular fa-envelope " + loginCss.icon}></i>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className={loginCss.input}
                    value={myFormik.values.email}
                    onChange={myFormik.handleChange}
                    onBlur={myFormik.handleBlur}
                  />
                </div>
<small className='text-danger fw-bold'>{myFormik.errors && myFormik.touched.email? myFormik.errors.email :" "}</small>
                {/* Password */}
                <label className='mt-3' htmlFor="password">Password</label>
                <div className="position-relative">
                  <i className={"fa-solid fa-lock " + loginCss.icon}></i>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className={loginCss.input}
                    value={myFormik.values.password}
                    onChange={myFormik.handleChange}
                    onBlur={myFormik.handleBlur}
                  />
                </div>
<small className='text-danger fw-bold'>{myFormik.errors && myFormik.touched.password? myFormik.errors.password :" "}</small>
              </div>
<div className='d-flex align-items-center'>
  <Link to="/forgetpassword" style={{color:"#56c21b",fontSize:"16px"}} >Forget Password ?</Link>
<button 
  disabled={!(myFormik.isValid && myFormik.dirty)} 
  type="submit"
  className={`my-3 px-5 d-block rounded-4 ms-auto ${!(myFormik.isValid && myFormik.dirty) ? loginCss.btnDisplayed : loginCss.myBtn }`}>
  {loader ? 
    <Rings visible={true}
      height="25"
      width="25"
      color="#fff"
      ariaLabel="rings-loading"/> :  "Login"
 }
</button>
</div>

            </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

