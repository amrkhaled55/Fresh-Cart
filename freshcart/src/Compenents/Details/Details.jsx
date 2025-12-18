import { Link, useNavigate } from "react-router-dom"
import orderStyle from "./allOrder.module.css"
import axios from "axios"
import { useFormik } from 'formik';
import { useContext, useState } from "react";
import { contextCart } from "../CartContext/CartContext";
import toast from "react-hot-toast";
export default function Details() {
  const [paymentType, setPaymentType] = useState(null);
  const {cartId,setCartItems} =useContext(contextCart);
 const navigation= useNavigate();
  const user={
shippingAddress:{
        details: "",
        phone: "",
        city: ""
        }
  }
  async function getCash(values){
  const toastId = toast.loading("creating Your Order");
    const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,values,
      {headers:{token:localStorage.getItem("tkn")}}
    )
  toast.dismiss(toastId);
if(data.status==="success"){
      setCartItems(0)
  toast.success("Order Created");
setTimeout(()=>{
    navigation("/allorders")
},1000)
}    
  }
async  function getSession(values){
    const toastId = toast.loading("creating Your Order");

try {
  const {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,values,
{headers:{token:localStorage.getItem("tkn")},
params:{url:`http://${location.host}`}
})
  toast.dismiss(toastId);
  if(data.status==="success"){
  setCartItems(0)
    window.open(data.session.url,"_self" )
  } 
} catch (error) {
  console.log(error);
  
}

  }
const myFormik= useFormik({
initialValues:user,
onSubmit:(values)=>{
if(paymentType==="cash"){
  getCash(values)
}
else if(paymentType==="online"){
  getSession(values)
}
}
})
  return   <div className="py-3"  style={{backgroundColor:"#F9FAFB"}}>
  <div className="container" >
  <h6 className="text-center">Complete your order with shipping :</h6>
  <div style={{backgroundColor:"#fff"}} className="all  m-auto shadow p-3 rounded-3 mt-5">
    <h3 className="mb-4 text-center">Shipping Address</h3>
    <div className="row justify-content-center">
      <div className="col-9 col-lg-7">
          <form onSubmit={myFormik.handleSubmit}>
              <div className="form-floating mb-3">
  <input
   onChange={myFormik.handleChange}
    onBlur={myFormik.handleBlur}
      value={myFormik.values.shippingAddress.city}
       type="text" className="form-control mb-4 w-100"
        id="shippingAddress.city"
          name="shippingAddress.city"
         placeholder="Enter Your City"/>
  <label htmlFor="city">Enter Your City </label>
</div>
<div className="form-floating">
  <input
   onChange={myFormik.handleChange} 
    onBlur={myFormik.handleBlur}
     value={myFormik.values.shippingAddress.phone}
      type="tel" className="form-control mb-4 w-100"
        id="shippingAddress.phone" 
         name="shippingAddress.phone" 
        placeholder="Enter Your Phone"/>
  <label htmlFor="phone">Enter Your Phone</label>
        </div>
        <div className="form-floating">
  <textarea  onBlur={myFormik.handleBlur}
   onChange={myFormik.handleChange}
    value={myFormik.values.shippingAddress.details}
     className="form-control mb-4 w-100"
      id="shippingAddress.details"
          name="shippingAddress.details"
       placeholder="Enter Address Details">
       </textarea>
  <label htmlFor="details">Enter Address Details</label>
</div>
<div className={orderStyle.methods}>
    <h6 className="fs-5">PayMent Method:</h6>
  <div className="d-flex justify-content-between mt-3">
    <button onClick={()=>{
      setPaymentType("cash")
    }} type="submit"  className={orderStyle.cash +" btn"}>Cash</button>
    <button onClick={()=>{
      setPaymentType("online")
    }} type="submit" className={orderStyle.online +" btn ms-auto"}>Online Payment </button>
  </div>
</div>
    </form>
      </div>
    </div>
  </div>
  </div>
  </div>


}
