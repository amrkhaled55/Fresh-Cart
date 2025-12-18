import { useFormik } from 'formik';
import resetStyle from './resetpassword.module.css' 
import { Link, useNavigate } from 'react-router-dom';
import resetImg from '../../assets/images/signin-g.svg'
import { useContext, useState } from 'react';
import { Rings } from 'react-loader-spinner';
import { theContext } from '../AthunicatContext/AthunticatContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
export default function ResetPassword() {
  const { setToken } = useContext(theContext);

    const[loader,setLoader]= useState(false);
    const navigate=useNavigate();
      const user={
    "email":localStorage.getItem("resetEmail"),
    "newPassword":"",
  }
 async function resetPassword (valus){
      setLoader(true)
try{
    const {data}=await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",valus);
    toast.success("Password reset successfully");
    setToken(data.token);

localStorage.setItem("tkn",data.token)
navigate("/home");
    
}
catch(erro){
  console.log(erro);
setLoader(false)
}
  }
    const myFormik= useFormik({
      initialValues:user,
      onSubmit:resetPassword,
      validate:function(values){        
    const errors={};
     if(values.email.length==0){
      errors.email="Email is required"
    } 
    else if(!(values.email.includes("@") && values.email.includes("."))){
      errors.email="Enter a valid email"
    }
     if(values.newPassword.length==0){
      errors.newPassword="password is required"
     }
     else if(values.newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{6,}$/)===null)
    {errors.newPassword=`Password should contain At least one lowercase letter ,At least one uppercase letter,At least one number ,At least one special character
    Minimum 6 characters of the allowed `
    }
    
    return errors
      }
    })
  return     <>
   <Helmet>
    <title>Reset Password</title>
  </Helmet>
      <div className={resetStyle.formWrapper + " shadow-lg bg-white mx-auto mt-5"}>
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-sm-6">
              <img src={resetImg} alt="register" className="w-100" />
            </div>
            <div className="col-sm-6">
              <h2>Reset Password</h2>
            <form onSubmit={myFormik.handleSubmit} >
                <div className={resetStyle.formInputs}>
                {/* Email */}
                <label className='mt-3' htmlFor="email">Email</label>
                <div className="position-relative">
                  <i className={"fa-regular fa-envelope " + resetStyle.icon}></i>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className={resetStyle.input}
                    value={myFormik.values.email}
                    onChange={myFormik.handleChange}
                    onBlur={myFormik.handleBlur}
                    name='email'
                    readOnly
                  />
                </div>
<small className='text-danger fw-bold'>{myFormik.errors && myFormik.touched.email? myFormik.errors.email :" "}</small>
                {/* Password */}
                <label className='mt-3' htmlFor="newPassword">New Password</label>
                <div className="position-relative">
                  <i className={"fa-solid fa-lock " + resetStyle.icon}></i>
                  <input
                    type="Password"
                    id="newPassword"
                    placeholder="Enter your newPassword"
                    className={resetStyle.input}
                    value={myFormik.values.newPassword}
                    onChange={myFormik.handleChange}
                    onBlur={myFormik.handleBlur}
                    name='newPassword'
                  />
                </div>
<small className='text-danger fw-bold'>{myFormik.errors && myFormik.touched.newPassword? myFormik.errors.newPassword :" "}</small>
              </div>
<div className='d-flex align-items-center'>
<button 
  disabled={!(myFormik.isValid && myFormik.dirty)} 
  type="submit"
  className={`my-3 px-5 d-block rounded-4 ms-auto ${!(myFormik.isValid && myFormik.dirty) ? resetStyle.btnDisplayed : resetStyle.myBtn }`}>
  {loader? 
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
}
