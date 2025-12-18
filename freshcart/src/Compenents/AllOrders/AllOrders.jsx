import axios from "axios"
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
export default function AllOrders() {
   const[orders,setOrders] =useState(null)
    useEffect(()=>{
  const {id} =jwtDecode(localStorage.getItem("tkn"));
        getAllOrders(id);
    })
   async function getAllOrders(id){
      try {
          const {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
          
          setOrders(data)
      } 
      catch (error) {
        console.log(error);
        
      }
        
    }
    
    if(!orders){
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
  return <>
  <div style={{backgroundColor:"#F9FAFB"}} className="container p-3 mt-4 rounded-2">
  <h3 className="text-center my-4">All Orders</h3>
    <div className="row g-3">
        {orders.map((order,idx)=>{
return <div className="col-md-6" key={idx}>
      <div style={{backgroundColor:"#fff"}} className="theOrder shadow p-3">
         <div style={{backgroundColor:"#E7F7E7"}} className="theHeader d-flex justify-content-between rounded-3 p-3">
     <h6 style={{color:"rgb(84 198 84)"}}> Total order price:{order.totalOrderPrice}L.E</h6>
     <h6 style={{color:"rgb(84 198 84)"}}>Paymen method:{order.paymentMethodType}</h6>
   </div>
   <div className="container">
    <div className="row g-3">
   {order.cartItems.map((pro,index)=>{
return <div className="col-md-6" key={index}>
<div className="detailsPro mt-3">
    <img src={pro.product.imageCover} alt={pro.title} className="w-75 ms-auto" />
<h6 className="text-center my-3">{pro.product.title.split(" ").splice(0,2).join(" ")}</h6>
<div style={{backgroundColor:"#E7F7E7"}} className="d-flex justify-content-between rounded-3 p-2">
<span  style={{color:"rgb(84 198 84)"}}>Price:{pro.price}</span>
<span  style={{color:"rgb(84 198 84)"}}> Count:{pro.count}</span>
</div>
</div>
</div>
   })}
    </div>
   </div>


      </div>
        </div>            
        })}
    </div>
  </div>
  
  </>
}
