import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const contextCart= createContext();
export function CartContext({children}){
    const[cartItems,setCartItems]= useState(0);
const[cartProduct,setCartProduct]= useState(null);
const[totalPrice,setTotalPrice]= useState(0);
const[cartId,setCartId]= useState(null);

       useEffect(()=>{
        getProducts();
       },[])
      async function addToCart(productId){
        try {
            const {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
{ "productId": productId},
{headers:{token:localStorage.getItem("tkn")}})

getProducts();
 return data
    }
        catch (error) {
            
        }
       }
     async  function getProducts(){
        try {
               const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
            {headers:{token:localStorage.getItem("tkn")}});            
            setCartItems(data.numOfCartItems);
            setCartProduct(data.data.products);
            setTotalPrice(data.data.totalCartPrice);
            setCartId(data.cartId);
            
            return data;
       }
            
         catch (error) {
            console.log(error);
            
        }
       }
     async  function deleteProduct(id){
     try {
           const {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {headers:{token:localStorage.getItem("tkn")}});
              setCartItems(data.numOfCartItems);
            setCartProduct(data.data.products);
            setTotalPrice(data.data.totalCartPrice);
            return data;
     } catch (error) {
        console.log(error);
        
     }
       }
     async  function updateProduct(id,count){
     try {
           const {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {"count": count},
        {headers:{token:localStorage.getItem("tkn")}});
              setCartItems(data.numOfCartItems);
            setCartProduct(data.data.products);
            setTotalPrice(data.data.totalCartPrice);   
            return data;
     } catch (error) {
        console.log(error);
        
     }
       }
       async function removeItem() {
  try {
          const{data}=await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{token:localStorage.getItem("tkn")}
        });
                     setCartItems(0);
            setCartProduct([]);
            setTotalPrice(0);  
        return data
  } 
  catch (error) {
    console.log(error);
    
  }
       }
    return <contextCart.Provider value={{addToCart,
        cartItems,
        cartProduct,
        totalPrice,
        deleteProduct,
        updateProduct,
        removeItem,
        setCartProduct,
        cartId,
        setCartItems,
        getProducts
    }}> 
    
    {children}
    
    </contextCart.Provider>
}