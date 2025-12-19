import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import homeStyle from './home.module.css'
import HomeSlider from "./HomeSlider";
import img1 from '../../assets/images/slider-image-2.jpeg'
import img2 from '../../assets/images/slider-image-3.jpeg'
import CategoriesSlider from "./CategoriesSlider";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { contextCart } from './../CartContext/CartContext';
import toast from "react-hot-toast";
import { wishContext } from "../WishListContext/WishListContext";
import errorImg from "../../assets/images/error.svg"
export default function Home() {
const {addToCart} = useContext(contextCart);
const [term,setTerm]=useState("");
  const{setCountWish,getWishLists} = useContext(wishContext);
 async function addProduct(id){
    const toastId = toast.loading("Adding Your Product");
const res = await addToCart(id);
toast.dismiss(toastId);
if(res.status==="success"){
  toast.success(res.message);  
}
  } 
  function getApiHome(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  async  function addWishList(productId){
  const toastId=toast.loading("Adding Product to Your WishList")
    const {data} =await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
      {"productId": productId},
    {headers:{token:localStorage.getItem("tkn")}}
)
getWishLists()
      toast.dismiss(toastId)
if(data.status==="success"){
  toast.success(data.message);
  setCountWish(data.data.length)
}

  }

const {data,isLoading,isError}= useQuery({
  queryKey:["homeProducts"],
  queryFn:getApiHome,
  refetchOnMount:false,
});

const allData=data?.data.data;
const displayedData=allData?.slice(0,12).filter((pro)=>{
  return  pro.category.name.toLowerCase().includes(term.toLowerCase())

})


if(isLoading){
  return <div className={homeStyle.bgOpacity+" d-flex flex-column justify-content-center align-items-center vh-100 bg-black bg-opacity-50 position-absolute w-100"}>
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
if(isError){
  return <>
    <picture className='d-flex justify-content-center vh-100 align-items-center'>
      <img src={errorImg} alt="errorImg" className='w-50' />
    </picture>
    </>
}
  return <>
<div className="container-fluid mt-3">
  <div className="row gx-0 gy-4">
    <div className="col-md-9">
        <HomeSlider/>
    </div>
    <div className="col-md-3">
      <img style={{height:"200px"}} src={img1} className="w-100" alt="grocery-banner"/>
      <img style={{height:"200px"}}  src={img2} className="w-100" alt="grocery-banner"/>
    </div>
  </div>
</div>

<div className="container-fluid mt-4">
    <CategoriesSlider/>
</div>

<div className=" p-5 bg-light mt-5">
  <input style={{maxWidth:"550px"}} onChange={(e)=>setTerm(e.target.value)} id="inputSearch" type="text" className="form-control   mx-auto my-4" placeholder="Search by Product Name" />
   <div className="row g-3">
  {displayedData?.slice(0,12).map((pro,idx)=>{
return  <div className="col-12 col-md-4 col-lg-3"key={idx} >
      <div className={homeStyle.product + " position-relative shadow"}>
      <div className="product-img overflow-hidden">
          <img className="w-75 d-block m-auto my-2" src={pro.imageCover} alt={pro.title}/>
      </div>
        <h6 className="position-absolute top-0 m-2 start-0">{pro.category.name}</h6>
        <h6 className="position-absolute top-0 m-2 end-0">{pro.brand.name}</h6>
        <h5 className="fs-5 p-3">{pro.title.split(" ").slice(0,2).join(" ")}</h5>
      <div className="d-flex justify-content-between p-2">
          <small className="h5 fs-4"> {pro.price}<span>EGP</span> </small>
       <div className={homeStyle.icons}>
     <i className="fa-solid fa-star"></i>
     <i className="fa-solid fa-star"></i>
     <i className="fa-solid fa-star"></i>
     <i className="fa-solid fa-star"></i>
           <span > {pro.ratingsAverage}</span>
       </div>
      <div className={homeStyle.layerIcons}>
  <i  title="add to WishList" onClick={()=>addWishList(pro._id)} className={"fa-solid fa-heart " + homeStyle.heart}></i>
  <Link title="Add to cart" onClick={()=>addProduct(pro._id)}> <i className={"fa-solid fa-cart-shopping " + homeStyle.cart}></i></Link>
<Link  title="view details" to={`/productDetails/${pro.id}`}>  <i className={"fa-solid fa-eye " + homeStyle.view}></i></Link>
</div>
      </div>
      </div>
    </div>
  })}
    
    
  </div>
 

</div>
  
  
  </>
}
