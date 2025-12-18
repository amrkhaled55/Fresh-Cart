import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import errorImg from "../../assets/images/error.svg"
export default function BrandsDetails() {
   const {id}= useParams();   
function getBrandsDetails(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
}
const {data,isLoading,isError} =useQuery({
    queryKey:["brandsDetails,",id],
    queryFn:getBrandsDetails,
    refetchOnMount:false
})
const allData=data?.data.data;
 if(isLoading){
  return <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-black bg-opacity-50 position-fixed w-100">
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
 <div style={{backgroundColor:"#fff",borderRadius:"10px"}} className=" container py-5 px-5 mt-5 shadow">
  <h3 className="text-center">Brand Details</h3>
  <div className="row g-3 align-items-center">
    <div className="col-md-3 ">
  <img src={allData.image} style={{height:"300px"}} alt={allData.name} className="w-100"/>
    </div>
    <div className="col-md-8 offset-md-1">
        <h4>{allData.name}</h4>
        <h6>{allData.slug}</h6>
    </div>
  </div>
</div>
</>

}
