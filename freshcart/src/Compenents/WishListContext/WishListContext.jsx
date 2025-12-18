import axios from "axios";
import {  createContext, useEffect, useState } from "react"
   export const wishContext= createContext();
export default function WishListContext({children}) {
   const [countWish,setCountWish]= useState(0);
   const [wishList,setwishList]=useState(null);
    useEffect(()=>{
        getWishLists()
    },[])
async function getWishLists(){
    const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
        {headers:{token:localStorage.getItem("tkn")}}
    )
    setCountWish(data.count);
    setwishList(data.data);    
}
async function deleteWishList(id){
  try {
      const {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {headers:{token:localStorage.getItem("tkn")}}
    )
        getWishLists();
    return data
  } 
  catch (error) {
   console.log(error);
    
  }
}
  return <>
<wishContext.Provider value={{
    countWish,
    wishList,
    setCountWish,
    setwishList,
    deleteWishList,
    getWishLists
}}>
{children}
</wishContext.Provider>
  
  
  </>
}
