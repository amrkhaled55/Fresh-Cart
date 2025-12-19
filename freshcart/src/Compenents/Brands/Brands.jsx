import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import errorImg from "../../assets/images/error.svg"
export default function Brands() {
 const [term,setTerm] =useState("");
  function getBrands(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }
const {data,isLoading,isError} = useQuery({
  queryKey:["brands"],
  queryFn:getBrands
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
      <h3 className="text-center my-3 h2">Brands</h3>
      <input  style={{maxWidth:"550px"}}  onChange={(e)=>setTerm(e.target.value)} type="text" className="form-control  w-100 w-sm-50 mx-auto my-4" placeholder="search by brand name"/>
<div className="row g-4">
    {displayedData.map((brand,idx)=>{
      return <div className="col-md-4 col-lg-3" key={idx}>
              <Link to={`/brandsdetails/${brand._id}`}>
        <div className="categoryImg overflow-hidden" style={{borderRadius:"14px",background:"#fff",cursor:"pointer",border:"1px solid #eee",
          boxShadow:"0 2px 10px rgba(0,0,0,0.05)"
        }}>
          <img style={{height:"280px"}} src={brand.image} alt={brand.name} className="w-100" />
        <h5 className="text-center">{brand.name}</h5>
      </div>
           </Link>
    </div>
        })}

  </div>

  </div>
  
  </>
}
