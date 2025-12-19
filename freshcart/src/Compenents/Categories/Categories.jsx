import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { TailSpin } from "react-loader-spinner";
import catagoryStyle from "./category.module.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import errorImg from "../../assets/images/error.svg"
export default function Categories() {
  const [term,setTerm] =useState("");
  function getAllCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
 const{data , isLoading,isError}=useQuery({
  queryKey:["categories"],
  queryFn:getAllCategories
 })
const allData=data?.data.data;
const displayedData=allData?.filter((bro)=>{
  return bro.name.toLowerCase().includes(term.toLowerCase())
})
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
if(isError){
  return <>
    <picture className='d-flex justify-content-center vh-100 align-items-center'>
      <img src={errorImg} alt="errorImg" className='w-50' />
    </picture>
    </>
}
  return <>
  <div className="container">
      <h3 className="text-center my-3 h2">Categories</h3>
      <input  style={{maxWidth:"550px"}}  onChange={(e)=>setTerm(e.target.value)} type="text" className="form-control   mx-auto my-4"
       placeholder="search by category name name"/>
<div className="row g-4">
    {displayedData?.map((cata,idx)=>{
      return <div className="col-md-4 col-lg-3" key={cata._id}>
              <Link to={`/categoryDetails/${cata._id}`}>
      <div className={catagoryStyle.category + " mt-2"}>
        <div className="categoryImg overflow-hidden">
          <img src={cata.image} alt={cata.name} className="w-100" />
        </div>
        <h5>{cata.name}</h5>
      </div>
           </Link>
    </div>
        })}

  </div>

  </div>



  
  
  
  </>
}
