import { useContext, useEffect } from "react"
import { wishContext } from "../WishListContext/WishListContext";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function WishList() {
  const {wishList,deleteWishList,setCountWish,setwishList,getWishLists} = useContext(wishContext);
  useEffect(()=>{
    getWishLists()
  },[])
  if(wishList===null){
    return <div className="d-flex flex-column justify-content-center  align-items-center vh-100 bg-black bg-opacity-50 position-absolute w-100">
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
  async function deleteWishProduct(id){
const toastId = toast.loading("Removing Product");
    const res=await deleteWishList(id);    
    toast.dismiss(toastId)
    if(res.status==="success"){
toast.success(res.message)
    }
  }
  if(wishList.length===0){
    return <>
      <div className=" p-5 bg-light mt-5">
    <h3 className="my-2 h2">My Wishlist</h3>
    <div className="container min-vh-80">
      <div className="row justify-content-center align-items-center">
        <div className="col-8 ms-5">
          <h4 className="text-center my-3">Your wishlist is empty</h4>
          <p className="fs-5 text-center">Start adding items you love to your wishlist</p>
    <div className="theBtn d-flex justify-content-center">
               <Link style={{
                  fontSize: "20px",
    textTransform: "uppercase",
    backgroundColor: "rgb(84 198 84)",
    borderRadius: "15px",
    padding: "8px 14px",
    color: "#fff",
             }} to="/products" className="  mt-2 d-inline-block "><i className="fa-solid fa-house me-2"></i>
    Start shopping
    </Link>
    </div>
        </div>
      </div>
    </div>
    </div>
    </>
  }
  return <>
  <div className=" p-5 bg-light mt-5">
    <h3 className="my-2 h2">My Wishlist</h3>
    <div className="row g-3">
    {wishList?.map((pro,idx)=>{
  return  <div className="col-12 col-md-4 col-lg-3" key={idx}>
        <div className="position-relative shadow mt-3">
        <div className="product-img overflow-hidden">
            <img className="w-75 d-block m-auto my-2" src={pro.imageCover} alt={pro.title}/>
        </div>
          <h5 className="fs-5 p-2">{pro.title.split(" ").slice(0,2).join(" ")}</h5>
        <div className="d-flex justify-content-between ms-3">
            <small style={{color:"rgb(84 198 84)"}} className="h5 fs-4"> {pro.price}<span>EGP</span> </small>
        <div className="">
    <i onClick={()=>{
        deleteWishProduct(pro.id)
    }} style={{cursor:"pointer"}}  className="fa-solid fa-heart position-absolute top-0 end-0 me-1 mt-2 fs-5 text-danger"></i>
  </div>
        </div>
        </div>
      </div>
    })}
      
      
    </div>
  </div>
  
  
  </>
}
