import { useFormik } from 'formik';
import RegisterImg from '../../assets/images/signup-g.svg'
import registerCss from "./register.module.css"
import {  useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {  Rings } from 'react-loader-spinner';
export default function Register() {
const[loader,setLoader]= useState(false);
const navigate=useNavigate()
  const user={
    name:"",
    email:"",
    phone:"",
    password:"",
    rePassword:""
  }
 async function registerApi(valus){
      setLoader(true)
try{
    const {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",valus);
if(data.message==="success"){
    toast.success(data.message)
  setLoader(false) 
setTimeout(()=>{
    navigate("/login")
},500)
}
}
catch(erro){
  toast.error(erro.response.data.message)
setLoader(false)
}
  }
const myFormik= useFormik({
  initialValues:user,
  onSubmit:registerApi,
  validate:function(values){
const errors={};
 if(values.name.length==0){
  errors.name="Name is Required"
} 
else if(values.name.length<3|| values.name.length>10){
errors.name="Name should be at between 3 to 10 letters"
}
 if(values.email.length==0){
  errors.email="Email is required"
} 
else if(!(values.email.includes("@") && values.email.includes("."))){
  errors.email="Enter a valid email"
}
 if(values.phone.length==0){
  errors.phone="Phone is required"
 }
else if(values.phone.match(/^01(0|1|2|5)[0-9]{8}$/)===null){
errors.phone="Accept only Egyption Numbers"
}
 if(values.password.length==0){
  errors.password="password is required"
 }
 else if(values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{6,}$/)===null)
{errors.password=`Password should contain At least one lowercase letter ,At least one uppercase letter,At least one number ,At least one special character
Minimum 6 characters of the allowed `
}
 if(values.rePassword.length==0){
  errors.repassword="password is required"
 }
 else if(values.password!==values.rePassword){
  errors.rePassword="Password confirmation is incorrect"
 }
return errors
  }

})
  return (
    <>
      <div className={registerCss.formWrapper + " shadow-lg bg-white mx-auto mt-3"}>
        <div className="container">
          <div className="row gy-4 align-items-center">

            <div className="col-sm-6">
              <img src={RegisterImg} alt="register" className="w-100" />
            </div>

            <div className="col-sm-6">
              <h2>Create Your Account</h2>
            <form onSubmit={myFormik.handleSubmit}>
                <div className={registerCss.formInputs}>

                {/* Name */}
                <label htmlFor="name">Name</label>
                <div className="position-relative">
                  <i className={"fa-regular fa-user " + registerCss.icon}></i>
                  <input
                    type="text"
                    name='name'
                    id="name"
                    placeholder="Enter your name"
                    className={registerCss.input}
                    value={myFormik.values.name}
                    onChange={myFormik.handleChange}
                    onBlur={myFormik.handleBlur}
                  />
                </div>
<small className='text-danger fw-bold'>{myFormik.errors && myFormik.touched.name? myFormik.errors.name :" "}</small>
                {/* Email */}
                <label className='mt-3' htmlFor="email">Email</label>
                <div className="position-relative">
                  <i className={"fa-regular fa-envelope " + registerCss.icon}></i>
                  <input
                  name='email'
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className={registerCss.input}
                    value={myFormik.values.email}
                    onChange={myFormik.handleChange}
                    onBlur={myFormik.handleBlur}
                  />
                </div>
<small className='text-danger fw-bold'>{myFormik.errors && myFormik.touched.email? myFormik.errors.email :" "}</small>

                {/* Phone */}
                <label className='mt-3' htmlFor="phone">Phone</label>
                <div className="position-relative">
                  <i className={"fa-solid fa-phone " + registerCss.icon}></i>
                  <input
                  name='phone'
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone"
                    className={registerCss.input}
                    value={myFormik.values.phone}
                    onChange={myFormik.handleChange}
                    onBlur={myFormik.handleBlur}
                  />
                </div>
<small className='text-danger fw-bold'>{myFormik.errors && myFormik.touched.phone? myFormik.errors.phone :" "}</small>

                {/* Password */}
                <label className='mt-3' htmlFor="password">Password</label>
                <div className="position-relative">
                  <i className={"fa-solid fa-lock " + registerCss.icon}></i>
                  <input
                  name='password'
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className={registerCss.input}
                    value={myFormik.values.password}
                    onChange={myFormik.handleChange}
                    onBlur={myFormik.handleBlur}
                  />
                </div>
<small className='text-danger fw-bold'>{myFormik.errors && myFormik.touched.password? myFormik.errors.password :" "}</small>

                {/* Confirm Password */}
                <label className='mt-3' htmlFor="rePassword">Confirm Password</label>
                <div className="position-relative">
                  <i className={"fa-solid fa-lock " + registerCss.icon}></i>
                  <input
                  name='rePassword'
                    type="password"
                    id="rePassword"
                    placeholder="Confirm your password"
                    className={registerCss.input}
                    value={myFormik.values.rePassword}
                    onChange={myFormik.handleChange}
                    onBlur={myFormik.handleBlur}
                  />
                </div>
<small className='text-danger fw-bold'>{myFormik.errors && myFormik.touched.rePassword? myFormik.errors.rePassword :" "}</small>
              </div>
<button 
  disabled={!(myFormik.isValid && myFormik.dirty)} 
  type="submit"
  className={`my-3 px-5 d-block rounded-4 ms-auto
    ${ !(myFormik.isValid && myFormik.dirty) ? registerCss.btnDisplayed : registerCss.myBtn }
  `}
>
  {loader ? 
    <Rings visible={true}
      height="25"
      width="25"
      color="#fff"
      ariaLabel="rings-loading"/> :  "Register"
 }
</button>

            </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
