import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";
import { Rings, TailSpin } from "react-loader-spinner";
import detailStyle from './productDetails.module.css'
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { contextCart } from "../CartContext/CartContext";
import toast from "react-hot-toast";
export default function ProductDetails() {
  const [loading, setLoading]= useState(false)
  const {addToCart}= useContext(contextCart); 
  const {id}= useParams();
    async function addProduct(proId){
      setLoading(true)
    const res=await addToCart(proId);
if(res.status==="success"){
  toast.success(res.message);  
}
    setLoading(false);
  } 
  function getDetails(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
const {data,isLoading} = useQuery({
    queryKey:["productDetails",id],
    queryFn:getDetails,
    keepPreviousData: false,
    refetchInterval:false
  })
const allData=data?.data.data;
  
 if(isLoading){
  return <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-black bg-opacity-50 position-absolute w-100">
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

    var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:true,
    autoplay:true,
 };
  return <>
<div className={detailStyle.theDetails+" container py-5 px-5 mt-3 shadow"}>
  <h3 className="">Product Details</h3>
  <div className="row g-3">
    <div className="col-md-3">
      <Slider {...settings}>
    {allData.images.map((img,idx)=>{
return <div>
  <img style={{height:"450px",objectFit:"cover"}} src={img} alt="imgSlider" className="w-100 mt-3" key={idx}/>
</div>
      })}
      </Slider>
    </div>
    <div className="col-md-8 offset-md-1">
<div className="">
             <div className={detailStyle.theHeader +" d-flex justify-content-between align-items-center my-2"}>
                 <h6 className="text-white p-2">{allData.category.name}</h6>
                 <h6 className="text-white p-2">{allData.brand.name}</h6>
             </div>
      <h4 className="my-3">{allData.title}</h4>
      <small className={detailStyle.quantity}>quantity: <span className="fs-5 text-black">{allData.quantity}</span></small>
      <span className="h6 my-3">Description:</span>
      <p className="lead">{allData.description}</p>
   <div className="d-flex justify-content-between align-items-center mt-5">
     <small className="">145 <span>Egp</span></small>
           <div className={detailStyle.icons}>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
                  <span className="h5" > {allData.ratingsAverage}</span>
              </div>
      
   </div>
</div>
<button onClick={()=>{
  addProduct(allData._id)
}} type="submit" className={detailStyle.btnCard+" w-75 w-lg-25 mt-3"}>
      {loading? 
        <Rings visible={true}
          height="25"
          width="25"
          color="#fff"
          wrapperStyle={{display:"flex" ,justifyContent:"center"}}
          ariaLabel="rings-loading"/>
           :  <> <i className="fa-solid fa-cart-shopping me-1 fs-5 d-inline"><span style={{fontSize:"15px"}}>  Add TO Cart</span></i></>
     }
    </button>
    </div>
  </div>
</div>
  
  
  </>
}
