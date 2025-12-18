import { useContext, useState } from "react"
import { contextCart } from "../CartContext/CartContext";
import styleCart from './cart.module.css'
import toast from "react-hot-toast";
import Img from '../../assets/images/emptyCart.jpg'
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { Helmet } from "react-helmet-async";
export default function Cart() {
   const{deleteProduct,updateProduct,cartItems,cartProduct,totalPrice,removeItem}= useContext(contextCart);

  async function deleteCart(productId){
const toastId = toast.loading("Deleting Your Product");
    const res= await deleteProduct(productId);
    toast.dismiss(toastId);
   if(res.status==="success"){
    toast.success("product Deleted")
   }
    
   }
   async function updateCart(productId,count){
    const toastId = toast.loading("Updating Your Product");
    const res=await updateProduct(productId,count);
    toast.dismiss(toastId);
   if(res.status==="success"){
    toast.success("product Updated");
   }   

   }
 async  function clearCart(){
const toastId = toast.loading("Deleting Your Cart");
const res =await removeItem();
   toast.dismiss(toastId);
   if(res.status==="success"){
    toast.success("Cart Deleted");
   } 
   }
   if(cartProduct===null){
    return    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-black bg-opacity-50 position-absolute w-100">
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
<h4>Loading...</h4>
    </div>
   }
   if(cartProduct.length===0){
    return<div className="text-center ">
    <img style={{maxWidth:"40%"}} className="ms-5" src={Img} alt="emptyCart" />
    <h3 className="h2 ms-5">Your Cart is Empty!</h3>
    <Link to="/products" className={styleCart.emptyBtn+" ms-5 mt-2 d-inline-block"}><i className="fa-solid fa-house me-2"></i>
    countinue shopping
    </Link>
    </div>
   }
  return <>
   <Helmet>
    <title>Cart</title>
  </Helmet>
    <div style={{backgroundColor:"#F8F9FA" ,borderRadius:"10px"}} className="container mt-4 py-3">

                 <div className="theHeader d-flex justify-content-between mx-4 ">
            <h3 className="h2 mt-4">Shop Cart</h3>
            <button onClick={clearCart} className="btn btn-danger mt-4">Clear Cart</button>
        </div>
        <p className="h5 ms-4 mt-3 ">Total Cart Price:{totalPrice} L.E</p>
{cartProduct?.map((pro)=>{
    return <div key={pro._id} style={{borderBottom:"1px solid #C2C4C6"}} className="allProducts p-3">
      <div className="row align-items-center g-3 ">
        <div className="col-sm-3 col-md-2">
<picture><img src={pro.product.imageCover} alt={pro.title} className="w-75" /></picture>
</div>
<div className="col-sm-7 col-md-8">
    <div className={styleCart.theContat}>
        <h6 className="h5">{pro.product.title}</h6>
        <span> Price: {pro.price}</span>
          <i onClick={()=>deleteCart(pro.product._id)} className="fa-solid fa-trash d-inline">
        <small style={{fontSize:"18px" ,color:"#000"}} className="fw-medium"> Remove</small>
          </i>
      </div>
</div>
<div className="col-sm-2 col-md-2">
    <div className="btns d-flex align-items-center">
        <small onClick={()=>updateCart(pro.product._id,pro.count +1)} className={styleCart.add}><i className="fa-solid fa-plus"></i></small>
        <small style={{color:"rgb(84 198 89)"}} className="count fs-5">{pro.count}</small>
        <small onClick={()=>updateCart(pro.product._id,pro.count -1)} className={styleCart.less}><i className="fa-solid fa-minus"></i></small>
    </div>
</div>
</div>  
    </div>
})}
<Link to="/details" style={{width:"140px" ,backgroundColor:"rgb(84 198 84)",fontSize:"18px",color:"#fff"}} className="btn  d-block   mt-3 ms-auto"> Order </Link>  

        </div>
  
  </>
  
 
}
